import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reviews = [
  {
    name: "John Kamau",
    avatar: "/avatars/john.jpg",
    rating: 5,
    review:
      "JABA Automobiles made buying my dream car a seamless experience. Their team was professional and helpful throughout the process.",
    date: "July 2, 2023",
  },
  {
    name: "Sarah Wanjiku",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    review: "I sold my car through JABA Automobiles and got a great deal. The process was quick and transparent.",
    date: "June 18, 2023",
  },
  {
    name: "Michael Omondi",
    avatar: "/avatars/michael.jpg",
    rating: 5,
    review:
      "The customer service at JABA Automobiles is exceptional. They helped me find the perfect car within my budget.",
    date: "June 5, 2023",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-background p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold dark:text-primary text-gray-800 dark:text-yellow-400">{review.name}</h3>
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
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

