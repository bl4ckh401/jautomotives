"use client"

import React, { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Mail, 
  Copy, 
  Check,
  Share,
  Smartphone
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface VehicleShareModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: {
    id: string
    title: string
    price: string
    image: string
    year: string | number
    make: string
    model: string
  }
}

export default function VehicleShareModal({
  isOpen,
  onClose,
  vehicle
}: VehicleShareModalProps) {
  const [copied, setCopied] = useState(false)
  
  // Construct the vehicle URL
  const vehicleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/vehicles/${vehicle.id}` 
    : `https://jautomotives.com/vehicles/${vehicle.id}`

  const shareTitle = `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const shareDescription = `${shareTitle} - KES ${parseInt(vehicle.price || "0").toLocaleString()} | Available at J Automotives`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(vehicleUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Vehicle link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      })
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: vehicleUrl,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    } else {
      toast({
        title: "Sharing not supported",
        description: "Please use one of the other sharing options.",
        variant: "destructive"
      })
    }
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareDescription}\n\n${vehicleUrl}`)}`
        window.open(whatsappUrl, '_blank')
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(vehicleUrl)}`
        window.open(facebookUrl, '_blank')
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareDescription)}&url=${encodeURIComponent(vehicleUrl)}`
        window.open(twitterUrl, '_blank')
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => {
        const subject = encodeURIComponent(shareTitle)
        const body = encodeURIComponent(`Hi,\n\nI thought you might be interested in this vehicle:\n\n${shareDescription}\n\nView details: ${vehicleUrl}\n\nBest regards`)
        const emailUrl = `mailto:?subject=${subject}&body=${body}`
        window.open(emailUrl)
      }
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Share Vehicle
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Vehicle Preview */}
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
              <img 
                src={vehicle.image || "/placeholder.svg"} 
                alt={vehicle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{vehicle.title}</p>
              <p className="text-sm text-muted-foreground">
                KES {parseInt(vehicle.price || "0").toLocaleString()}
              </p>
            </div>
          </div>

          {/* Native Share (Mobile) */}
          {typeof window !== 'undefined' && navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Share via Device
            </Button>
          )}

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.color} text-white flex flex-col items-center gap-2 h-auto py-4`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs">{option.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input
                value={vehicleUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="px-3"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
