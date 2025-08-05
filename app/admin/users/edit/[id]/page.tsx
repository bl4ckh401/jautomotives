"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, User, Mail, Shield, Clock } from "lucide-react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface UserData {
  id: string
  name?: string
  email?: string
  role?: string
  status?: string
  createdAt?: any
  lastLoginAt?: any
  phone?: string
  address?: string
}

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    phone: "",
    address: ""
  })

  const userId = params.id as string

  // Load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true)
        const userDoc = await getDoc(doc(db, "users", userId))
        
        if (!userDoc.exists()) {
          throw new Error("User not found")
        }

        const userData = { id: userDoc.id, ...userDoc.data() } as UserData
        setUser(userData)
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "user",
          status: userData.status || "active",
          phone: userData.phone || "",
          address: userData.address || ""
        })
      } catch (error: any) {
        console.error("Error loading user:", error)
        toast({
          title: "Error loading user",
          description: error.message || "Failed to load user data",
          variant: "destructive",
        })
        router.push("/admin/users")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadUser()
    }
  }, [userId, toast, router])

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

    setSaving(true)
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        name: formData.name,
        role: formData.role,
        status: formData.status,
        phone: formData.phone || null,
        address: formData.address || null,
        updatedAt: new Date()
      })

      // Also update admin collection if it exists
      try {
        const adminRef = doc(db, "admin", "users")
        const adminDoc = await getDoc(adminRef)
        if (adminDoc.exists()) {
          const adminData = adminDoc.data()
          const updatedUsers = adminData.users?.map((u: any) => 
            u.id === userId 
              ? { ...u, name: formData.name, role: formData.role, status: formData.status }
              : u
          ) || []
          
          await updateDoc(adminRef, { users: updatedUsers })
        }
      } catch (adminError) {
        console.warn("Could not update admin collection:", adminError)
      }

      toast({
        title: "User updated",
        description: "The user has been successfully updated.",
      })

      router.push("/admin/users")
    } catch (error: any) {
      console.error("Error updating user:", error)
      toast({
        title: "Error updating user",
        description: error.message || "Failed to update the user",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "seller":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "buyer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <Button onClick={() => router.push("/admin/users")}>
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push("/admin/users")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit User</h1>
            <p className="text-muted-foreground">Update user information</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>
              Current user details and metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Role</p>
                  <Badge className={getRoleColor(user.role || "user")}>
                    {user.role || "user"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <Badge className={getStatusColor(user.status || "active")}>
                    {user.status || "active"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit User Details</CardTitle>
            <CardDescription>
              Update user information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Read-only)</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
