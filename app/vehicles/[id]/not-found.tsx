import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function VehicleNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Vehicle Not Found</h2>
          <p className="text-muted-foreground">
            The vehicle you're looking for might have been sold, removed, or the link might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href="/marketplace">
                <Search className="mr-2 h-4 w-4" />
                Browse All Vehicles
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Looking for something specific?</p>
            <Link 
              href="/marketplace" 
              className="text-primary hover:underline font-medium"
            >
              Use our advanced search filters
            </Link>
          </div>
        </div>

        {/* SEO-friendly suggestions */}
        <div className="mt-12 text-left space-y-4">
          <h3 className="font-semibold">Popular Categories:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/marketplace?vehicleType=SUV" className="text-primary hover:underline">
              SUVs for Sale
            </Link>
            <Link href="/marketplace?vehicleType=Sedan" className="text-primary hover:underline">
              Sedans for Sale
            </Link>
            <Link href="/second-hand" className="text-primary hover:underline">
              Second-Hand Cars
            </Link>
            <Link href="/direct-import" className="text-primary hover:underline">
              Direct Import
            </Link>
            <Link href="/motorbikes" className="text-primary hover:underline">
              Motorbikes
            </Link>
            <Link href="/marketplace?featured=true" className="text-primary hover:underline">
              Featured Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}