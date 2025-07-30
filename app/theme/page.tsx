import ColorPalette from "@/components/ColorPalette";
import { VehicleShowcase } from "@/components/ModernVehicleCard";

export default function ThemePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-jaba-gold via-jaba-gold-light to-jaba-gold bg-clip-text text-transparent">
            JABA Motors
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">Modern Design System</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our enhanced color palette and modern UI components designed for exceptional user experience 
            in both light and dark modes. This theme reflects our commitment to automotive excellence and cutting-edge design.
          </p>
        </div>
        
        <ColorPalette />
        
        <VehicleShowcase />
        
        <div className="bg-gradient-to-r from-jaba-gold/10 via-transparent to-jaba-red/10 p-8 rounded-2xl border border-jaba-gold/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Ready to Experience the Difference?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse our premium collection of vehicles with the enhanced modern interface that makes finding your perfect car effortless.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button className="btn-primary">
                Explore Vehicles
              </button>
              <button className="btn-secondary">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
