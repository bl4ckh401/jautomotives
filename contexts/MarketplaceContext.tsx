"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "./AuthContext";

// Types
export type VehicleCondition = "New" | "Foreign Used" | "Certified Pre-Owned";
export type VehicleType =
  | "Car"
  | "Motorbike"
  | "Truck"
  | "SUV"
  | "Van"
  | "Other";

export interface Feature {
  name: string;
  category: string;
  value: boolean;
}

export interface VehicleListing {
  id?: string;
  // Basic info
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  vehicleType: string;
  description: string;

  // Details
  mileage: string;
  vin?: string;
  exteriorColor: string;
  interiorColor: string;
  transmission: string;
  engineSize?: string;
  fuelType: string;
  doors: string;

  // Condition and history
  condition: VehicleCondition;
  ownerHistory: string;
  accidentHistory: string;
  serviceHistory?: string;
  sellingReason?: string;

  // Features
  features: Record<string, boolean>;
  additionalFeatures?: string;

  // Images
  images: string[];
  mainImage?: string;

  // Contact details
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  location: string;

  // Listing options
  listingDuration: string;
  featured: boolean;
  negotiable: boolean;

  // Metadata
  userId: string;
  userEmail: string;
  status: "active" | "sold" | "inactive" | "pending";
  listingType: "sale" | "trade-in";
  // Mark whether this listing is a second-hand listing (admin/seller flag)
  secondHand?: boolean;
  directImport?: boolean; // Flag for direct import listings
  createdAt: any; // Firestore timestamp
  updatedAt: any; // Firestore timestamp
  expiresAt?: any; // Firestore timestamp
  views?: number;
  favorites?: number;

  dealer: {
    name: string;
    image?: string;
    verified?: boolean;
  };
}

export interface ListingFilters {
  make?: string[];
  model?: string[];
  minYear?: string;
  maxYear?: string;
  minPrice?: string;
  maxPrice?: string;
  vehicleType?: string[];
  condition?: VehicleCondition[];
  transmission?: string[];
  fuelType?: string[];
  features?: string[];
  location?: string;
  sortBy?:
    | "newest"
    | "price-low"
    | "price-high"
    | "year-new"
    | "year-old"
    | "mileage-low";
  userId?: string;
  status?: string;
  featured?: boolean;
}

interface MarketplaceContextType {
  // Listings
  createListing: (
    listingData: Omit<
      VehicleListing,
      "id" | "createdAt" | "updatedAt" | "status" | "views" | "favorites"
    >,
    images: File[]
  ) => Promise<string>;
  updateListing: (
    listingId: string,
    listingData: Partial<VehicleListing>,
    newImages?: File[]
  ) => Promise<void>;
  deleteListing: (
    listingId: string,
    isAdminOverride?: boolean
  ) => Promise<void>;
  getListing: (listingId: string) => Promise<VehicleListing>;
  getListings: (
    filters?: ListingFilters,
    itemsPerPage?: number,
    lastVisible?: any
  ) => Promise<{ listings: VehicleListing[]; lastVisible: any }>;
  getMyListings: () => Promise<VehicleListing[]>;
  markAsSold: (listingId: string) => Promise<void>;
  toggleFavorite: (listingId: string) => Promise<void>;
  incrementViews: (listingId: string) => Promise<void>;
  refreshData: () => Promise<void>;
  exportListings: (format: "csv" | "json") => Promise<void>;

  // Utility functions
  uploadImages: (files: File[], path: string) => Promise<string[]>;
  deleteImages: (imageUrls: string[]) => Promise<void>;

  // State
  loading: boolean;
  myListings: VehicleListing[];
  favorites: string[];
  lastRefresh: Date;
  // Auctions
  createAuction: (auctionData: any) => Promise<string>;
  placeBid: (auctionId: string, bidAmount: string) => Promise<void>;
  getAuction: (auctionId: string) => Promise<any>;
  getAuctions: () => Promise<any[]>;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [myListings, setMyListings] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(false); // Start as false, not true
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization
  const refreshInterval = 10 * 60 * 1000; // 10 minutes - less frequent
  const [favorites, setFavorites] = useState<string[]>([]);
  const isLoadingRef = useRef(false); // Use ref to prevent dependency cycles
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Cache invalidation and refresh function
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "vehicleListings"));
      const fetchedListings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VehicleListing[];

      setListings(fetchedListings);
      setLastRefresh(new Date());
      setError(null);
    } catch (error: any) {
      console.error("Error refreshing data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simple initialization - run once on mount
  useEffect(() => {
    if (!isInitialized) {
      console.log("Initial data load - one time only");
      setIsInitialized(true);
      refreshData();
    }
  }, [isInitialized]); // Remove refreshData from dependencies

  // Separate effect for background refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const lastRefreshTime = lastRefresh.getTime();

      // Only refresh if data is older than refresh interval and we have initialized
      if (isInitialized && now - lastRefreshTime > refreshInterval) {
        console.log("Background refresh triggered - data is stale");
        refreshData();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isInitialized, lastRefresh, refreshInterval]); // Remove refreshData from dependencies

  // Create a new vehicle listing
  const createListing = async (
    listingData: Omit<
      VehicleListing,
      "id" | "createdAt" | "updatedAt" | "status" | "views" | "favorites"
    >,
    images: File[]
  ): Promise<string> => {
    if (!user) {
      throw new Error("You must be logged in to create a listing");
    }

    setLoading(true);
    try {
      // Prepare listing data with timestamps and user info
      const listingWithMeta = {
        ...listingData,
        userId: user.id,
        userEmail: user.email,
        status: "active",
        listingType: "sale",
        secondHand: (listingData as any).secondHand || false,
        directImport: (listingData as any).directImport || false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        favorites: 0,
      } as VehicleListing;

      // Add to Firestore
      const listingRef = await addDoc(
        collection(db, "vehicleListings"),
        listingWithMeta
      );
      const listingId = listingRef.id;

      // Upload images if any
      if (images.length > 0) {
        const imageUrls = await uploadImages(images, `listings/${listingId}`);

        // Update the document with image URLs
        await updateDoc(doc(db, "vehicleListings", listingId), {
          images: imageUrls,
          mainImage: imageUrls[0] || null,
        });
      }

      toast({
        title: "Vehicle listed successfully",
        description: "Your vehicle has been added to the marketplace.",
      });

      // Get the updated list of user's listings
      await fetchMyListings();

      return listingId;
    } catch (error: any) {
      toast({
        title: "Error creating listing",
        description:
          error.message || "There was a problem creating your listing",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing vehicle listing
  const updateListing = async (
    listingId: string,
    listingData: Partial<VehicleListing>,
    newImages?: File[]
  ): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to update a listing");
    }

    setLoading(true);
    try {
      // Get the current listing
      const listingRef = doc(db, "vehicleListings", listingId);
      const listingSnap = await getDoc(listingRef);

      if (!listingSnap.exists()) {
        throw new Error("Listing not found");
      }

      const currentListing = listingSnap.data() as VehicleListing;

      // Check if user owns this listing
      if (currentListing.userId !== user.id) {
        throw new Error("You don't have permission to update this listing");
      }

      // Upload any new images
      let allImages = currentListing.images || [];

      if (newImages && newImages.length > 0) {
        const newImageUrls = await uploadImages(
          newImages,
          `listings/${listingId}/additions`
        );
        allImages = [...allImages, ...newImageUrls];
      }

      // Update the document
      await updateDoc(listingRef, {
        ...listingData,
        images: allImages,
        mainImage: listingData.mainImage || allImages[0] || null,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Listing updated",
        description: "Your vehicle listing has been updated successfully.",
      });

      // Get the updated list of user's listings
      await fetchMyListings();
    } catch (error: any) {
      toast({
        title: "Error updating listing",
        description:
          error.message || "There was a problem updating your listing",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a vehicle listing
  const deleteListing = async (
    listingId: string,
    isAdminOverride: boolean = false
  ): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to delete a listing");
    }

    setLoading(true);
    try {
      // Get the listing to check ownership and get image URLs for deletion
      const listingRef = doc(db, "vehicleListings", listingId);
      const listingSnap = await getDoc(listingRef);

      if (!listingSnap.exists()) {
        throw new Error("Listing not found");
      }

      const listing = listingSnap.data() as VehicleListing;

      // Check if user owns this listing or is admin
      if (!isAdminOverride && listing.userId !== user.id) {
        throw new Error("You don't have permission to delete this listing");
      }

      // Delete the listing
      await deleteDoc(listingRef);

      // Delete associated images
      if (listing.images && listing.images.length > 0) {
        await deleteImages(listing.images);
      }

      toast({
        title: "Listing deleted",
        description:
          "Your vehicle listing has been removed from the marketplace.",
      });

      // Get the updated list of user's listings
      await fetchMyListings();
    } catch (error: any) {
      toast({
        title: "Error deleting listing",
        description:
          error.message || "There was a problem deleting your listing",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Modified getListing function with cache validation
  const getListing = useCallback(
    async (listingId: string): Promise<VehicleListing> => {
      try {
        // Check if listing exists in cache and is fresh
        const cachedListing = listings.find((l) => l.id === listingId);
        const isCacheFresh =
          lastRefresh &&
          new Date().getTime() - lastRefresh.getTime() < refreshInterval;

        if (cachedListing && isCacheFresh) {
          return cachedListing;
        }

        const listingRef = doc(db, "vehicleListings", listingId);
        const listingSnap = await getDoc(listingRef);

        if (!listingSnap.exists()) {
          throw new Error("Listing not found");
        }

        const listing = {
          id: listingId,
          ...listingSnap.data(),
        } as VehicleListing;

        return listing;
      } catch (error: any) {
        throw error;
      }
    },
    [listings, lastRefresh, refreshInterval]
  );

  // Modified getListings function with improved caching
  const getListings = useCallback(
    async (
      filters?: ListingFilters,
      itemsPerPage: number = 12,
      lastVisible: any = null
    ): Promise<{ listings: VehicleListing[]; lastVisible: any }> => {
      try {
        // For simple cases (no filters, no pagination), use cache if fresh
        const isCacheFresh =
          lastRefresh &&
          new Date().getTime() - lastRefresh.getTime() < refreshInterval;

        if (isCacheFresh && !filters && !lastVisible && listings.length > 0) {
          console.log("Using cached data, no Firebase call needed");
          return {
            listings: listings.slice(0, itemsPerPage),
            lastVisible: listings[itemsPerPage - 1] || null,
          };
        }

        // Prevent multiple simultaneous calls
        if (isLoadingRef.current) {
          console.log("Already loading, skipping duplicate call");
          return { listings: [], lastVisible: null };
        }

        console.log("Fetching from Firebase...");
        isLoadingRef.current = true;
        setLoading(true);

        let listingsQuery = collection(db, "vehicleListings");
        let queryConstraints: any[] = [];

        // Default filter - only active listings
        if (!filters?.status) {
          queryConstraints.push(where("status", "==", "active"));
        }

        // Apply filters if provided
        if (filters) {
          if (filters.make && filters.make.length > 0) {
            queryConstraints.push(where("make", "in", filters.make));
          }

          if (filters.vehicleType && filters.vehicleType.length > 0) {
            queryConstraints.push(
              where("vehicleType", "in", filters.vehicleType)
            );
          }

          if (filters.condition && filters.condition.length > 0) {
            queryConstraints.push(where("condition", "in", filters.condition));
          }

          if (filters.userId) {
            queryConstraints.push(where("userId", "==", filters.userId));
          }

          if (filters.status) {
            queryConstraints.push(where("status", "==", filters.status));
          }

          if (filters.featured !== undefined) {
            queryConstraints.push(where("featured", "==", filters.featured));
          }
          // Support secondHand filter explicitly
          if ((filters as any).secondHand !== undefined) {
            queryConstraints.push(
              where("secondHand", "==", (filters as any).secondHand)
            );
          }
        }

        // Add sort order
        let sortField = "createdAt";
        let sortDirection: "asc" | "desc" = "desc";

        if (filters?.sortBy) {
          switch (filters.sortBy) {
            case "price-low":
              sortField = "price";
              sortDirection = "asc";
              break;
            case "price-high":
              sortField = "price";
              sortDirection = "desc";
              break;
            case "year-new":
              sortField = "year";
              sortDirection = "desc";
              break;
            case "year-old":
              sortField = "year";
              sortDirection = "asc";
              break;
            default:
              sortField = "createdAt";
              sortDirection = "desc";
          }
        }

        queryConstraints.push(orderBy(sortField, sortDirection));
        queryConstraints.push(limit(itemsPerPage));

        if (lastVisible) {
          queryConstraints.push(startAfter(lastVisible));
        }

        // Create and execute the query
        const q = query(listingsQuery, ...queryConstraints);
        const querySnapshot = await getDocs(q);

        // Get the last visible document for pagination
        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];

        // Map the documents to listings
        const fetchedListings = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as VehicleListing)
        );

        // Update cache only for unfiltered requests
        if (!filters && !lastVisible) {
          setListings(fetchedListings);
          setLastRefresh(new Date());
        }

        console.log(`Fetched ${fetchedListings.length} listings from Firebase`);

        return {
          listings: fetchedListings,
          lastVisible: lastVisibleDoc || null,
        };
      } catch (error: any) {
        console.error("Error fetching listings:", error);
        setError(error.message);
        throw error;
      } finally {
        isLoadingRef.current = false;
        setLoading(false);
      }
    },
    [listings, lastRefresh, refreshInterval]
  ); // Remove loading from dependencies

  // Get listings created by the current user
  const getMyListings = useCallback(async (): Promise<VehicleListing[]> => {
    if (!user) {
      return [];
    }

    return fetchMyListings();
  }, [user]);

  // Helper to fetch user's listings and update state
  const fetchMyListings = useCallback(async (): Promise<VehicleListing[]> => {
    if (!user) {
      return [];
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, "vehicleListings"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const listings = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as VehicleListing)
      );

      setMyListings(listings);
      return listings;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark a listing as sold
  const markAsSold = useCallback(
    async (listingId: string): Promise<void> => {
      if (!user) {
        throw new Error("You must be logged in to update a listing");
      }

      setLoading(true);
      try {
        const listingRef = doc(db, "vehicleListings", listingId);
        const listingSnap = await getDoc(listingRef);

        if (!listingSnap.exists()) {
          throw new Error("Listing not found");
        }

        const listing = listingSnap.data();

        // Check if user owns this listing
        if (listing.userId !== user.id) {
          throw new Error("You don't have permission to update this listing");
        }

        // Update the status
        await updateDoc(listingRef, {
          status: "sold",
          updatedAt: serverTimestamp(),
        });

        toast({
          title: "Listing marked as sold",
          description: "Congratulations on your sale!",
        });

        // Get the updated list of user's listings
        await fetchMyListings();
      } catch (error: any) {
        toast({
          title: "Error updating listing",
          description:
            error.message || "There was a problem updating your listing",
          variant: "destructive",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [user, fetchMyListings, toast]
  );

  // Toggle favorite status for a listing
  const toggleFavorite = async (listingId: string): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to favorite a listing");
    }

    try {
      const userFavoritesRef = doc(db, "userFavorites", user.id);
      const favoritesSnap = await getDoc(userFavoritesRef);

      if (!favoritesSnap.exists()) {
        // Create a new favorites document for the user
        await setDoc(userFavoritesRef, {
          favorites: [listingId],
          updatedAt: serverTimestamp(),
        });

        setFavorites([listingId]);
      } else {
        // Update existing favorites
        const userData = favoritesSnap.data();
        const currentFavorites = userData.favorites || [];

        let newFavorites;
        if (currentFavorites.includes(listingId)) {
          // Remove from favorites
          newFavorites = currentFavorites.filter(
            (id: string) => id !== listingId
          );
        } else {
          // Add to favorites
          newFavorites = [...currentFavorites, listingId];
        }

        await updateDoc(userFavoritesRef, {
          favorites: newFavorites,
          updatedAt: serverTimestamp(),
        });

        setFavorites(newFavorites);
      }

      // Update the favorites count on the listing
      const listingRef = doc(db, "vehicleListings", listingId);
      const listingSnap = await getDoc(listingRef);

      if (listingSnap.exists()) {
        const listing = listingSnap.data();
        const favoriteCount = favorites.includes(listingId)
          ? (listing.favorites || 0) - 1
          : (listing.favorites || 0) + 1;

        await updateDoc(listingRef, {
          favorites: Math.max(0, favoriteCount),
        });
      }
    } catch (error: any) {
      throw error;
    }
  };

  // Increment view count for a listing
  const incrementViews = async (listingId: string): Promise<void> => {
    try {
      const listingRef = doc(db, "vehicleListings", listingId);
      const listingSnap = await getDoc(listingRef);

      if (listingSnap.exists()) {
        const listing = listingSnap.data();

        await updateDoc(listingRef, {
          views: (listing.views || 0) + 1,
        });
      }
    } catch (error: any) {
      // Fail silently for view counting
      console.error("Error incrementing views:", error);
    }
  };

  // Upload multiple images and return their URLs
  const uploadImages = async (
    files: File[],
    path: string
  ): Promise<string[]> => {
    if (!files || files.length === 0) {
      return [];
    }

    const imageUrls: string[] = [];

    for (const [index, file] of files.entries()) {
      const storageRef = ref(storage, `${path}/${index}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Wait for the upload to complete
      const downloadUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {}, // Progress callback
          (error) => reject(error),
          async () => {
            // Upload completed successfully, get the download URL
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      imageUrls.push(downloadUrl);
    }

    return imageUrls;
  };

  // Delete multiple images by URL
  const deleteImages = async (imageUrls: string[]): Promise<void> => {
    if (!imageUrls || imageUrls.length === 0) {
      return;
    }

    const deletePromises = imageUrls.map((url) => {
      // Extract the storage path from the URL
      // This is an approximation and depends on Firebase Storage URL format
      const decodedUrl = decodeURIComponent(url);
      const startOfPath = decodedUrl.indexOf("/o/") + 3;
      const endOfPath = decodedUrl.indexOf("?");
      const storagePath = decodedUrl.substring(startOfPath, endOfPath);

      // Create a reference to the file
      const fileRef = ref(storage, storagePath);

      // Delete the file
      return deleteObject(fileRef).catch((error) => {
        console.error(`Error deleting image at path ${storagePath}:`, error);
      });
    });

    await Promise.all(deletePromises);
  };

  // Add export functionality
  const exportListings = async (format: "csv" | "json" = "csv") => {
    try {
      const allListings = await getDocs(collection(db, "vehicleListings"));
      const data = allListings.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VehicleListing[];

      if (format === "csv") {
        const headers = [
          "id",
          "title",
          "make",
          "model",
          "year",
          "price",
          "status",
          "createdAt",
        ] as (keyof VehicleListing)[];
        const csvContent = [
          headers.join(","),
          ...data.map((item) =>
            headers
              .map((header) => JSON.stringify(item[header] || ""))
              .join(",")
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `vehicle-listings-${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      } else {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `vehicle-listings-${
          new Date().toISOString().split("T")[0]
        }.json`;
        link.click();
      }
    } catch (error) {
      console.error("Error exporting listings:", error);
      throw error;
    }
  };

  // Auctions - routed through backend API endpoints for authoritative data
  const createAuction = async (auctionData: any): Promise<string> => {
    if (!user) throw new Error("Authentication required");
    setLoading(true);
    try {
      const res = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auctionData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to create auction");
      }

      const json = await res.json();
      toast({
        title: "Auction created",
        description: "Auction has been scheduled.",
      });
      return json.id;
    } catch (error: any) {
      toast({
        title: "Error creating auction",
        description: error.message || "Failed to create auction",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (
    auctionId: string,
    bidAmount: string
  ): Promise<void> => {
    if (!user) throw new Error("Authentication required");
    setLoading(true);
    try {
      const res = await fetch(`/api/auctions/${auctionId}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to place bid");
      }

      toast({
        title: "Bid placed",
        description: "Your bid has been recorded.",
      });
    } catch (error: any) {
      toast({
        title: "Error placing bid",
        description: error.message || "Failed to place bid",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAuction = useCallback(async (auctionId: string) => {
    const res = await fetch(`/api/auctions/${auctionId}`);
    if (!res.ok) throw new Error("Auction not found");
    return res.json();
  }, []);

  const getAuctions = useCallback(async () => {
    const res = await fetch(`/api/auctions`);
    if (!res.ok) throw new Error("Failed to fetch auctions");
    return res.json();
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        createListing,
        updateListing,
        deleteListing,
        getListing,
        getListings,
        getMyListings,
        markAsSold,
        toggleFavorite,
        incrementViews,
        uploadImages,
        deleteImages,
        loading,
        myListings,
        favorites,
        refreshData,
        exportListings,
        lastRefresh,
        // Auctions
        createAuction,
        placeBid,
        getAuction,
        getAuctions,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
