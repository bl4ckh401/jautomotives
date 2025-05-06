"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AdminUsersTable } from "@/components/admin/AdminUsersTable"
import { FileDown, Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUsers, getUsersByRole, getUsersByStatus, User } from "@/services/userService"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export function AdminUsersContent() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [totalStats, setTotalStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0
  })
  const [lastVisibleDoc, setLastVisibleDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)

  // Fetch users based on current tab
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        let fetchedUsers: User[] = []
        
        if (currentTab === "all") {
          const result = await getUsers()
          fetchedUsers = result.users
          setLastVisibleDoc(result.lastVisible)
        } else if (currentTab === "admin") {
          fetchedUsers = await getUsersByRole("admin")
        } else {
          fetchedUsers = await getUsersByStatus(currentTab)
        }
        
        setUsers(fetchedUsers)
        
        // Calculate statistics
        const stats = {
          total: fetchedUsers.length,
          active: fetchedUsers.filter(u => u.status === "active").length,
          pending: fetchedUsers.filter(u => u.status === "pending").length,
          suspended: fetchedUsers.filter(u => u.status === "suspended").length
        }
        
        setTotalStats(stats)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [currentTab])
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setCurrentTab(value)
  }
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  
  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            disabled={loading}
          >
            <FileDown className="h-4 w-4" /> Export
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            disabled={loading}
          >
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl">
              {loading ? "..." : totalStats.total}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-2xl">
              {loading ? "..." : totalStats.active}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl">
              {loading ? "..." : totalStats.pending}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardDescription>Suspended</CardDescription>
            <CardTitle className="text-2xl">
              {loading ? "..." : totalStats.suspended}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab} className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </div>
            <AdminUsersTable 
              users={filteredUsers} 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 