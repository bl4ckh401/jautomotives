import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CustomerReviewProps {
  name: string
  avatar: string
  rating: number
  review: string
  date: string
}

export default function CustomerReview({ name, avatar, rating, review, date }: CustomerReviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{review}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
    </div>
  )
}

