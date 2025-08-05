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
import { Edit, Eye, MoreHorizontal, Wrench, Calendar } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { updateFleetVehicle, deleteFleetVehicle } from "@/services/fleetService"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  category: string
  status: "available" | "booked" | "maintenance"
  dailyRate: number
  image?: string
  lastMaintenance?: string
  nextMaintenance?: string
}

interface AdminFleetTableProps {
  vehicles: Vehicle[]
  onRefresh?: () => void
}

export function AdminFleetTable({ vehicles, onRefresh }: AdminFleetTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Handle view vehicle details
  const handleView = (vehicleId: string) => {
    router.push(`/fleet/vehicle/${vehicleId}`)
  }

  // Handle edit vehicle
  const handleEdit = (vehicleId: string) => {
    router.push(`/admin/fleet/edit/${vehicleId}`)
  }

  // Handle view bookings
  const handleViewBookings = (vehicleId: string) => {
    router.push(`/admin/bookings?vehicle=${vehicleId}`)
  }

  // Handle status change
  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    setLoading(true)
    try {
      await updateFleetVehicle(vehicleId, { status: newStatus as any })
      toast({
        title: "Status updated",
        description: `Vehicle status has been changed to ${newStatus}.`,
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: error.message || "Failed to update the vehicle status.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle schedule maintenance
  const handleScheduleMaintenance = async (vehicleId: string) => {
    const nextMaintenanceDate = prompt("Enter next maintenance date (YYYY-MM-DD):")
    if (!nextMaintenanceDate) return

    setLoading(true)
    try {
      await updateFleetVehicle(vehicleId, { 
        status: "maintenance"
      })
      toast({
        title: "Maintenance scheduled",
        description: "Maintenance has been scheduled for this vehicle.",
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error scheduling maintenance:", error)
      toast({
        title: "Error scheduling maintenance",
        description: error.message || "Failed to schedule maintenance.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-16 relative rounded overflow-hidden">
            <Image
              src={row.original.image || "/placeholder.svg"}
              alt={`${row.original.make} ${row.original.model}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">
              {row.original.make} {row.original.model}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.original.year} • {row.original.licensePlate}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "dailyRate",
      header: "Daily Rate",
      cell: ({ row }) => <div>${row.original.dailyRate.toLocaleString()}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeClass = ""

        switch (status) {
          case "available":
            badgeClass = "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
            break
          case "booked":
            badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
            break
          case "maintenance":
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
      accessorKey: "maintenance",
      header: "Maintenance",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.lastMaintenance && (
            <div className="flex items-center text-xs">
              <span className="text-muted-foreground mr-1">Last:</span>
              <span>{new Date(row.original.lastMaintenance).toLocaleDateString()}</span>
            </div>
          )}
          {row.original.nextMaintenance && (
            <div className="flex items-center text-xs">
              <span className="text-muted-foreground mr-1">Next:</span>
              <span>{new Date(row.original.nextMaintenance).toLocaleDateString()}</span>
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
            <Button variant="ghost" size="icon" disabled={loading}>
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
              <Eye className="h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleEdit(row.original.id)}
            >
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleViewBookings(row.original.id)}
            >
              <Calendar className="h-4 w-4" /> View Bookings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleStatusChange(row.original.id, "available")}
              disabled={row.original.status === "available"}
            >
              Mark Available
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleScheduleMaintenance(row.original.id)}
            >
              <Wrench className="h-4 w-4" /> Schedule Maintenance
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: vehicles,
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
                  No results.
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
            vehicles.length,
          )}{" "}
          of {vehicles.length} entries
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

