import { Suspense } from "react"
import { AdminUsersContent } from "@/components/admin/AdminUsersContent"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<UsersPageLoading />}>
      <AdminUsersContent />
    </Suspense>
  )
}

function UsersPageLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardDescription className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></CardDescription>
              <CardTitle className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-1"></CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
      </div>
    </div>
  )
}

