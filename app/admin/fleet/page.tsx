import { Button } from "@/components/ui/button"
import { getFleetVehicles } from "@/services/fleetService"
import { AdminFleetTable } from "@/components/admin/AdminFleetTable"
import { FileDown, Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminFleetPage() {
  const fleetVehicles = await getFleetVehicles()

  // Calculate statistics
  const totalVehicles = fleetVehicles.length
  const availableVehicles = fleetVehicles.filter((v) => v.status === "available").length
  const bookedVehicles = fleetVehicles.filter((v) => v.status === "booked").length
  const maintenanceVehicles = fleetVehicles.filter((v) => v.status === "maintenance").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground">Manage your rental fleet vehicles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Vehicles</CardDescription>
            <CardTitle className="text-2xl">{totalVehicles}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-2xl">{availableVehicles}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardDescription>Booked</CardDescription>
            <CardTitle className="text-2xl">{bookedVehicles}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardDescription>Maintenance</CardDescription>
            <CardTitle className="text-2xl">{maintenanceVehicles}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search vehicles..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </div>
            <AdminFleetTable vehicles={fleetVehicles} />
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="available" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search vehicles..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </div>
            <AdminFleetTable vehicles={fleetVehicles.filter((v) => v.status === "available")} />
          </div>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}

