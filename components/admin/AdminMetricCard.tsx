"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"

export interface AdminMetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change: number
  color: "blue" | "green" | "amber" | "red" | "purple" | "emerald"
  loading?: boolean
}

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-800",
    iconText: "text-blue-600 dark:text-blue-300",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-100 dark:border-green-800",
    text: "text-green-700 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-800",
    iconText: "text-green-600 dark:text-green-300",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-100 dark:border-red-800",
    text: "text-red-700 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-800",
    iconText: "text-red-600 dark:text-red-300",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-100 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-800",
    iconText: "text-amber-600 dark:text-amber-300",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-100 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-800",
    iconText: "text-purple-600 dark:text-purple-300",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-800",
    iconText: "text-emerald-600 dark:text-emerald-300",
  },
}

export function AdminMetricCard({ title, value, icon: Icon, change, color, loading = false }: AdminMetricCardProps) {
  const colors = colorMap[color]

  // Get color classes
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return {
          icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      case "green":
        return {
          icon: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      case "amber":
        return {
          icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      case "red":
        return {
          icon: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      case "purple":
        return {
          icon: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      case "emerald":
        return {
          icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
      default:
        return {
          icon: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
          change: change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
        }
    }
  }

  const colorClasses = getColorClasses()

  return (
    <Card className={`${colors.bg} ${colors.border}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground flex items-center pt-1">
          {loading ? (
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          ) : (
            <>
              <span className={colorClasses.change}>
                {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  )
}

