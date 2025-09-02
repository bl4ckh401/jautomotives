"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { useAdmin } from "@/contexts/AdminContext";

// Vehicle makes for dropdown
const vehicleMakes = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Dodge",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

// Vehicle types for dropdown
const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van/Minivan",
  "Hatchback",
  "Crossover",
  "Luxury",
  "Motorbike", // Added Motorbike
];

// Vehicle transmission options
const transmissionTypes = ["Automatic", "Manual", "Semi-automatic", "CVT"];

// Fuel types
const fuelTypes = [
  "Gasoline",
  "Diesel",
  "Electric",
  "Hybrid",
  "Plug-in Hybrid",
  "Hydrogen",
];

// Available vehicle features
const featureGroups = {
  exterior: [
    "Sunroof/Moonroof",
    "Panoramic Roof",
    "Alloy Wheels",
    "Roof Rack",
    "Running Boards",
    "Towing Package",
    "LED Headlights",
    "Fog Lights",
  ],
  interior: [
    "Leather Seats",
    "Heated Seats",
    "Ventilated Seats",
    "Memory Seats",
    "Power Seats",
    "Rear Seat Entertainment",
    "Ambient Lighting",
    "Premium Audio",
  ],
  safety: [
    "Airbags",
    "Anti-lock Braking",
    "Stability Control",
    "Blind Spot Monitoring",
    "Lane Departure Warning",
    "Forward Collision Warning",
    "Automatic Emergency Braking",
    "Rear Cross Traffic Alert",
    "360-Degree Camera",
    "Parking Sensors",
  ],
  technology: [
    "Bluetooth",
    "Apple CarPlay",
    "Android Auto",
    "Navigation System",
    "WiFi Hotspot",
    "Wireless Charging",
    "Digital Instrument Cluster",
    "Heads-Up Display",
    "Remote Start",
    "Keyless Entry",
  ],
  driverAssistance: [
    "Adaptive Cruise Control",
    "Lane Keeping Assist",
    "Self-Parking",
    "Traffic Sign Recognition",
    "Driver Attention Monitoring",
    "Night Vision",
  ],
  performance: [
    "Sport Package",
    "Performance Tires",
    "Sport Suspension",
    "Sport Exhaust",
    "Limited Slip Differential",
    "Launch Control",
    "Multiple Driving Modes",
  ],
};

export default function AdvancedSellForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const {
    createListing,
    getListing,
    updateListing,
    loading: isSubmitting,
  } = useMarketplace();
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    price: "",
    vehicleType: "Sedan",

    // Details
    mileage: "",
    vin: "",
    exteriorColor: "",
    interiorColor: "",
    transmission: "Automatic",
    engineSize: "",
    fuelType: "Gasoline",
    doors: "4",

    // Condition and history
    condition: "Foreign Used",
    ownerHistory: "1",
    accidentHistory: "No",
    serviceHistory: "",

    // Description
    title: "",
    description: "",
    sellingReason: "",

    // Features (will be populated with checked features)
    features: {} as Record<string, boolean>,

    // Images
    images: [] as File[],

    // Contact details (optional, can use user profile info)
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    location: "",

    // Listing options
    listingDuration: "30",
    featured: false,
    negotiable: true,
    // Second-hand flag (admin controls marking)
    secondHand: false,
    // Direct import flag (admin only)
    directImport: false,

    // Timestamps and IDs will be added on submission
  });

  // Check for edit mode when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId =
      urlParams.get("edit") || sessionStorage.getItem("editListingId");

    if (editId) {
      setIsEditMode(true);
      setEditingListingId(editId);
      loadExistingListing(editId);
      // Clear from sessionStorage after loading
      sessionStorage.removeItem("editListingId");
    }
  }, []);

  // Load existing listing data for editing
  const loadExistingListing = async (listingId: string) => {
    setIsLoading(true);
    try {
      const listing = await getListing(listingId);

      // Pre-fill the form with existing data
      setFormData({
        make: listing.make || "",
        model: listing.model || "",
        year: listing.year?.toString() || "",
        price: listing.price?.toString() || "",
        vehicleType: listing.vehicleType || "Sedan",
        mileage: listing.mileage?.toString() || "",
        vin: listing.vin || "",
        exteriorColor: listing.exteriorColor || "",
        interiorColor: listing.interiorColor || "",
        transmission: listing.transmission || "Automatic",
        engineSize: listing.engineSize || "",
        fuelType: listing.fuelType || "Gasoline",
        doors: listing.doors?.toString() || "4",
        condition: listing.condition || "Foreign Used",
        ownerHistory: listing.ownerHistory || "1",
        accidentHistory: listing.accidentHistory || "No",
        serviceHistory: listing.serviceHistory || "",
        title: listing.title || "",
        description: listing.description || "",
        sellingReason: listing.sellingReason || "",
        features: listing.features || {},
        images: [], // Can't pre-fill File objects, user needs to re-upload
        contactName: listing.contactName || "",
        contactEmail: listing.contactEmail || "",
        contactPhone: listing.contactPhone || "",
        location: listing.location || "",
        listingDuration: listing.listingDuration || "30",
        featured: listing.featured || false,
        negotiable:
          listing.negotiable !== undefined ? listing.negotiable : true,
        secondHand: listing.secondHand || false,
        directImport: listing.directImport || false,
      });

      // Store existing images separately
      setExistingImages(listing.images || []);

      toast({
        title: "Listing loaded",
        description: "You can now edit the vehicle listing.",
      });
    } catch (error: any) {
      console.error("Error loading listing:", error);
      toast({
        title: "Error loading listing",
        description: error.message || "Failed to load the listing for editing.",
        variant: "destructive",
      });
      // Redirect back to admin on error
      router.push("/admin/listings");
    } finally {
      setIsLoading(false);
    }
  };

  // Populate user data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        contactName: user.name || prev.contactName,
        contactEmail: user.email || prev.contactEmail,
      }));
    }
  }, [user]);

  // Initialize features as all unchecked
  useEffect(() => {
    const initialFeatures = {} as Record<string, boolean>;

    Object.values(featureGroups).forEach((group) => {
      group.forEach((feature) => {
        initialFeatures[feature] = false;
      });
    });

    setFormData((prev) => ({
      ...prev,
      features: initialFeatures,
    }));
  }, []);

  // Handle text inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select inputs
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "vehicleType" && value === "Motorbike"
        ? { doors: "0" }
        : {}), // force 0 doors for motorbikes
    }));
  };

  // Handle checkbox changes for features
  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }));
  };

  // Handle checkbox for other boolean options
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle file uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray].slice(0, 10), // Limit to 10 images
      }));
    }
  };

  // Remove an image from the selection
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a vehicle",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const listingData = {
        // Basic info
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        vehicleType: formData.vehicleType,
        title: formData.title,
        description: formData.description,

        // Details
        mileage: formData.mileage,
        vin: formData.vin,
        exteriorColor: formData.exteriorColor,
        interiorColor: formData.interiorColor,
        transmission: formData.transmission,
        engineSize: formData.engineSize,
        fuelType: formData.fuelType,
        doors: formData.doors,

        // Condition and history
        condition: formData.condition as any,
        ownerHistory: formData.ownerHistory,
        accidentHistory: formData.accidentHistory,
        serviceHistory: formData.serviceHistory,
        sellingReason: formData.sellingReason,

        // Features
        features: formData.features,

        // Contact details
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        location: formData.location,

        // Listing options
        listingDuration: formData.listingDuration,
        featured: formData.featured,
        negotiable: formData.negotiable,
        // Second hand marker
        secondHand: formData.secondHand || false,

        // Required properties to satisfy the type
        images: [] as string[],
        userId: user?.id || "",
        userEmail: user?.email || "",
        // Direct import marker
        directImport: formData.directImport || false,
        listingType: "sale" as const,
        dealer: { name: formData.contactName || "Dealer", verified: true }, // added dealer info
      };

      // Use the marketplace context to create or update the listing
      if (isEditMode && editingListingId) {
        // Update existing listing
        await updateListing(editingListingId, listingData, formData.images);

        toast({
          title: "Listing updated successfully",
          description: "Your vehicle listing has been updated.",
        });

        // Redirect back to admin listings page
        router.push("/admin/listings");
      } else {
        // Create new listing
        const listingId = await createListing(listingData, formData.images);

        toast({
          title: "Listing created successfully",
          description: "Your vehicle has been listed on the marketplace.",
        });

        // Redirect to the appropriate listing page
        if (formData.secondHand) {
          router.push(`/second-hand/${listingId}`);
        } else {
          router.push(`/marketplace/${listingId}`);
        }
      }
    } catch (error: any) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} listing:`,
        error
      );
      toast({
        title: `Error ${isEditMode ? "updating" : "creating"} listing`,
        description: `There was a problem ${
          isEditMode ? "updating" : "creating"
        } your listing. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("features");
    else if (activeTab === "features") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("contact");
  };

  const prevTab = () => {
    if (activeTab === "contact") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("features");
    else if (activeTab === "features") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("basic");
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="basic" disabled={isLoading}>
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="details" disabled={isLoading}>
            Vehicle Details
          </TabsTrigger>
          <TabsTrigger value="features" disabled={isLoading}>
            Features
          </TabsTrigger>
          <TabsTrigger value="images" disabled={isLoading}>
            Images
          </TabsTrigger>
          <TabsTrigger value="contact" disabled={isLoading}>
            Contact & Options
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="make">Make*</Label>
                <Select
                  value={formData.make}
                  onValueChange={(value) => handleSelectChange("make", value)}
                  required
                >
                  <SelectTrigger id="make">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleMakes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Model*</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="year">Year*</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price (USD)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="vehicleType">Vehicle Type*</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) =>
                    handleSelectChange("vehicleType", value)
                  }
                  required
                >
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Listing Title*</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. 2021 BMW X5 xDrive - Excellent Condition"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your vehicle in detail, including its condition, special features, and any other information a buyer would want to know."
                className="min-h-32"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={nextTab}>
                Next: Vehicle Details
              </Button>
            </div>
          </TabsContent>

          {/* Vehicle Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="mileage">Mileage*</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  min="0"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
                <Input
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="exteriorColor">Exterior Color*</Label>
                <Input
                  id="exteriorColor"
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="interiorColor">Interior Color*</Label>
                <Input
                  id="interiorColor"
                  name="interiorColor"
                  value={formData.interiorColor}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="transmission">Transmission*</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) =>
                    handleSelectChange("transmission", value)
                  }
                  required
                >
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fuelType">Fuel Type*</Label>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) =>
                    handleSelectChange("fuelType", value)
                  }
                  required
                >
                  <SelectTrigger id="fuelType">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engineSize">Engine Size/Power</Label>
                <Input
                  id="engineSize"
                  name="engineSize"
                  placeholder="e.g. 2.0L Turbo, 300hp"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="doors">Number of Doors*</Label>
                <Select
                  value={formData.doors}
                  onValueChange={(value) => handleSelectChange("doors", value)}
                  required
                >
                  <SelectTrigger id="doors">
                    <SelectValue placeholder="Select number of doors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (Motorbike)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                {formData.vehicleType === "Motorbike" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Doors set to 0 for motorbike.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vehicle History</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="condition">Condition*</Label>
                  <RadioGroup
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleSelectChange("condition", value)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="New" id="condition-new" />
                      <Label htmlFor="condition-new">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Foreign Used"
                        id="condition-foreign-used"
                      />
                      <Label htmlFor="condition-foreign-used">
                        Foreign Used
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Certified Pre-Owned"
                        id="condition-cpo"
                      />
                      <Label htmlFor="condition-cpo">Certified Pre-Owned</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="ownerHistory">Previous Owners*</Label>
                  <RadioGroup
                    value={formData.ownerHistory}
                    onValueChange={(value) =>
                      handleSelectChange("ownerHistory", value)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="owner-0" />
                      <Label htmlFor="owner-0">0 (New)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="owner-1" />
                      <Label htmlFor="owner-1">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="owner-2" />
                      <Label htmlFor="owner-2">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="owner-3plus" />
                      <Label htmlFor="owner-3plus">3+</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="accidentHistory">Accident History*</Label>
                  <RadioGroup
                    value={formData.accidentHistory}
                    onValueChange={(value) =>
                      handleSelectChange("accidentHistory", value)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="accident-no" />
                      <Label htmlFor="accident-no">No Accidents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Minor" id="accident-minor" />
                      <Label htmlFor="accident-minor">Minor Accidents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Major" id="accident-major" />
                      <Label htmlFor="accident-major">Major Accidents</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label htmlFor="serviceHistory">Service History</Label>
                <Textarea
                  id="serviceHistory"
                  name="serviceHistory"
                  value={formData.serviceHistory}
                  onChange={handleInputChange}
                  placeholder="Describe the vehicle's service history. Include details about regular maintenance, major repairs, etc."
                  className="min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="sellingReason">Reason for Selling</Label>
                <Textarea
                  id="sellingReason"
                  name="sellingReason"
                  value={formData.sellingReason}
                  onChange={handleInputChange}
                  placeholder="Why are you selling this vehicle?"
                  className="min-h-20"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevTab}>
                Back: Basic Info
              </Button>
              <Button type="button" onClick={nextTab}>
                Next: Features
              </Button>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Vehicle Features</h3>
              <p className="text-muted-foreground">
                Select all features that apply to your vehicle
              </p>

              {/* Features section with collapsible cards */}
              <div className="space-y-4">
                {Object.entries(featureGroups).map(([groupName, features]) => (
                  <Card key={groupName}>
                    <CardContent className="pt-6">
                      <h4 className="text-base font-medium capitalize mb-4">
                        {groupName} Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`feature-${feature
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                              checked={formData.features[feature] || false}
                              onCheckedChange={(checked) =>
                                handleFeatureChange(feature, checked === true)
                              }
                            />
                            <Label
                              htmlFor={`feature-${feature
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                            >
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional features not in the list */}
              <div>
                <Label htmlFor="additionalFeatures">Additional Features</Label>
                <Textarea
                  id="additionalFeatures"
                  name="additionalFeatures"
                  placeholder="List any additional features not mentioned above"
                  className="min-h-20"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevTab}>
                Back: Vehicle Details
              </Button>
              <Button type="button" onClick={nextTab}>
                Next: Images
              </Button>
            </div>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vehicle Images</h3>
              <p className="text-muted-foreground">
                Upload high-quality images of your vehicle (up to 10 images).
                Include exterior, interior, engine, and any notable features or
                damage.
              </p>

              {/* Show existing images in edit mode */}
              {isEditMode && existingImages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-base font-medium mb-3">
                    Current Images ({existingImages.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {existingImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Current vehicle image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Current
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: To change existing images, upload new ones below.
                    Current images will be kept unless you delete the listing
                    and recreate it.
                  </p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 rounded-lg text-center">
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <span className="text-primary font-medium">
                    {isEditMode ? "Add New Images" : "Click to browse files"}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {isEditMode
                      ? "Upload additional images"
                      : "or drag and drop images here"}
                  </span>
                </Label>
              </div>

              {/* New images preview */}
              {formData.images.length > 0 && (
                <div>
                  <h4 className="text-base font-medium mb-3">
                    {isEditMode ? "New Images to Add" : "Selected Images"} (
                    {formData.images.length}/10)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Vehicle preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/70 text-primary p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                            {isEditMode ? "New Main" : "Main Image"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.images.length === 0 && !isEditMode && (
                <p className="text-sm text-muted-foreground italic">
                  No images selected yet. Listings with images get 10x more
                  views!
                </p>
              )}

              {formData.images.length === 0 && isEditMode && (
                <p className="text-sm text-muted-foreground italic">
                  No new images selected. Current images will be maintained.
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevTab}>
                Back: Features
              </Button>
              <Button type="button" onClick={nextTab}>
                Next: Contact & Options
              </Button>
            </div>
          </TabsContent>

          {/* Contact & Options Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="text-muted-foreground">
                How potential buyers should contact you about this vehicle
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactName">Contact Name*</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email*</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Vehicle Location*</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State/Province"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Listing Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="listingDuration">
                    Listing Duration (days)*
                  </Label>
                  <Select
                    value={formData.listingDuration}
                    onValueChange={(value) =>
                      handleSelectChange("listingDuration", value)
                    }
                    required
                  >
                    <SelectTrigger id="listingDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("featured", checked === true)
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor="featured">Featured Listing</Label>
                      <p className="text-sm text-muted-foreground">
                        Featured listings appear at the top of search results
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={formData.negotiable}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("negotiable", checked === true)
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor="negotiable">Price is Negotiable</Label>
                      <p className="text-sm text-muted-foreground">
                        Indicate if you're open to offers on the asking price
                      </p>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Checkbox
                      id="secondHand"
                      checked={formData.secondHand}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("secondHand", checked === true)
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor="secondHand">Mark as Second Hand</Label>
                      <p className="text-sm text-muted-foreground">
                        Admin-only: mark this listing as a second hand vehicle
                        to appear in the Second Hand section.
                      </p>
                    </div>
                  </div>
                )}
                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="directImport"
                      checked={formData.directImport}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("directImport", checked === true)
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor="directImport">Direct Import</Label>
                      <p className="text-sm text-muted-foreground">
                        Admin-only: mark this vehicle as a direct import
                        (overseas import to be cleared and shipped).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevTab}>
                Back: Images
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-32">
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Submitting..."
                  : isEditMode
                  ? "Update Vehicle"
                  : "List Vehicle"}
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
