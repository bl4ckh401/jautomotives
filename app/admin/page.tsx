import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCarListings } from "@/services/carListingService"
import { getBookings } from "@/services/bookingService"
import { getFleetVehicles } from "@/services/fleetService"
import { getContactRequests } from "@/services/contactService"
import { getAssistanceRequests } from "@/services/assistanceService"
import { Car, Calendar, Truck, Mail, PhoneCall, DollarSign } from "lucide-react"
import { AdminMetricCard } from "@/components/admin/AdminMetricCard"
import { AdminRecentActivity } from "@/components/admin/AdminRecentActivity"
import { AdminChart } from "@/components/admin/AdminChart"

export default async function AdminDashboard() {
  const [listings, bookings, fleetVehicles, contactRequests, assistanceRequests] = await Promise.all([
    getCarListings(),
    getBookings(),
    getFleetVehicles(),
    getContactRequests(),
    getAssistanceRequests(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin User</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-md text-sm flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminMetricCard title="Car Listings" value={listings.length} icon={Car} change={12} color="blue" />
        <AdminMetricCard title="Bookings" value={bookings.length} icon={Calendar} change={8} color="green" />
        <AdminMetricCard title="Fleet Vehicles" value={fleetVehicles.length} icon={Truck} change={5} color="purple" />
        <AdminMetricCard
          title="Contact Requests"
          value={contactRequests.length}
          icon={Mail}
          change={-3}
          color="amber"
        />
        <AdminMetricCard
          title="Assistance Requests"
          value={assistanceRequests.length}
          icon={PhoneCall}
          change={15}
          color="red"
        />
        <AdminMetricCard title="Revenue" value="$1.2M" icon={DollarSign} change={22} color="emerald" />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Monthly statistics for listings, bookings, and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity />
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">12</p>
            <p className="text-sm text-blue-600 dark:text-blue-500 mt-1">Listings awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400">8</p>
            <p className="text-sm text-green-600 dark:text-green-500 mt-1">New bookings today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-100 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">5</p>
            <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">Open support tickets</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-100 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">24</p>
            <p className="text-sm text-purple-600 dark:text-purple-500 mt-1">Registrations this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

