"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Lock, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type User } from "@/services/userService"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { updateUserRole, updateUserStatus } from "@/services/userService"

interface AdminUsersTableProps {
  users: User[]
  loading?: boolean
  onRefresh?: () => void
}

export function AdminUsersTable({ users, loading = false, onRefresh }: AdminUsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [actionLoading, setActionLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Handle view user profile
  const handleView = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  // Handle edit user
  const handleEdit = (userId: string) => {
    router.push(`/admin/users/edit/${userId}`)
  }

  // Handle role change
  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = prompt(`Change role for user (current: ${currentRole})\nEnter new role (admin, seller, user):`, currentRole)
    if (!newRole || newRole === currentRole) return

    if (!['admin', 'seller', 'user'].includes(newRole)) {
      toast({
        title: "Invalid role",
        description: "Role must be one of: admin, seller, user",
        variant: "destructive",
      })
      return
    }

    setActionLoading(true)
    try {
      await updateUserRole(userId, newRole as "admin" | "user" | "seller")
      toast({
        title: "Role updated",
        description: `User role has been changed to ${newRole}.`,
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error updating role:", error)
      toast({
        title: "Error updating role",
        description: error.message || "Failed to update user role.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(false)
    }
  }

  // Handle status change
  const handleStatusChange = async (userId: string, newStatus: string, userName: string) => {
    const action = newStatus === "suspended" ? "suspend" : "activate"
    if (!confirm(`Are you sure you want to ${action} user "${userName}"?`)) {
      return
    }

    setActionLoading(true)
    try {
      await updateUserStatus(userId, newStatus as any)
      toast({
        title: `User ${action}d`,
        description: `User has been successfully ${action}d.`,
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: error.message || "Failed to update user status.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(false)
    }
  }

  // Handle send email
  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank')
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.photoURL || undefined} alt={row.original.name || "User"} />
            <AvatarFallback>{row.original.name ? row.original.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name || "Unnamed User"}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Mail className="h-3 w-3 mr-1" />
              <span>{row.original.email || "No email"}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role
        let badgeClass = ""

        switch (role) {
          case "admin":
            badgeClass = "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
            break
          case "seller":
            badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
            break
          case "user":
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
            break
        }

        return (
          <Badge variant="outline" className={badgeClass}>
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeClass = ""

        switch (status) {
          case "active":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
            break
          case "pending":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
            break
          case "suspended":
            badgeClass = "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
            break
          default:
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
        }

        return (
          <Badge variant="outline" className={badgeClass}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "dates",
      header: "Dates",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="flex items-center text-xs">
            <span className="text-muted-foreground mr-1">Created:</span>
            <span>
              {row.original.createdAt 
                ? new Date(row.original.createdAt).toLocaleDateString() 
                : "Unknown"}
            </span>
          </div>
          {row.original.lastLogin && (
            <div className="flex items-center text-xs">
              <span className="text-muted-foreground mr-1">Last login:</span>
              <span>{new Date(row.original.lastLogin).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={actionLoading}>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleView(row.original.id)}
            >
              <Eye className="h-4 w-4" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleEdit(row.original.id)}
            >
              <Edit className="h-4 w-4" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleRoleChange(row.original.id, row.original.role || 'user')}
            >
              <Edit className="h-4 w-4" /> Change Role
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleSendEmail(row.original.email!)}
            >
              <Mail className="h-4 w-4" /> Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.original.status === "active" && (
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600"
                onClick={() => handleStatusChange(row.original.id, "suspended", row.original.name || "Unknown")}
              >
                <Lock className="h-4 w-4" /> Suspend User
              </DropdownMenuItem>
            )}
            {row.original.status === "suspended" && (
              <DropdownMenuItem 
                className="flex items-center gap-2 text-green-600"
                onClick={() => handleStatusChange(row.original.id, "active", row.original.name || "Unknown")}
              >
                <Lock className="h-4 w-4" /> Activate User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            users.length,
          )}{" "}
          of {users.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

