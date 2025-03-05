import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"

interface AdminMetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change: number
  color: "blue" | "green" | "red" | "amber" | "purple" | "emerald"
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

export function AdminMetricCard({ title, value, icon: Icon, change, color }: AdminMetricCardProps) {
  const colors = colorMap[color]

  return (
    <Card className={`${colors.bg} ${colors.border}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-full ${colors.iconBg}`}>
          <Icon className={`h-4 w-4 ${colors.iconText}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1 flex items-center">{value}</div>
        <div className="flex items-center text-xs">
          {change > 0 ? (
            <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
          )}
          <span className={change > 0 ? "text-green-500" : "text-red-500"}>{Math.abs(change)}% from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

