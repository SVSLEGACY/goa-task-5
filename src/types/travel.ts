export interface Activity {
  id?: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  timeSlot?: string; // e.g. "08:30 AM", "11:30 AM", "06:30 PM" as in Image 2
  title: string;
  description: string;
  locationName: string;
  durationHours: number;
  highlightTip?: string;
  category?: 'sightseeing' | 'restaurant' | 'beach' | 'transit' | 'hotel' | 'activity';
}

export interface DayPlan {
  dayNumber: number;
  dateStr?: string; // e.g. "09/04", "10/04"
  title: string;
  city: string;
  region?: string;
  country: string;
  summary: string;
  lat: number;
  lng: number;
  stayRecommendation: string;
  localFoodToTry: string[];
  restaurants?: Array<{
    name: string;
    cuisine: string;
    vibe: string;
    recommendedDish: string;
  }>;
  activities: Activity[];
}

export interface TaxiTransfer {
  id: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  duration: string;
  estimatedFare: string; // e.g. "₹1,800 - ₹2,200 ($22-26)"
  taxiType: 'Pre-paid Airport Taxi' | 'Local Cab Stand' | 'Private Chauffeur' | 'Scooter / Bike Rental' | 'Inter-city Cab';
  pickupAdvice: string;
  famousStopsOnWay?: string[]; // e.g. ["Cabo de Rama Fort", "Agonda Beach viewpoint"]
  recommendedAppOrStand: string; // e.g. "GoaMiles Counter / Airport Pre-Paid Booth"
}

export interface FlightTicket {
  id: string;
  flightNumber: string;
  airline: string;
  fromAirport: string; // e.g. "BOM (Mumbai)"
  toAirport: string; // e.g. "GOI (Goa Dabolim)"
  departureTime: string;
  arrivalTime: string;
  date: string;
  estimatedPrice: string; // e.g. "₹4,500 ($54)"
  seatClass?: string;
  bookingStatus: 'Booked' | 'Looking for flights' | 'Estimated Price';
  terminal?: string;
}

export interface HotelStay {
  id: string;
  hotelName: string;
  cityOrArea: string; // e.g. "Palolem Beach, South Goa"
  nights: number;
  checkInDate?: string;
  checkOutDate?: string;
  pricePerNight: string; // e.g. "₹3,500/night ($42)"
  totalPrice?: string;
  rating?: number;
  vibe: string; // e.g. "Beachfront wooden cottage under coconut palms"
  bookingStatus: 'Booked' | 'Shortlisted' | 'Suggested';
  amenities: string[];
}

export interface InterCityLeg {
  fromCity: string;
  toCity: string;
  fromCoords: { lat: number; lng: number };
  toCoords: { lat: number; lng: number };
  recommendedTransport: 'High-Speed Rail' | 'Train' | 'Car / Drive' | 'Bus' | 'Ferry' | 'Flight' | 'Taxi / Private Cab' | string;
  estimatedDuration: string;
  distanceKm: number;
  distanceMiles: number;
  routeHighlights: string[];
  navigationNotes: string;
  efficiencyReason: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  location: string;
  notes: string;
  suggestedNights?: number;
  category: 'Beach' | 'Cultural' | 'Food & Drinks' | 'Adventure' | 'Scenic Drive';
  dateAdded: string;
}

export interface TripItinerary {
  id: string;
  createdAt: string;
  tripTitle: string;
  dateRange?: string; // e.g. "April 9th 2024 - April 16th 2024"
  summary: string;
  prompt: string;
  totalDays: number;
  cities: string[];
  efficiencyExplanation: string;
  totalDistanceKm: number;
  totalDistanceMiles: number;
  totalEstimatedTransitTime: string;
  bestSeason: string;
  packingEssentials: string[];
  offlineTravelTips: string[];
  interCityLegs: InterCityLeg[];
  days: DayPlan[];
  taxiTransfers?: TaxiTransfer[];
  flights?: FlightTicket[];
  hotels?: HotelStay[];
  isSavedOffline?: boolean;
  heroImageUrl?: string;
  weather?: {
    location: string;
    temp: number;
    feelsLike: number;
    condition: string;
    hourly: Array<{ time: string; temp: number }>;
  };
  budget?: {
    spent: number;
    total: number;
    dailyRecommended: number;
    currency: string;
  };
  checklist?: Array<{
    id: string;
    text: string;
    subtext?: string;
    completed: boolean;
  }>;
  galleryPhotos?: Array<{
    url: string;
    caption: string;
  }>;
}
