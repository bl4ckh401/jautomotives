"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Car, Star, Shield, Calendar, Banknote } from 'lucide-react'

export default function ModernColorPalette() {
  return (
    <div className="space-y-8">
      {/* Color Swatches */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Modern Jaba Motors Color Palette</CardTitle>
          <CardDescription>
            Enhanced color scheme for both light and dark modes with improved accessibility and modern aesthetics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ColorSwatch color="bg-jaba-gold" name="Jaba Gold" hex="#FFD700" />
              <ColorSwatch color="bg-jaba-gold-dark" name="Gold Dark" hex="#E6C200" />
              <ColorSwatch color="bg-jaba-gold-light" name="Gold Light" hex="#FFF700" />
              <ColorSwatch color="bg-jaba-red" name="Jaba Red" hex="#C8102E" />
              <ColorSwatch color="bg-jaba-red-dark" name="Red Dark" hex="#B22222" />
              <ColorSwatch color="bg-jaba-silver" name="Jaba Silver" hex="#A9A9A9" />
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Theme Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch color="bg-background" name="Background" bordered />
              <ColorSwatch color="bg-card" name="Card" bordered />
              <ColorSwatch color="bg-muted" name="Muted" bordered />
              <ColorSwatch color="bg-border" name="Border" bordered />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Examples */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Component Examples</CardTitle>
          <CardDescription>
            See how the modern color scheme works across different UI components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buttons */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button className="btn-primary">
                <Car className="w-4 h-4 mr-2" />
                Primary Button
              </Button>
              <Button variant="outline" className="btn-secondary">
                <Shield className="w-4 h-4 mr-2" />
                Secondary Button
              </Button>
              <Button variant="ghost" className="hover:bg-jaba-gold/10 hover:text-jaba-gold">
                <Calendar className="w-4 h-4 mr-2" />
                Ghost Button
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">Badges & Tags</h4>
            <div className="flex flex-wrap gap-3">
              <Badge className="badge-featured">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
              <Badge variant="secondary" className="bg-jaba-gold/20 text-jaba-gold-dark border-jaba-gold/30">
                Premium
              </Badge>
              <Badge variant="outline" className="border-jaba-silver text-jaba-silver">
                <Banknote className="w-3 h-3 mr-1" />
                Financing Available
              </Badge>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-modern border-l-4 border-l-jaba-gold">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-foreground">Vehicle Listing</h5>
                      <p className="text-sm text-muted-foreground">Modern card with accent border</p>
                    </div>
                    <Car className="h-8 w-8 text-jaba-gold" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern bg-gradient-to-br from-jaba-gold/5 to-jaba-gold/10 border-jaba-gold/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-foreground">Premium Feature</h5>
                      <p className="text-sm text-muted-foreground">Gradient background card</p>
                    </div>
                    <Shield className="h-8 w-8 text-jaba-gold" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-foreground">Typography</h4>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Heading 1 - Primary Text</h1>
              <h2 className="text-2xl font-semibold text-foreground">Heading 2 - Primary Text</h2>
              <p className="text-foreground">Regular body text using primary foreground color.</p>
              <p className="text-muted-foreground">Secondary text using muted foreground for less emphasis.</p>
              <p className="text-jaba-gold font-semibold">Accent text using Jaba Gold for highlights.</p>
              <p className="text-jaba-red font-medium">Error or warning text using Jaba Red.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Usage Guidelines */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for using the modern color scheme effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Primary Actions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use Jaba Gold for primary buttons, links, and key interactive elements.
              </p>
              <Button className="btn-primary w-full">Book Test Drive</Button>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Alerts & Status</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use Jaba Red for alerts, featured items, and important status indicators.
              </p>
              <div className="p-3 bg-jaba-red/10 border border-jaba-red/20 rounded-lg">
                <p className="text-jaba-red font-medium text-sm">
                  <Star className="w-4 h-4 inline mr-1" />
                  Featured Vehicle - Limited Time Offer
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Secondary Elements</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use Jaba Silver for secondary text, icons, and supporting elements.
              </p>
              <div className="flex items-center text-jaba-silver">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Last updated: Today</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Backgrounds</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Cards use subtle background colors for better content organization.
              </p>
              <div className="p-3 bg-card border border-border rounded-lg">
                <p className="text-card-foreground text-sm">Card background example</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ColorSwatch({ color, name, hex, bordered = false }: { 
  color: string; 
  name: string; 
  hex?: string; 
  bordered?: boolean 
}) {
  return (
    <div className="text-center">
      <div 
        className={`w-16 h-16 rounded-lg mx-auto mb-2 ${color} ${bordered ? 'border-2 border-border' : ''}`}
      />
      <p className="text-xs font-medium text-foreground">{name}</p>
      {hex && <p className="text-xs text-muted-foreground">{hex}</p>}
    </div>
  )
}
