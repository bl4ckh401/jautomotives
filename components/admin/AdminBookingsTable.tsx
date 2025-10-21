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
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Eye, MoreHorizontal, X, Calendar, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAvatar?: string
  vehicleId: string
  vehicleDetails?: {
    make: string
    model: string
    year: string
  }
  startDate: any
  endDate: any
  totalPrice: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: any
  updatedAt?: any
  specialRequests?: string
}

interface AdminBookingsTableProps {
  bookings: Booking[]
}

export function AdminBookingsTable({ bookings }: AdminBookingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { toast } = useToast()

  const updateBookingStatus = async (bookingId: string, newStatus: Booking["status"]) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId)
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: new Date()
      })

      toast({
        title: "Booking updated",
        description: `Booking status changed to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      })
    }
  }

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.customerAvatar} alt={row.original.customerName} />
            <AvatarFallback>{row.original.customerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.customerName}</div>
            <div className="text-xs text-muted-foreground">{row.original.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.vehicleDetails ? 
              `${row.original.vehicleDetails.year} ${row.original.vehicleDetails.make} ${row.original.vehicleDetails.model}` :
              'N/A'
            }
          </div>
          <div className="text-xs text-muted-foreground">
            ID: {row.original.vehicleId}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "dates",
      header: "Booking Period",
      cell: ({ row }) => {
        const startDate = new Date(row.original.startDate.seconds * 1000)
        const endDate = new Date(row.original.endDate.seconds * 1000)
        
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Price",
      cell: ({ row }) => (
        <div className="font-medium">
          KES {row.original.totalPrice.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeClass = ""

        switch (status) {
          case "confirmed":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
            break
          case "pending":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
            break
          case "completed":
            badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
            break
          case "cancelled":
            badgeClass = "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
            break
        }

        return (
          <Badge variant="outline" className={badgeClass}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt.seconds * 1000)
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{date.toLocaleTimeString()}</span>
            </div>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <Eye className="h-4 w-4" /> View Details
            </DropdownMenuItem>
            {row.original.status === "pending" && (
              <>
                <DropdownMenuItem 
                  className="flex items-center gap-2 text-green-600"
                  onClick={() => updateBookingStatus(row.original.id, "confirmed")}
                >
                  <Check className="h-4 w-4" /> Confirm
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2 text-red-600"
                  onClick={() => updateBookingStatus(row.original.id, "cancelled")}
                >
                  <X className="h-4 w-4" /> Cancel
                </DropdownMenuItem>
              </>
            )}
            {row.original.status === "confirmed" && (
              <DropdownMenuItem 
                className="flex items-center gap-2 text-blue-600"
                onClick={() => updateBookingStatus(row.original.id, "completed")}
              >
                <Check className="h-4 w-4" /> Mark as Completed
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: bookings,
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

  return (
    <div className="w-full">
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 sm:px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          <span className="hidden sm:inline">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              bookings.length,
            )}{" "}
            of {bookings.length} entries
          </span>
          <span className="sm:hidden">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">←</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">→</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

