import { Button } from "@/components/ui/button"
import { getCarListings } from "@/services/carListingService"
import { AdminListingsTable } from "@/components/admin/AdminListingsTable"
import { Plus, FileDown, FileUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function AdminListingsPage() {
  const listings = await getCarListings()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Car Listings</h1>
          <p className="text-muted-foreground">Manage all vehicle listings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" /> Import
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Listing
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>
        </div>
        <AdminListingsTable listings={listings} />
      </div>
    </div>
  )
}

