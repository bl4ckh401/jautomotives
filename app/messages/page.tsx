import MessageList from "@/components/MessageList"

export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Messages</h1>
      <MessageList />
    </div>
  )
}

