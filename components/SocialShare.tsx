import { Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")}
      >
        <Twitter className="w-4 h-4 mr-2" />
        Tweet
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")}
      >
        <Facebook className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  )
}

