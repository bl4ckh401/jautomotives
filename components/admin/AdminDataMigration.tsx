"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  migrateCarListingsToVehicleListing, 
  cleanupOldCarListings, 
  verifyMigration 
} from "@/utils/dataMigration"
import { Database, Upload, Trash2, CheckCircle, AlertTriangle } from "lucide-react"

export function AdminDataMigration() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [verificationData, setVerificationData] = useState<any>(null)

  const handleMigration = async () => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const result = await migrateCarListingsToVehicleListing()
      setResults(result)
      
      // Auto-verify after migration
      const verification = await verifyMigration()
      setVerificationData(verification)
      
    } catch (err: any) {
      setError(err.message || "Migration failed")
    } finally {
      setLoading(false)
    }
  }

  const handleCleanup = async () => {
    if (!confirm("Are you sure you want to delete all carListings? This cannot be undone!")) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await cleanupOldCarListings()
      setResults(result)
      
      // Auto-verify after cleanup
      const verification = await verifyMigration()
      setVerificationData(verification)
      
    } catch (err: any) {
      setError(err.message || "Cleanup failed")
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async () => {
    setLoading(true)
    setError(null)

    try {
      const verification = await verifyMigration()
      setVerificationData(verification)
    } catch (err: any) {
      setError(err.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Migration Utility
          </CardTitle>
          <CardDescription>
            Migrate vehicle data from carListings to vehicleListings collection to fix inconsistencies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          {verificationData && (
            <div className="space-y-2">
              <h4 className="font-medium">Current Status:</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">
                  carListings: {verificationData.carListingsCount}
                </Badge>
                <Badge variant="outline">
                  vehicleListings: {verificationData.vehicleListingCount}
                </Badge>
                <Badge variant="outline">
                  Migrated: {verificationData.migratedCount}
                </Badge>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleVerification}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Data
            </Button>

            <Button
              onClick={handleMigration}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Upload className="h-4 w-4 mr-2" />
              {loading ? "Migrating..." : "Migrate Data"}
            </Button>

            <Button
              onClick={handleCleanup}
              disabled={loading || !verificationData?.migratedCount}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Cleanup Old Data
            </Button>
          </div>

          {/* Results */}
          {results && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                {results.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Instructions:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Click "Verify Data" to see current collection status</li>
              <li>Click "Migrate Data" to copy carListings to vehicleListings</li>
              <li>Verify migration was successful</li>
              <li>Once confirmed, click "Cleanup Old Data" to remove carListings</li>
            </ol>
            <p className="text-orange-600">
              <strong>Warning:</strong> Always backup your data before running migration!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
