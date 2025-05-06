"use client"

import { useState, useEffect } from "react"
import { User, Mail, PhoneCall, Car, Calendar, Clock } from "lucide-react"
import { useAdmin } from "@/contexts/AdminContext"
import type { ActivityLog } from "@/services/analyticsService"
import { formatDistanceToNow } from "date-fns"

const getIconForEntity = (entityType: ActivityLog["entityType"]) => {
  switch (entityType) {
    case "listing":
      return Car
    case "booking":
      return Calendar
    case "user":
      return User
    case "contact":
      return Mail
    case "assistance":
      return PhoneCall
    default:
      return Clock
  }
}

const getIconColorForEntity = (entityType: ActivityLog["entityType"]) => {
  switch (entityType) {
    case "listing":
      return "text-blue-500 bg-blue-100"
    case "booking":
      return "text-green-500 bg-green-100"
    case "user":
      return "text-purple-500 bg-purple-100"
    case "contact":
      return "text-indigo-500 bg-indigo-100"
    case "assistance":
      return "text-red-500 bg-red-100"
    default:
      return "text-gray-500 bg-gray-100"
  }
}

export function AdminRecentActivity() {
  const { getRecentActivity } = useAdmin()
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityLogs = await getRecentActivity(10)
        setActivities(activityLogs)
      } catch (error) {
        console.error("Error fetching activity logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [getRecentActivity])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = getIconForEntity(activity.entityType)
        const iconColor = getIconColorForEntity(activity.entityType)
        const timeAgo = formatDistanceToNow(new Date(activity.timestamp.seconds * 1000), { addSuffix: true })

        return (
          <div
            key={activity.id}
            className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
          >
            <div className={`p-2 rounded-full ${iconColor}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.userName}</p>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
          </div>
        )
      })}

      {activities.length === 0 && !loading && (
        <div className="text-center py-6">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
          <p className="text-muted-foreground">
            Activity logs will appear here as users interact with the platform.
          </p>
        </div>
      )}
    </div>
  )
}

