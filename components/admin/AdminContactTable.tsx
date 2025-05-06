"use client"

import { useState } from "react"
import { ContactRequest, updateContactRequest } from "@/services/contactService"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface AdminContactTableProps {
  contactRequests: ContactRequest[]
  onStatusUpdate: () => void
}

export default function AdminContactTable({ contactRequests, onStatusUpdate }: AdminContactTableProps) {
  const { toast } = useToast()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    setUpdating(requestId)
    try {
      await updateContactRequest(requestId, {
        status: newStatus as ContactRequest["status"],
        ...(newStatus === "resolved" ? { resolvedAt: new Date() } : {}),
      })
      onStatusUpdate()
      toast({
        title: "Status updated",
        description: "The contact request status has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "There was a problem updating the status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  if (contactRequests.length === 0) {
    return (
      <div className="text-center py-6">
        No contact requests found.
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contactRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell className="max-w-xs truncate">{request.message}</TableCell>
              <TableCell>{formatDistanceToNow(request.createdAt)} ago</TableCell>
              <TableCell>
                <Select
                  defaultValue={request.status}
                  onValueChange={(value) => handleStatusChange(request.id!, value)}
                  disabled={updating === request.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {/* Add view details action */}}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

