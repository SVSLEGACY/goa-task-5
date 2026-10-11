import { TripItinerary } from '../types/travel';

export const CURATED_TRIPS: TripItinerary[] = [
  // 1. PRIMARY FEATURED TRIP: GOA 2 NIGHTS PALOLEM & 2 NIGHTS MANDREM (Strictly matches user request)
  {
    id: 'goa_coastal_escape',
    createdAt: new Date().toISOString(),
    tripTitle: 'Goa Coastal Escape: 2 Nights Palolem & 2 Nights Mandrem',
    dateRange: 'Nov 12th - Nov 16th',
    summary: 'An idyllic 4-day coastal retreat balancing South Goa’s serene crescent bays with North Goa’s bohemian wellness, quiet river inlets, and fresh seafood.',
    prompt: 'I want to visit Goa, in Palolem, Mandrem, etc. 2 nights each with taxis required, restaurants, hotels and flights',
    totalDays: 4,
    cities: ['Palolem Beach', 'Mandrem Beach'],
    efficiencyExplanation: 'Groups travel strictly by region: Days 1-2 in southern Palolem Beach, Day 3 scenic taxi transition via Cabo de Rama Fort cliff, and Days 4-5 in northern Mandrem Beach. Zero backtracking between South and North Goa.',
    totalDistanceKm: 180,
    totalDistanceMiles: 112,
    totalEstimatedTransitTime: '3h 35m total road journey',
    bestSeason: 'November to March (Pleasant 28°C breeze, calm Arabian Sea)',
    packingEssentials: [
      'Light breathable linen shirts & swimsuits',
      'Slip-on beach sandals & water shoes for rocky coves',
      'Reef-safe sunscreen & natural mosquito balm',
      'Small waterproof dry bag for kayak excursions'
    ],
    offlineTravelTips: [
      'Cell reception drops along the winding NH66 ghat roads between Agonda and Betul; keep offline GPS downloaded',
      'Book airport taxis via official pre-paid counters inside Dabolim or MOPA terminals to avoid street negotiation',
      'Scooter rentals in Goa require carrying a physical driving license and wearing a helmet on highways',
      'Beach shack Wi-Fi can be intermittent during high tide; save your booking confirmations offline'
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    weather: {
      location: 'Goa',
      temp: 31,
      feelsLike: 33,
      condition: 'Sunny & Breezy',
      hourly: [
        { time: '12:00', temp: 31 },
        { time: '13:00', temp: 32 },
        { time: '14:00', temp: 32 },
        { time: '15:00', temp: 30 }
      ]
    },
    budget: {
      spent: 240,
      total: 950,
      dailyRecommended: 175,
      currency: '$'
    },
    checklist: [
      { id: 'chk_goa_1', text: 'Pre-book Airport Taxi', subtext: 'Dabolim to Palolem booth', completed: true },
      { id: 'chk_goa_2', text: 'Rent Activa Scooter', subtext: 'Canacona local stand', completed: true },
      { id: 'chk_goa_3', text: 'Sunset Kayak booking', subtext: 'Butterfly Beach cove', completed: false },
      { id: 'chk_goa_4', text: 'Pack Reef-Safe Sunscreen', subtext: 'Eco-friendly lotion', completed: true }
    ],
    galleryPhotos: [
      { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', caption: 'Palolem Beach Crescent Bay' },
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80', caption: 'Mandrem Beach Bamboo Bridge' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', caption: 'Arabian Sea Sunset Cocktails' }
    ],
    taxiTransfers: [
      {
        id: 'taxi_goa_1',
        fromLocation: 'Goa Airport (Dabolim/GOI)',
        toLocation: 'Palolem Beach, South Goa',
        distanceKm: 60,
        duration: '1h 20m',
        estimatedFare: '₹1,800 - ₹2,100 ($22 - $25)',
        taxiType: 'Pre-paid Airport Taxi',
        pickupAdvice: 'Book directly at the Government Pre-Paid Taxi Booth right outside Arrivals Hall Gate 2. Avoid unofficial street operators outside the gate.',
        famousStopsOnWay: ['Majorda highway bakery', 'Margao historic church square'],
        recommendedAppOrStand: 'Goa State Pre-Paid Taxi Counter (Fixed Tariff)'
      },
      {
        id: 'taxi_goa_2',
        fromLocation: 'Palolem Beach (South Goa)',
        toLocation: 'Mandrem Beach (North Goa)',
        distanceKm: 92,
        duration: '2h 15m (Scenic drive)',
        estimatedFare: '₹2,600 - ₹3,000 ($31 - $36)',
        taxiType: 'Inter-city Cab',
        pickupAdvice: 'Book 1 day in advance via your hotel or the Palolem Main Beach Taxi Stand. Request the driver to stop at Cabo de Rama cliff for 45 minutes.',
        famousStopsOnWay: ['Cabo de Rama Medieval Fort Cliff', 'Betul River Estuary', 'Panaji Old Latin Quarter (Fontainhas)'],
        recommendedAppOrStand: 'Palolem Beach Taxi Union Stand or GoaMiles App'
      },
      {
        id: 'taxi_goa_3',
        fromLocation: 'Mandrem Beach (North Goa)',
        toLocation: 'MOPA International Airport (GOX)',
        distanceKm: 28,
        duration: '40m',
        estimatedFare: '₹1,200 - ₹1,500 ($14 - $18)',
        taxiType: 'Local Cab Stand',
        pickupAdvice: 'Mandrem is very close to the new Manohar International Airport (MOPA). Taxis can be hailed directly from Mandrem junction.',
        famousStopsOnWay: ['Pernem scenic green backwaters'],
        recommendedAppOrStand: 'Mandrem Junction Cab Booth'
      },
      {
        id: 'taxi_goa_local',
        fromLocation: 'Local Palolem & Mandrem Exploration',
        toLocation: 'Nearby beaches (Butterfly Beach, Agonda, Ashvem, Arambol)',
        distanceKm: 15,
        duration: 'Flexible',
        estimatedFare: '₹400 - ₹500/day ($5-6) for Honda Activa Scooter',
        taxiType: 'Scooter / Bike Rental',
        pickupAdvice: 'Rent a scooter from your cottage host; provides freedom to explore quiet beach coves.',
        famousStopsOnWay: ['Butterfly Beach view', 'Arambol Sweet Water Lake'],
        recommendedAppOrStand: 'Palolem & Mandrem Beach Bike Rentals'
      }
    ],
    flights: [
      {
        id: 'fl_goa_1',
        flightNumber: '6E 5218',
        airline: 'IndiGo Airlines',
        fromAirport: 'BOM (Mumbai Chhatrapati Shivaji)',
        toAirport: 'GOI (Goa Dabolim Airport)',
        departureTime: '06:45 AM',
        arrivalTime: '08:00 AM',
        date: 'Nov 12th',
        estimatedPrice: '₹3,400 ($41)',
        bookingStatus: 'Confirmed',
        terminal: 'Terminal 2'
      },
      {
        id: 'fl_goa_2',
        flightNumber: 'AI 842',
        airline: 'Air India',
        fromAirport: 'GOX (North Goa MOPA)',
        toAirport: 'BOM (Mumbai Chhatrapati Shivaji)',
        departureTime: '07:30 PM',
        arrivalTime: '08:45 PM',
        date: 'Nov 16th',
        estimatedPrice: '₹3,800 ($46)',
        bookingStatus: 'Estimated Price',
        terminal: 'Terminal 1'
      }
    ],
    hotels: [
      {
        id: 'hotel_palolem_1',
        hotelName: 'Ciaran’s Beachfront Wooden Cottages',
        cityOrArea: 'Palolem Beach, South Goa (2 Nights)',
        nights: 2,
        pricePerNight: '₹4,200/night ($50)',
        totalPrice: '₹8,400 ($100)',
        rating: 4.7,
        vibe: 'Eco-luxury wooden beach huts nestled under coconut canopy directly on the white sand.',
        bookingStatus: 'Booked',
        amenities: ['Direct Beach Access', 'Oceanfront Dining', 'Ayurvedic Spa', 'Free Breakfast', 'Kayak Rental']
      },
      {
        id: 'hotel_mandrem_1',
        hotelName: 'Dune Eco Village & Beach Cabanas',
        cityOrArea: 'Mandrem Beach, North Goa (2 Nights)',
        nights: 2,
        pricePerNight: '₹5,500/night ($66)',
        totalPrice: '₹11,000 ($132)',
        rating: 4.8,
        vibe: 'Peaceful bohemian hideaway set across a wooden footbridge over Mandrem river inlet.',
        bookingStatus: 'Booked',
        amenities: ['Private Beach Shaded Beds', 'Yoga Shala', 'Organic Kitchen', 'Sunset Bar', 'Swimming Pool']
      }
    ],
    interCityLegs: [
      {
        fromCity: 'Palolem Beach',
        toCity: 'Mandrem Beach',
        fromCoords: { lat: 15.0100, lng: 74.0232 },
        toCoords: { lat: 15.6706, lng: 73.7145 },
        recommendedTransport: 'Taxi / Private Cab',
        estimatedDuration: '2h 15m',
        distanceKm: 92,
        distanceMiles: 57,
        routeHighlights: ['Cabo de Rama Cliffside Fort', 'Betul fishing village', 'Zuari river bridge', 'Mandrem river estuary'],
        navigationNotes: 'Take South Goa coastal bypass to NH66 northwards through Panaji bypass to Mandrem via Pernem road.',
        efficiencyReason: 'Connects the southern tip to the far northern tip directly with lunch stops, grouping the 2 nights in each zone.'
      }
    ],
    days: [
      {
        dayNumber: 1,
        dateStr: '12/11',
        title: 'Arrival & Palolem Crescent Bay Sunset (Night 1)',
        city: 'Palolem Beach',
        region: 'South Goa',
        country: 'India',
        lat: 15.0100,
        lng: 74.0232,
        summary: 'Land at Dabolim, take pre-paid cab south to Palolem, check into beachfront cottage, and enjoy Night 1 candlelit seafood dinner on the sand.',
        stayRecommendation: 'Palolem Beach beachfront wooden huts',
        localFoodToTry: ['Goan Prawn Curry with Goan Rice', 'Butter Garlic Calamari', 'Bebinca Coconut Dessert'],
        restaurants: [
          {
            name: 'Dropadi Beach Restaurant',
            cuisine: 'Fresh Coastal Seafood & Goan Curry',
            vibe: 'Candlelit tables directly on the sand with waves lapping near your feet',
            recommendedDish: 'King Prawns in Green Coriander Masala'
          },
          {
            name: 'Cafe Del Mar',
            cuisine: 'Continental & Cocktails',
            vibe: 'Relaxed beanbags, chill ambient grooves, sunset cocktails',
            recommendedDish: 'Wood-fired thin crust pizza & Feni cocktail'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:30 AM',
            title: 'Land at Dabolim Airport & Pre-Paid Taxi to Palolem',
            description: 'Pick up baggage and hop into official prepaid cab for scenic 60km drive through lush South Goan paddy fields.',
            locationName: 'Dabolim Airport to Palolem Beach',
            durationHours: 1.5,
            highlightTip: 'Ask the driver to stop at a local coconut vendor near Canacona for fresh tender coconut water.',
            category: 'transit'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '12:30 PM',
            title: 'Check-in to Beach Cottage & Relax in Calm Lagoon',
            description: 'Settle into your wooden beach hut. Swim in Palolem gentle, wave-free crescent bay.',
            locationName: 'Ciaran Beach Cottages, Palolem',
            durationHours: 3.5,
            highlightTip: 'Palolem bay has naturally calm, shallow water protected by surrounding headlands, ideal for safe swimming.',
            category: 'beach'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '05:45 PM',
            title: 'Sunset Cocktails & Night 1 Candlelit Dinner on Sand',
            description: 'Watch the sun sink into the Arabian Sea. Dine under bamboo lanterns at Dropadi Restaurant.',
            locationName: 'Dropadi Beach Shack, Palolem',
            durationHours: 3.5,
            highlightTip: 'Select fresh catch of the day (Red Snapper or Pomfret) from the ice display; they grill it with rava or masala.',
            category: 'restaurant'
          }
        ]
      },
      {
        dayNumber: 2,
        dateStr: '13/11',
        title: 'Butterfly Beach Kayak & Silent Noise Beach Club (Night 2)',
        city: 'Palolem Beach',
        region: 'South Goa',
        country: 'India',
        lat: 15.0100,
        lng: 74.0232,
        summary: 'Morning kayak to secluded Butterfly Beach cove, afternoon wellness massage, and Night 2 at legendary Neptune Point headphone party.',
        stayRecommendation: 'Palolem Beach beachfront wooden huts',
        localFoodToTry: ['Goan Fish Thali with Rava Fry Fish', 'Pork/Chicken Vindaloo with Poi bread', 'Cashew Feni drink'],
        restaurants: [
          {
            name: 'The Olive Room / Magic Park',
            cuisine: 'Organic Vegan & Healthy Smoothies',
            vibe: 'Zen garden under banyan trees with hammocks',
            recommendedDish: 'Avocado toast & tropical smoothie bowls'
          },
          {
            name: 'Fisherman’s Local Kitchen Canacona',
            cuisine: 'Authentic Goan Saraswat Thali',
            vibe: 'Rustic village eatery loved by locals',
            recommendedDish: 'Traditional Surmai (Kingfish) Fish Thali'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:00 AM',
            title: 'Ocean Kayak to Secret Butterfly Beach',
            description: 'Rent a double kayak from Palolem north end and paddle 25 minutes past cliffs into secret Butterfly Beach.',
            locationName: 'Butterfly Beach Cove',
            durationHours: 3,
            highlightTip: 'Go early around 8:00 AM when the sea is glass-flat; you often spot playful pods of Indo-Pacific dolphins!',
            category: 'activity'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '02:00 PM',
            title: 'Ayurvedic Abhyanga Oil Massage & Agonda Scooter Ride',
            description: 'Recharge with an authentic Kerala herbal oil massage, then cruise scooters along the scenic Agonda cliff road.',
            locationName: 'Palolem Ayurvedic Spa & Agonda Road',
            durationHours: 3,
            highlightTip: 'Agonda Beach road has zero traffic and offers gorgeous viewpoints over pristine turtle nesting beaches.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '07:30 PM',
            title: 'Night 2: Sunset Shacks & Silent Noise Party Neptune Point',
            description: 'Enjoy chilled acoustic music at sundown, followed by the world-famous Silent Noise headphone party on Neptune cliff.',
            locationName: 'Neptune Point, South Palolem',
            durationHours: 4,
            highlightTip: 'Wireless multi-channel headphones let you dance under swaying coconut palms without outdoor sound restrictions.',
            category: 'activity'
          }
        ]
      },
      {
        dayNumber: 3,
        dateStr: '14/11',
        title: 'Scenic Taxi Drive via Cabo de Rama Fort to Mandrem (Night 1)',
        city: 'Mandrem Beach',
        region: 'North Goa',
        country: 'India',
        lat: 15.6706,
        lng: 73.7145,
        summary: 'Depart Palolem via private cab northward, explore the cliffside Portuguese Cabo de Rama fort, and check into Mandrem bohemian riverside resort.',
        stayRecommendation: 'Dune Eco Village & Mandrem River cabanas',
        localFoodToTry: ['Goan Crab Xacuti', 'Poi bread with Chorizo sausage', 'Fresh King Coconut'],
        restaurants: [
          {
            name: 'The Cape Goa Restaurant',
            cuisine: 'Cliffside Continental & Cocktails',
            vibe: 'Perched high on Cabo de Rama cliff with dramatic 180° ocean view',
            recommendedDish: 'Wood-fired calamari & iced sea-salt caramel latte'
          },
          {
            name: 'Verandah at Mandrem',
            cuisine: 'Modern Coastal & French Fusion',
            vibe: 'Romantic bamboo veranda illuminated by fairy lights',
            recommendedDish: 'Grilled snapper with passionfruit glaze'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '09:30 AM',
            title: 'Private Taxi Transition & Cabo de Rama Fortress Walk',
            description: 'Board your private cab from Palolem. Stop 45 minutes at Cabo de Rama, walking the ancient Portuguese sea battlements.',
            locationName: 'Cabo de Rama Fort, Betul',
            durationHours: 2.5,
            highlightTip: 'Walk to the white cliffside chapel at the fort tip for Goa’s most dramatic panoramic photo opportunity.',
            category: 'transit'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '01:30 PM',
            title: 'Arrive Mandrem & Cross Wooden Footbridge over Creek',
            description: 'Check into your quiet eco-lodge. Walk across the famous rustic bamboo bridge spanning Mandrem river to reach the secluded beach.',
            locationName: 'Mandrem Beach Wooden Bridge',
            durationHours: 3,
            highlightTip: 'Mandrem beach has shallow sandbars and zero motorized water scooters, making it tranquil and clean.',
            category: 'hotel'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:00 PM',
            title: 'Night 1 in Mandrem: Sunset Fire Shows & Boho Dining',
            description: 'Recline on soft beach floor cushions. Watch fire dancers on the wide sands, followed by candlelit dining at Verandah.',
            locationName: 'Verandah & Beachfront Shacks, Mandrem',
            durationHours: 3.5,
            highlightTip: 'Order the fresh crab xacuti prepared in roasted grated coconut and Kashmiri chili gravy.',
            category: 'restaurant'
          }
        ]
      },
      {
        dayNumber: 4,
        dateStr: '15/11',
        title: 'Morning Yoga, Arambol Sweet Water Lake & Beach Barbecue (Night 2)',
        city: 'Mandrem Beach',
        region: 'North Goa',
        country: 'India',
        lat: 15.6706,
        lng: 73.7145,
        summary: 'Sunrise open-air yoga, daytime trip to the freshwater Sweet Water Lake in Arambol, and Night 2 live jazz & beach barbecue under the stars.',
        stayRecommendation: 'Dune Eco Village & Mandrem River cabanas',
        localFoodToTry: ['Goan Bebinca 7-layer pudding', 'Sannas steamed rice cakes', 'Fresh Mango Chia Bowl'],
        restaurants: [
          {
            name: 'Prana Cafe Mandrem',
            cuisine: 'Health Bowl & Specialty Coffee',
            vibe: 'Laid-back surf cafe with lush lawn and hammocks',
            recommendedDish: 'Sourdough tartine with poached eggs & cold drip coffee'
          },
          {
            name: 'Lazy Dog Beach Club',
            cuisine: 'Tandoori Seafood & Global Tapas',
            vibe: 'Chic lounge overlooking Mandrem river inlet with swimming pool',
            recommendedDish: 'Tandoori Jumbo Tiger Prawns with mint chutney'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:00 AM',
            title: 'Seaside Morning Vinyasa Yoga Session',
            description: 'Greet the sunrise with a peaceful 75-minute yoga session in the open-air thatched shala facing the sea.',
            locationName: 'Mandrem Beach Yoga Shala',
            durationHours: 1.5,
            highlightTip: 'Drop-in mats are provided free by the yoga teachers; ideal for all skill levels.',
            category: 'activity'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '11:30 AM',
            title: 'Walk to Arambol Sweet Water Lake & Jungle Banyan Tree',
            description: 'Stroll 20 minutes north past Ashvem headland to swim in the fresh water lake sheltered inside the jungle valley.',
            locationName: 'Sweet Water Lake, Arambol',
            durationHours: 3.5,
            highlightTip: 'Take a swim in the fresh rainwater lake right behind the beach—a refreshing alternative to saltwater.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Night 2 in Mandrem: Sunset Drum Circle & Farewell Seafood BBQ',
            description: 'Experience the famous Arambol/Mandrem sunset drum circle, followed by poolside cocktails and barbecue at The Lazy Dog.',
            locationName: 'The Lazy Dog Lounge, Mandrem Creek',
            durationHours: 4,
            highlightTip: 'Book a creekside cabana table at Lazy Dog in advance; their house DJ plays atmospheric deep house until midnight.',
            category: 'restaurant'
          }
        ]
      }
    ]
  },

  // 2. LONDON DISCOVERY
  {
    id: 'london_discovery',
    createdAt: new Date().toISOString(),
    tripTitle: 'London Highlights & Thames River Discovery',
    dateRange: 'Jan 20 - Jan 25',
    summary: 'A 5-day London itinerary visiting iconic landmarks, West End theater, Thames riverside walks, historic pubs, and royal parks.',
    prompt: '5 days in London with flight from LGA to LCY, Tower Bridge, photo spots, and walking routes',
    totalDays: 5,
    cities: ['London'],
    efficiencyExplanation: 'Clustered by geographical zones: City of London & Southwark on Day 1, Westminster & Royal Parks on Day 2, Soho & West End on Day 3, and Kensington museums on Day 4 to minimize tube travel.',
    totalDistanceKm: 42,
    totalDistanceMiles: 26,
    totalEstimatedTransitTime: '1h 45m total underground & walking time',
    bestSeason: 'May to September (Pleasant weather, outdoor festivals)',
    packingEssentials: [
      'Sturdy water-resistant walking shoes',
      'Compact umbrella or packable trench coat',
      'Contactless payment card for seamless Tube tapping',
      'UK 3-pin Type G plug adapter'
    ],
    offlineTravelTips: [
      'Download the TfL Go offline tube map onto your device',
      'Offline walking maps work well across Covent Garden and Soho alleys where GPS can reflect off tall buildings'
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    weather: {
      location: 'London',
      temp: 18,
      feelsLike: 16,
      condition: 'Partly Cloudy',
      hourly: [
        { time: '12:00', temp: 18 },
        { time: '13:00', temp: 19 },
        { time: '14:00', temp: 19 },
        { time: '15:00', temp: 17 }
      ]
    },
    budget: {
      spent: 100,
      total: 1250,
      dailyRecommended: 230,
      currency: '$'
    },
    checklist: [
      { id: 'chk_lon_1', text: 'Compare flight prices', subtext: 'Accommodations & transport', completed: true },
      { id: 'chk_lon_2', text: 'Add baggage', subtext: 'Thu, 18 Jan', completed: true },
      { id: 'chk_lon_3', text: 'Pre-book airport taxi', subtext: 'Terminal pickup', completed: false }
    ],
    galleryPhotos: [
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', caption: 'Tower Bridge & River Thames' },
      { url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80', caption: 'Big Ben & Westminster Palace' },
      { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80', caption: 'Regent Street Red Bus' }
    ],
    flights: [
      {
        id: 'fl_ba_1',
        flightNumber: 'BA 001',
        airline: 'BRITISH AIRWAYS',
        fromAirport: 'LCY (London City Airport)',
        toAirport: 'JFK (New York Kennedy)',
        departureTime: '07:00 AM',
        arrivalTime: '11:15 AM',
        date: '20 Jan',
        estimatedPrice: '$580',
        bookingStatus: 'Confirmed',
        terminal: 'Terminal 1'
      }
    ],
    hotels: [
      {
        id: 'ht_lon_1',
        hotelName: 'The Hoxton Southwark',
        cityOrArea: 'Southwark, London',
        nights: 4,
        pricePerNight: '$180/night',
        totalPrice: '$720',
        rating: 4.8,
        vibe: 'Industrial-chic boutique hotel steps from Tate Modern and Borough Market.',
        bookingStatus: 'Booked',
        amenities: ['Rooftop Oyster Restaurant', 'Free Wi-Fi', 'Breakfast Bag', 'Designer Lounge']
      }
    ],
    taxiTransfers: [
      {
        id: 'tx_lon_1',
        fromLocation: 'London City Airport (LCY)',
        toLocation: 'The Hoxton Hotel, Southwark',
        distanceKm: 14,
        duration: '35m',
        estimatedFare: '£35 - £45 ($44 - $56)',
        taxiType: 'London Black Cab / Addison Lee',
        pickupAdvice: 'Official Black Cab rank directly outside terminal exit.',
        famousStopsOnWay: ['Canary Wharf skyline', 'Tower Bridge approach'],
        recommendedAppOrStand: 'Terminal Black Cab Rank'
      }
    ],
    interCityLegs: [],
    days: [
      {
        dayNumber: 1,
        dateStr: '20/01',
        title: 'Arrival & Southwark Thames River Walk',
        city: 'London',
        country: 'United Kingdom',
        lat: 51.5074,
        lng: -0.1278,
        summary: 'Land at LCY, check into Southwark hotel, and walk along the vibrant Queen’s Walk.',
        stayRecommendation: 'The Hoxton Southwark',
        localFoodToTry: ['Fish and Chips at Borough Market', 'Craft Ale in historic pub'],
        restaurants: [
          {
            name: 'Padella',
            cuisine: 'Handmade Fresh Italian Pasta',
            vibe: 'Bustling pasta bar on Borough Market corner',
            recommendedDish: 'Pici Cacio e Pepe'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:30 AM',
            title: 'Arrival at London City Airport',
            description: 'Land and transit swiftly into Central London.',
            locationName: 'London City Airport',
            durationHours: 1.5,
            highlightTip: 'LCY has quick gate-to-exit times.',
            category: 'transit'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '01:00 PM',
            title: 'Tate Modern & Millennium Bridge',
            description: 'Explore contemporary art collections overlooking St Paul’s Cathedral.',
            locationName: 'Tate Modern, Bankside',
            durationHours: 3,
            highlightTip: 'Turbine Hall installations are free to view.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Borough Market Dinner & Anchor Bankside Pub',
            description: 'Savor gourmet street eats and a pint by the Thames.',
            locationName: 'Borough Market',
            durationHours: 3,
            highlightTip: 'The terrace at Anchor Bankside offers iconic sunset river views.',
            category: 'restaurant'
          }
        ]
      }
    ]
  },

  // 3. JAPAN TOKAIDO ROUTE
  {
    id: 'japan_golden_route',
    createdAt: new Date().toISOString(),
    tripTitle: 'Japan Tokaido Route: Tokyo to Kyoto & Osaka',
    dateRange: 'Apr 09 - Apr 15',
    summary: 'The classic 6-day Japanese rail journey riding high-speed Shinkansen bullet trains through Tokyo, Hakone, Kyoto, and Osaka.',
    prompt: '5 days from Tokyo to Hakone, Kyoto, and Osaka with scenic bullet train rides and local food',
    totalDays: 6,
    cities: ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'],
    efficiencyExplanation: 'Follows the linear Tokaido Shinkansen line southwest from Tokyo toward Osaka. Zero geographic doubling back.',
    totalDistanceKm: 515,
    totalDistanceMiles: 320,
    totalEstimatedTransitTime: '4h 15m total high-speed rail time',
    bestSeason: 'Spring (March-May for cherry blossoms) or Autumn (Oct-Nov)',
    packingEssentials: [
      'Comfortable slip-on walking shoes',
      'Suica or Pasmo digital IC card for transit',
      'Pocket Wi-Fi or eSIM',
      'Coin pouch for train lockers and temples'
    ],
    offlineTravelTips: [
      'Station navigation works underground using cached vector maps',
      'Bullet train routes run every 10 minutes along this corridor'
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    weather: {
      location: 'Kyoto',
      temp: 22,
      feelsLike: 21,
      condition: 'Clear Sky',
      hourly: [
        { time: '12:00', temp: 22 },
        { time: '13:00', temp: 23 },
        { time: '14:00', temp: 23 },
        { time: '15:00', temp: 21 }
      ]
    },
    budget: {
      spent: 450,
      total: 1800,
      dailyRecommended: 225,
      currency: '$'
    },
    checklist: [
      { id: 'chk_jp_1', text: 'Reserve Shinkansen luggage space', subtext: 'SmartEX app', completed: true },
      { id: 'chk_jp_2', text: 'Book Ryokan onsen dinner', subtext: 'Hakone Ginyu', completed: true },
      { id: 'chk_jp_3', text: 'Fushimi Inari morning slot', subtext: 'Arrive 7 AM', completed: false }
    ],
    galleryPhotos: [
      { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', caption: 'Kyoto Bamboo Forest' },
      { url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80', caption: 'Tokyo Night Lights' },
      { url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80', caption: 'Mount Fuji Vista' }
    ],
    flights: [
      {
        id: 'fl_jp_1',
        flightNumber: 'JL 005',
        airline: 'Japan Airlines',
        fromAirport: 'JFK (New York)',
        toAirport: 'HND (Tokyo Haneda)',
        departureTime: '11:30 AM',
        arrivalTime: '03:15 PM',
        date: '09 Apr',
        estimatedPrice: '$920',
        bookingStatus: 'Confirmed',
        terminal: 'Terminal 3'
      }
    ],
    hotels: [
      {
        id: 'ht_jp_1',
        hotelName: 'The Celestine Kyoto Gion',
        cityOrArea: 'Gion, Kyoto',
        nights: 2,
        pricePerNight: '$210/night',
        totalPrice: '$420',
        rating: 4.9,
        vibe: 'Modern Japanese luxury situated in historic geisha district.',
        bookingStatus: 'Booked',
        amenities: ['Public Bath (Ofuro)', 'Tempura Restaurant', 'Garden Lounge']
      }
    ],
    taxiTransfers: [
      {
        id: 'tx_jp_1',
        fromLocation: 'Haneda Airport (HND)',
        toLocation: 'Shinjuku, Tokyo',
        distanceKm: 22,
        duration: '30m',
        estimatedFare: '¥8,500 ($56)',
        taxiType: 'Fixed-fare Airport Taxi',
        pickupAdvice: 'Follow taxi rank signs to International Taxi Counter.',
        famousStopsOnWay: ['Rainbow Bridge across Tokyo Bay'],
        recommendedAppOrStand: 'GO Taxi App or Airport Rank'
      }
    ],
    interCityLegs: [
      {
        fromCity: 'Tokyo',
        toCity: 'Hakone',
        fromCoords: { lat: 35.6762, lng: 139.6503 },
        toCoords: { lat: 35.2323, lng: 139.1069 },
        recommendedTransport: 'Odakyu Romancecar Express',
        estimatedDuration: '1h 15m',
        distanceKm: 85,
        distanceMiles: 53,
        routeHighlights: ['Sagami Bay glimpses', 'Mount Fuji views on clear days'],
        navigationNotes: 'Depart from Shinjuku Station direct to Hakone-Yumoto.',
        efficiencyReason: 'Express train eliminates city traffic.'
      },
      {
        fromCity: 'Hakone',
        toCity: 'Kyoto',
        fromCoords: { lat: 35.2323, lng: 139.1069 },
        toCoords: { lat: 34.9858, lng: 135.7588 },
        recommendedTransport: 'Hikari Shinkansen Bullet Train',
        estimatedDuration: '2h 00m',
        distanceKm: 380,
        distanceMiles: 236,
        routeHighlights: ['Mount Fuji snow peak on right-hand side'],
        navigationNotes: 'Local bus from Hakone to Odawara Station, then board Hikari bullet train.',
        efficiencyReason: 'High-speed rail connects the onsen region directly to the historic capital.'
      }
    ],
    days: [
      {
        dayNumber: 1,
        dateStr: '09/04',
        title: 'Arrival in Tokyo: Shinjuku & Omoide Yokocho',
        city: 'Tokyo',
        country: 'Japan',
        lat: 35.6762,
        lng: 139.6503,
        summary: 'Land at Haneda, check into hotel, and explore neon-lit Shinjuku alleyways.',
        stayRecommendation: 'Shinjuku Prince Hotel',
        localFoodToTry: ['Charcoal Yakitori skewers', 'Highball cocktail'],
        restaurants: [
          {
            name: 'Toriyoshi Shinjuku',
            cuisine: 'Charcoal Yakitori',
            vibe: 'Cozy counter seating with open charcoal grill',
            recommendedDish: 'Negima chicken & tare glazed meatballs'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '09:00 AM',
            title: 'Haneda Arrival & Tokyo Monorail Transfer',
            description: 'Transit into Tokyo central via scenic Monorail.',
            locationName: 'Haneda Airport',
            durationHours: 1.5,
            highlightTip: 'Sit on the right side of the monorail for Tokyo Bay views.',
            category: 'transit'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '07:00 PM',
            title: 'Omoide Yokocho (Memory Lane) Lanterns',
            description: 'Stroll traditional narrow alleys filled with yakitori stalls.',
            locationName: 'Omoide Yokocho, Shinjuku',
            durationHours: 2.5,
            highlightTip: 'Grab a bar stool at any stall with an open seat.',
            category: 'restaurant'
          }
        ]
      }
    ]
  }
];

export const SAMPLE_TRIPS = CURATED_TRIPS;
