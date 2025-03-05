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
}

export function AdminFleetTable({ vehicles }: AdminFleetTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

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
            <DropdownMenuItem className="flex items-center gap-2">
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> View Bookings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
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

