"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const initialMessages = [
  {
    id: 1,
    sender: "Alice",
    avatar: "/avatars/01.png",
    message: "Hi, I'm interested in the Tesla Model S you have listed.",
    timestamp: "2023-06-10T10:30:00Z",
  },
  {
    id: 2,
    sender: "Bob",
    avatar: "/avatars/02.png",
    message: "Is the Porsche 911 still available?",
    timestamp: "2023-06-09T14:45:00Z",
  },
  {
    id: 3,
    sender: "Charlie",
    avatar: "/avatars/03.png",
    message: "I'd like to schedule a test drive for the Audi e-tron.",
    timestamp: "2023-06-08T09:15:00Z",
  },
]

export default function MessageList() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        avatar: "/avatars/04.png",
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages([message, ...messages])
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{message.sender}</h3>
                  <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
                <p className="mt-1">{message.message}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="ml-auto">
              Reply
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

