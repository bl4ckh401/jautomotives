import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy, Timestamp, addDoc, serverTimestamp, limit } from "firebase/firestore"
import { subDays, subMonths } from "date-fns"

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  userEmail: string
  action: string
  entityType: "listing" | "booking" | "user" | "contact" | "assistance"
  entityId: string
  timestamp: Timestamp
  details?: any
}

export interface AnalyticsMetrics {
  // User metrics
  totalUsers: number
  newUsers: number
  activeUsers: number

  // Listing metrics
  totalListings: number
  activeListings: number
  soldListings: number
  avgListingPrice: number

  // Booking metrics
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number

  // Engagement metrics
  totalViews: number
  totalInquiries: number
  conversionRate: number

  // Period comparisons
  previousPeriod: {
    totalListings: number
    totalBookings: number
    totalRevenue: number
    totalUsers: number
    activeListings: number
    totalViews: number
    totalInquiries: number
  }
}

export interface ChartDataPoint {
  date: string
  listings: number
  bookings: number
  revenue: number
  users: number
}

// Get recent activity logs
export const getActivityLogs = async (limitCount = 10): Promise<ActivityLog[]> => {
  const logsRef = collection(db, "activityLogs")
  const q = query(logsRef, orderBy("timestamp", "desc"), limit(limitCount))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ActivityLog[]
}

// Get analytics metrics for a specific time period
export const getAnalyticsMetrics = async (days = 30): Promise<AnalyticsMetrics> => {
  const startDate = subDays(new Date(), days)
  const metrics: AnalyticsMetrics = {
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    totalListings: 0,
    activeListings: 0,
    soldListings: 0,
    avgListingPrice: 0,
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    totalViews: 0,
    totalInquiries: 0,
    conversionRate: 0,
    previousPeriod: {
      totalListings: 0,
      totalBookings: 0,
      totalRevenue: 0,
      totalUsers: 0,
      activeListings: 0,
      totalViews: 0,
      totalInquiries: 0
    }
  }

  try {
    // Fetch users data
    const usersRef = collection(db, "users")
    const usersSnapshot = await getDocs(usersRef)
    metrics.totalUsers = usersSnapshot.size

    // Fetch listings data
    const listingsRef = collection(db, "vehicleListings")
    const listingsQuery = query(listingsRef, where("createdAt", ">=", startDate))
    const listingsSnapshot = await getDocs(listingsQuery)
    
    let totalPrice = 0
    listingsSnapshot.docs.forEach(doc => {
      const data = doc.data()
      totalPrice += Number(data.price) || 0
      if (data.status === "active") metrics.activeListings++
      if (data.status === "sold") metrics.soldListings++
    })
    
    metrics.totalListings = listingsSnapshot.size
    metrics.avgListingPrice = totalPrice / listingsSnapshot.size || 0

    // Fetch bookings data
    const bookingsRef = collection(db, "bookings")
    const bookingsQuery = query(bookingsRef, where("createdAt", ">=", startDate))
    const bookingsSnapshot = await getDocs(bookingsQuery)
    
    let totalRevenue = 0
    bookingsSnapshot.docs.forEach(doc => {
      const data = doc.data()
      totalRevenue += data.totalPrice || 0
      if (data.status === "completed") metrics.completedBookings++
      if (data.status === "cancelled") metrics.cancelledBookings++
    })
    
    metrics.totalBookings = bookingsSnapshot.size
    metrics.totalRevenue = totalRevenue

    // Calculate engagement metrics
    const totalViews = listingsSnapshot.docs.reduce((acc, doc) => acc + (doc.data().views || 0), 0)
    const totalInquiries = listingsSnapshot.docs.reduce((acc, doc) => acc + (doc.data().inquiries || 0), 0)
    
    metrics.totalViews = totalViews
    metrics.totalInquiries = totalInquiries
    metrics.conversionRate = (totalInquiries / totalViews) * 100 || 0

    // Get previous period metrics for comparison
    const previousStartDate = subDays(startDate, days)
    const previousListingsQuery = query(
      listingsRef,
      where("createdAt", ">=", previousStartDate),
      where("createdAt", "<", startDate)
    )
    const previousBookingsQuery = query(
      bookingsRef,
      where("createdAt", ">=", previousStartDate),
      where("createdAt", "<", startDate)
    )

    const [previousListings, previousBookings] = await Promise.all([
      getDocs(previousListingsQuery),
      getDocs(previousBookingsQuery)
    ])

    metrics.previousPeriod = {
      totalListings: previousListings.size,
      totalBookings: previousBookings.size,
      totalRevenue: previousBookings.docs.reduce((acc, doc) => acc + (doc.data().totalPrice || 0), 0),
      totalUsers: metrics.totalUsers, // This is an approximation since we don't track user creation date yet
      activeListings: metrics.activeListings,
      totalViews: metrics.totalViews,
      totalInquiries: metrics.totalInquiries
    }

    return metrics
  } catch (error) {
    console.error("Error fetching analytics metrics:", error)
    throw error
  }
}

// Get chart data for the dashboard
export const getChartData = async (months = 6): Promise<ChartDataPoint[]> => {
  const endDate = new Date()
  const startDate = subMonths(endDate, months)
  
  try {
    const listingsRef = collection(db, "vehicleListings")
    const bookingsRef = collection(db, "bookings")
    const usersRef = collection(db, "users")

    const [listingsSnapshot, bookingsSnapshot, usersSnapshot] = await Promise.all([
      getDocs(query(listingsRef, where("createdAt", ">=", startDate))),
      getDocs(query(bookingsRef, where("createdAt", ">=", startDate))),
      getDocs(query(usersRef, where("createdAt", ">=", startDate)))
    ])

    const chartData: Record<string, ChartDataPoint> = {}

    // Initialize data points for each month
    for (let i = 0; i <= months; i++) {
      const date = subMonths(endDate, i)
      const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format
      chartData[monthKey] = {
        date: monthKey,
        listings: 0,
        bookings: 0,
        revenue: 0,
        users: 0
      }
    }

    // Aggregate listings data
    listingsSnapshot.docs.forEach(doc => {
      const data = doc.data()
      const date = new Date(data.createdAt.seconds * 1000)
      const monthKey = date.toISOString().slice(0, 7)
      if (chartData[monthKey]) {
        chartData[monthKey].listings++
      }
    })

    // Aggregate bookings data
    bookingsSnapshot.docs.forEach(doc => {
      const data = doc.data()
      const date = new Date(data.createdAt.seconds * 1000)
      const monthKey = date.toISOString().slice(0, 7)
      if (chartData[monthKey]) {
        chartData[monthKey].bookings++
        chartData[monthKey].revenue += data.totalPrice || 0
      }
    })

    // Aggregate users data
    usersSnapshot.docs.forEach(doc => {
      const data = doc.data()
      const date = new Date(data.createdAt.seconds * 1000)
      const monthKey = date.toISOString().slice(0, 7)
      if (chartData[monthKey]) {
        chartData[monthKey].users++
      }
    })

    return Object.values(chartData).sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    console.error("Error fetching chart data:", error)
    throw error
  }
}

// Log activity for analytics
export const logActivity = async (activity: Omit<ActivityLog, "id" | "timestamp">) => {
  try {
    const logsRef = collection(db, "activityLogs")
    await addDoc(logsRef, {
      ...activity,
      timestamp: serverTimestamp()
    })
  } catch (error) {
    console.error("Error logging activity:", error)
  }
}