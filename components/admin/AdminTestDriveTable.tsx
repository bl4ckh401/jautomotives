"use client"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Check, 
  X, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  Phone, 
  Mail,
  Car,
  User,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { TestDriveBooking } from "@/types/testDrive"
import { updateTestDriveBooking } from "@/services/testDriveService"

interface AdminTestDriveTableProps {
  bookings: TestDriveBooking[]
  onRefresh: () => void
}

export function AdminTestDriveTable({ bookings, onRefresh }: AdminTestDriveTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const handleStatusChange = async (bookingId: string, newStatus: TestDriveBooking['status']) => {
    try {
      await updateTestDriveBooking(bookingId, { status: newStatus })
      
      toast({
        title: "Status updated",
        description: `Test drive booking has been ${newStatus}.`,
      })
      
      onRefresh()
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: TestDriveBooking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const columns: ColumnDef<TestDriveBooking>[] = [
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{row.original.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.userName}</div>
            <div className="text-sm text-muted-foreground">{row.original.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.original.vehicleDetails.image} 
            alt="Vehicle"
            className="w-12 h-8 object-cover rounded"
          />
          <div>
            <div className="font-medium">
              {row.original.vehicleDetails.year} {row.original.vehicleDetails.make} {row.original.vehicleDetails.model}
            </div>
            <div className="text-sm text-muted-foreground">
              ID: {row.original.vehicleId}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "preferredDate",
      header: "Date & Time",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {format(new Date(row.original.preferredDate), "MMM dd, yyyy")}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {row.original.preferredTime} ({row.original.duration} min)
          </div>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {row.original.userPhone}
          </div>
          <div className="text-sm text-muted-foreground">
            License: {row.original.drivingLicense}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary" className={getStatusColor(row.original.status)}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.createdAt && format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {row.original.status === 'pending' && (
              <>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(row.original.id!, 'confirmed')}
                  className="text-green-600"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(row.original.id!, 'cancelled')}
                  className="text-red-600"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </DropdownMenuItem>
              </>
            )}
            
            {row.original.status === 'confirmed' && (
              <DropdownMenuItem
                onClick={() => handleStatusChange(row.original.id!, 'completed')}
                className="text-blue-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Mark Complete
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem
              onClick={() => window.open(`tel:${row.original.userPhone}`, '_blank')}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Customer
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => window.open(`mailto:${row.original.userEmail}`, '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => {
    if (statusFilter === "all") return true
    return booking.status === statusFilter
  })

  const table = useReactTable({
    data: filteredBookings,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search bookings..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No test drive bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {bookings.length} bookings
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
