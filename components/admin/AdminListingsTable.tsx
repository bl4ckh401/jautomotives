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
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { useToast } from "@/hooks/use-toast"

import { useAdmin } from "@/contexts/AdminContext"

export interface Listing {
  id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  status: "active" | "pending" | "sold" | "archived"
  seller: string
  createdAt: string
}

interface AdminListingsTableProps {
  listings: Listing[]
  onRefresh?: () => void
}

export function AdminListingsTable({ listings, onRefresh }: AdminListingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { deleteListing, updateListing } = useMarketplace()
  const { toast } = useToast()
  const { isAdmin } = useAdmin()

  // Handle view listing
  const handleView = (listingId: string) => {
    router.push(`/admin/listings/view/${listingId}`)
  }

  // Handle edit listing - redirect to sell-vehicle page with pre-filled data
  const handleEdit = (listingId: string) => {
    // Store the listing ID in sessionStorage so the sell-vehicle page can load it
    sessionStorage.setItem('editListingId', listingId)
    router.push(`/sell-vehicle?edit=${listingId}`)
  }

  // Handle delete listing
  const handleDelete = async (listingId: string, title: string) => {
    // Enhanced confirmation dialog
    const confirmed = window.confirm(
      `⚠️ DELETE CONFIRMATION ⚠️\n\n` +
      `Are you sure you want to permanently delete this listing?\n\n` +
      `Vehicle: "${title}"\n` +
      `ID: ${listingId}\n\n` +
      `This action cannot be undone and will:\n` +
      `• Remove the listing from the marketplace\n` +
      `• Delete all associated images\n` +
      `• Remove it from search results\n\n` +
      `Type 'DELETE' in the next prompt to confirm.`
    )

    if (!confirmed) {
      return
    }

    // Secondary confirmation requiring typing "DELETE"
    const confirmText = window.prompt(
      `To confirm deletion of "${title}", please type "DELETE" (case sensitive):`
    )

    if (confirmText !== "DELETE") {
      toast({
        title: "Deletion cancelled",
        description: "The listing was not deleted.",
      })
      return
    }

    setLoading(true)
    try {
      await deleteListing(listingId, isAdmin) // Pass admin override
      toast({
        title: "Listing deleted successfully",
        description: `"${title}" has been permanently removed from the marketplace.`,
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error deleting listing:", error)
      toast({
        title: "Error deleting listing",
        description: error.message || "Failed to delete the listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle status change
  const handleStatusChange = async (listingId: string, newStatus: string) => {
    setLoading(true)
    try {
      await updateListing(listingId, { status: newStatus as any })
      toast({
        title: "Status updated",
        description: `Listing status has been changed to ${newStatus}.`,
      })
      onRefresh?.()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: error.message || "Failed to update the listing status.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const columns: ColumnDef<Listing>[] = [
    {
      accessorKey: "title",
      header: "Vehicle",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.year} {row.original.make} {row.original.model}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>${row.original.price.toLocaleString()}</div>,
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
          case "sold":
            badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
            break
          case "archived":
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
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
      accessorKey: "seller",
      header: "Seller",
      cell: ({ row }) => {
        const seller = row.original.seller
        return (
          <div className="text-sm text-muted-foreground">
            {seller ? seller : "Jaba Motors"}
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Listed On",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
              <Eye className="h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleEdit(row.original.id)}
            >
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleStatusChange(row.original.id, "active")}
              disabled={row.original.status === "active"}
            >
              Activate
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={() => handleStatusChange(row.original.id, "archived")}
              disabled={row.original.status === "archived"}
            >
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-2 text-red-600"
              onClick={() => handleDelete(row.original.id, row.original.title)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: listings,
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
            listings.length,
          )}{" "}
          of {listings.length} entries
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

