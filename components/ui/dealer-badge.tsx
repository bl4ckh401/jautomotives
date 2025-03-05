import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface DealerBadgeProps {
  name: string
  image?: string
  verified?: boolean
}

export function DealerBadge({ name, image, verified = false }: DealerBadgeProps) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        {verified && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span className="text-xs">VERIFIED DEALER</span>
          </Badge>
        )}
      </div>
    </div>
  )
}

