import { Car, Calendar, DollarSign, User, Mail, PhoneCall } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "Listed a new vehicle",
    time: "10 minutes ago",
    icon: Car,
    iconColor: "text-blue-500 bg-blue-100",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Made a booking",
    time: "25 minutes ago",
    icon: Calendar,
    iconColor: "text-green-500 bg-green-100",
  },
  {
    id: 3,
    user: "Admin User",
    action: "Approved a listing",
    time: "1 hour ago",
    icon: DollarSign,
    iconColor: "text-amber-500 bg-amber-100",
  },
  {
    id: 4,
    user: "Robert Johnson",
    action: "Registered a new account",
    time: "2 hours ago",
    icon: User,
    iconColor: "text-purple-500 bg-purple-100",
  },
  {
    id: 5,
    user: "Emily Davis",
    action: "Submitted a contact request",
    time: "3 hours ago",
    icon: Mail,
    iconColor: "text-indigo-500 bg-indigo-100",
  },
  {
    id: 6,
    user: "Michael Wilson",
    action: "Requested roadside assistance",
    time: "4 hours ago",
    icon: PhoneCall,
    iconColor: "text-red-500 bg-red-100",
  },
]

export function AdminRecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
        >
          <div className={`p-2 rounded-full ${activity.iconColor}`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.user}</p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

