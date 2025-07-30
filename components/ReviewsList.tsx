"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: string
  name: string
  review: string
  rating: number
  createdAt: {
    toDate: () => Date
  }
}

export default function ReviewsList({ maxReviews = 6 }: { maxReviews?: number }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsQuery = query(
          collection(db, "reviews"),
          where("approved", "==", true),
          orderBy("createdAt", "desc"),
          limit(maxReviews)
        )
        
        const querySnapshot = await getDocs(reviewsQuery)
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[]
        
        setReviews(reviewsData)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [maxReviews])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-card p-6 rounded-lg">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-card p-6 rounded-lg">
          <CardContent className="p-0">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-primary">{review.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-gray-800 dark:text-yellow-400 fill-current" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-2">{review.review}</p>
            <p className="text-sm text-gray-500">
              {review.createdAt ? formatDate(review.createdAt.toDate()) : "Recent"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 