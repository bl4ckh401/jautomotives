"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RENTAL_CATEGORIES, type RentalCategory } from "@/lib/rentalCategories"
import { addRentalVehicle, updateRentalVehicle, type RentalVehicle } from "@/services/rentalService"
import { uploadImage } from "@/lib/storage"

// Narrow type for form values
 type FormValues = Omit<RentalVehicle, "id" | "createdAt" | "updatedAt">

export default function RentalVehicleForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormValues>({
    name: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    // images will be uploaded as File objects before persisting
    images: [],
    pricePerDay: 0,
    category: "wedding",
    transmission: "automatic",
    fuelType: "petrol",
    seats: 4,
    mileage: 0,
    available: true,
    description: "",
    features: [],
  })
  // Local file objects for upload + preview
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setField = <K extends keyof FormValues>(key: K, val: FormValues[K]) =>
    setForm((p) => ({ ...p, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      // Prepare payload without image URLs (we'll upload after creating the doc)
      const payload: Omit<FormValues, "images"> & { images: string[] } = {
        ...form,
        images: [],
        features,
      }

      // Create rental doc first to get an id for storage path
      const rentalId = await addRentalVehicle(payload)

      // If there are image files, upload them and update the rental doc
      if (imageFiles.length > 0) {
        const uploadedUrls: string[] = []
        for (const [idx, file] of imageFiles.entries()) {
          try {
            const path = `rentalVehicles/${rentalId}/${idx}-${file.name}`
            const url = await uploadImage(file, path)
            uploadedUrls.push(url)
          } catch (uploadErr) {
            console.error("Error uploading image", uploadErr)
          }
        }

        if (uploadedUrls.length > 0) {
          await updateRentalVehicle(rentalId, { images: uploadedUrls })
        }
      }

      router.push("/admin/rentals")
    } catch (err: any) {
      setError(err?.message || "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setImageFiles((prev) => [...prev, ...files].slice(0, 10))
  }

  const removeImageFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    const f = newFeature.trim()
    if (!f) return
    if (!features.includes(f)) setFeatures((p) => [...p, f])
    setNewFeature("")
  }

  const removeFeature = (index: number) => {
    setFeatures((p) => p.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error ? <div className="text-red-600 text-sm">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setField("category", v as RentalCategory)}
          >
            <SelectTrigger id="category" className="bg-transparent border-border">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {RENTAL_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c.replace("-", " ").replace(/\b\w/g, (x) => x.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="make">Make</Label>
          <Input id="make" value={form.make} onChange={(e) => setField("make", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" value={form.model} onChange={(e) => setField("model", e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) => setField("year", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="pricePerDay">Price per day</Label>
          <Input
            id="pricePerDay"
            type="number"
            step="0.01"
            value={form.pricePerDay}
            onChange={(e) => setField("pricePerDay", Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={form.transmission}
            onValueChange={(v) => setField("transmission", v as any)}
          >
            <SelectTrigger id="transmission" className="bg-transparent border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select
            value={form.fuelType}
            onValueChange={(v) => setField("fuelType", v as any)}
          >
            <SelectTrigger id="fuelType" className="bg-transparent border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="seats">Seats</Label>
          <Input
            id="seats"
            type="number"
            value={form.seats ?? 4}
            onChange={(e) => setField("seats", Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            type="number"
            value={form.mileage ?? 0}
            onChange={(e) => setField("mileage", Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="available">Availability</Label>
          <Select
            value={form.available ? "true" : "false"}
            onValueChange={(v) => setField("available", v === "true")}
          >
            <SelectTrigger id="available" className="bg-transparent border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="images">Images</Label>
        <div className="space-y-2">
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageFiles}
            className="border border-dashed p-3 rounded"
          />
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {imageFiles.map((file, idx) => (
                <div key={idx} className="relative">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-28 object-cover rounded" />
                  <button type="button" onClick={() => removeImageFile(idx)} className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-muted-foreground">Upload up to 10 images. Images are uploaded to Firebase Storage after saving.</p>
        </div>
      </div>

      <div>
        <Label htmlFor="features">Features</Label>
        <div className="flex gap-2 mb-2">
          <Input id="featureInput" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add a feature and press Add" />
          <Button type="button" onClick={addFeature}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <div key={i} className="px-2 py-1 bg-gray-200 rounded flex items-center gap-2">
              <span>{f}</span>
              <button type="button" onClick={() => removeFeature(i)} className="text-sm text-red-600">×</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Vehicle"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => history.back()} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
