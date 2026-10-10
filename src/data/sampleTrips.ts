import { TripItinerary } from '../types/travel';

export const SAMPLE_TRIPS: TripItinerary[] = [
  {
    id: 'sample_london_uk',
    createdAt: new Date().toISOString(),
    tripTitle: 'Trip to London',
    dateRange: 'Jan 20 - Jan 25',
    summary: 'A curated 5-day London itinerary visiting iconic landmarks, West End theater, Thames riverside walks, historic pubs, and royal parks.',
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
      'Contactless payment card for seamless Tube & bus tapping',
      'UK 3-pin Type G plug adapter'
    ],
    offlineTravelTips: [
      'Download the TfL Go offline tube map onto your device',
      'Offline walking maps work well across Covent Garden and Soho alleys where GPS can reflect off tall buildings'
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    weather: {
      location: 'London',
      temp: 28,
      feelsLike: 21,
      condition: 'Partly Cloudy',
      hourly: [
        { time: '12:00', temp: 28 },
        { time: '13:00', temp: 28 },
        { time: '14:00', temp: 30 },
        { time: '15:00', temp: 29 }
      ]
    },
    budget: {
      spent: 100,
      total: 1250,
      dailyRecommended: 230,
      currency: '$'
    },
    checklist: [
      { id: 'chk_1', text: 'Compare prices', subtext: 'Compare flights & boutique stays', completed: true },
      { id: 'chk_2', text: 'Add baggage', subtext: 'Thu, 18 Jan', completed: true },
      { id: 'chk_3', text: 'Book Tower of London entry', subtext: 'Early morning slot', completed: false },
      { id: 'chk_4', text: 'Pre-book West End musical tickets', subtext: 'Lyceum Theatre', completed: false }
    ],
    galleryPhotos: [
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', caption: 'Tower Bridge & River Thames' },
      { url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80', caption: 'Big Ben & Westminster Palace' },
      { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80', caption: 'Red Double Decker Bus on Regent Street' }
    ],
    flights: [
      {
        id: 'fl_ba_1',
        flightNumber: 'BA 001',
        airline: 'BRITISH AIRWAYS',
        fromAirport: 'LCY (London City)',
        toAirport: 'DPS (Denpasar)',
        departureTime: '7:00 AM',
        arrivalTime: '8:15 PM',
        date: '20 Jan',
        estimatedPrice: '$840',
        bookingStatus: 'Booked',
        terminal: 'T5'
      }
    ],
    hotels: [
      {
        id: 'ht_lon_1',
        hotelName: 'The Hoxton, Southwark',
        cityOrArea: 'Southwark, London (4 Nights)',
        nights: 4,
        pricePerNight: '$220/night',
        totalPrice: '$880',
        rating: 4.8,
        vibe: 'Industrial-chic boutique hotel steps from Tate Modern and Borough Market.',
        bookingStatus: 'Booked',
        amenities: ['Rooftop Restaurant', 'Free Wi-Fi', 'Breakfast Bag Delivered', 'Cocktail Bar']
      }
    ],
    taxiTransfers: [
      {
        id: 'tx_lon_1',
        fromLocation: 'London City Airport (LCY)',
        toLocation: 'The Hoxton Southwark',
        distanceKm: 14,
        duration: '35m',
        estimatedFare: '£38 - £45 ($48 - $56)',
        taxiType: 'Pre-paid Airport Taxi',
        pickupAdvice: 'Use the official Black Cab rank or DLR train to Bank, then Jubilee line to Southwark.',
        recommendedAppOrStand: 'Black Cab Rank or FreeNow App'
      }
    ],
    interCityLegs: [
      {
        fromCity: 'Tower Bridge',
        toCity: 'Borough Market',
        fromCoords: { lat: 51.5055, lng: -0.0754 },
        toCoords: { lat: 51.5055, lng: -0.0906 },
        recommendedTransport: 'Walking / Scenic Stroll',
        estimatedDuration: '35 min walk',
        distanceKm: 2.2,
        distanceMiles: 1.4,
        routeHighlights: ['HMS Belfast battleship', 'City Hall', 'Southwark Cathedral'],
        navigationNotes: 'Walk along the south bank Thames Path pedestrian trail.',
        efficiencyReason: 'Completely traffic-free scenic river promenade directly linking the top sights.'
      }
    ],
    days: [
      {
        dayNumber: 1,
        dateStr: '20/01',
        title: 'Arrival, Flight (LGA - LCY) & Hotel Check-in',
        city: 'London',
        country: 'United Kingdom',
        lat: 51.5074,
        lng: -0.1278,
        summary: 'Land at London City Airport, check into Southwark hotel, and embark on a 35-minute Thames river walk.',
        stayRecommendation: 'Southwark or Bankside',
        localFoodToTry: ['Fish and Chips with mushy peas', 'Artisan sourdough at Borough Market', 'Pimm’s Cup cocktail'],
        restaurants: [
          {
            name: 'Padella Borough Market',
            cuisine: 'Hand-rolled fresh pasta',
            vibe: 'Bustling pasta bar with open kitchen views',
            recommendedDish: 'Pici cacio e pepe & 8-hour beef shin ragu'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '7:00 - 8:00 AM',
            title: 'Flight (LGA - LCY) Arrival & Customs',
            description: 'Smooth arrival at London City Airport with fast automated e-Passport gates.',
            locationName: 'London City Airport (LCY)',
            durationHours: 1,
            highlightTip: 'LCY is the fastest airport in London with less than 15-minute gate-to-taxi time.',
            category: 'transit'
          },
          {
            timeOfDay: 'Morning',
            timeSlot: '10:00 - 11:00 AM',
            title: 'Hotel Check-in & Coffee at The Hoxton',
            description: 'Drop bags, check in to room, and enjoy specialty flat white in the lobby lounge.',
            locationName: 'The Hoxton, Southwark',
            durationHours: 1,
            highlightTip: 'Store your bags with reception if arriving before 2 PM standard room check-in.',
            category: 'hotel'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '01:30 PM',
            title: 'Tower Bridge & 35-min Thames Path Walk',
            description: 'Explore the high-level glass floor walkways of Tower Bridge and stroll along the South Bank.',
            locationName: 'Tower Bridge to Borough Market',
            durationHours: 2.5,
            highlightTip: 'Look through the glass floor walkways to see London red buses crossing beneath your feet.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Dinner at Borough Market & Historic Pub Ale',
            description: 'Feast on street food stalls followed by a pint of British cask ale at The George Inn.',
            locationName: 'Borough Market & Borough High St',
            durationHours: 3,
            highlightTip: 'The George Inn is London only surviving galleried coaching inn, once visited by Charles Dickens.',
            category: 'restaurant'
          }
        ]
      }
    ]
  },
  {
    id: 'sample_goa_palolem_mandrem',
    createdAt: new Date().toISOString(),
    tripTitle: 'Goa Coastal Escape: 2 Nights Palolem & 2 Nights Mandrem',
    dateRange: 'Nov 12th 2024 - Nov 16th 2024',
    summary: 'A 4-day, 4-night journey experiencing the quiet serene crescent bay of South Goa (Palolem) followed by the pristine bohemian beaches of North Goa (Mandrem) with full taxi logistics and night plans.',
    prompt: 'I want to visit Goa, in Palolem, Mandrem, etc. 2 nights each with taxis required, restaurants, hotels and flights',
    totalDays: 4,
    cities: ['Palolem (South Goa)', 'Mandrem (North Goa)'],
    efficiencyExplanation: 'Sequenced strictly South-to-North: arriving via Dabolim Airport (closer to South), spending 2 uninterrupted nights in Palolem, then taking a dedicated scenic coastal taxi transfer with a lunch stop at Cabo de Rama Fort into Mandrem for 2 peaceful nights, departing seamlessly from the new MOPA North Goa Airport.',
    totalDistanceKm: 145,
    totalDistanceMiles: 90,
    totalEstimatedTransitTime: '3h 30m total taxi road time',
    bestSeason: 'November to March (Dry, breezy 28°C sunny weather)',
    packingEssentials: [
      'Light cotton beachwear & linen shirts',
      'Slip-resistant flip-flops and sandals',
      'Waterproof phone pouch for kayaking and dolphin trips',
      'Mosquito repellent for sunset beachfront dining',
      'Cash in Indian Rupees (₹) for beach shacks and prepaid taxis'
    ],
    offlineTravelTips: [
      'Cell reception drops along the winding NH66 ghat roads between Agonda and Betul; keep offline GPS downloaded',
      'Book airport taxis via the official pre-paid counters inside Dabolim or MOPA terminals to avoid street negotiation',
      'Scooter rentals in Goa require carrying a physical driving license and wearing a helmet on highways',
      'Beach shack Wi-Fi can be intermittent during high tide; take screenshots of your cottage booking confirmation'
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
      { id: 'chk_goa_3', text: 'Sunset Kayak booking', subtext: 'Butterfly Beach cove', completed: false }
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
        pickupAdvice: 'Book directly at the Government Pre-Paid Taxi Booth right outside Arrivals Hall Gate 2. Avoid unofficial touts outside the gate.',
        famousStopsOnWay: ['Majorda highway bakery', 'Margao historic church square'],
        recommendedAppOrStand: 'Goa State Pre-Paid Taxi Counter (Fixed Government Tariff)'
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
        pickupAdvice: 'Mandrem is very close to the new Manohar International Airport (MOPA). Taxis can be called directly from Mandrem junction.',
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
        pickupAdvice: 'Rent a scooter from your cottage host; gives complete freedom to hop between quiet beach coves.',
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
        bookingStatus: 'Estimated Price',
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
        bookingStatus: 'Suggested',
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
        bookingStatus: 'Suggested',
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
            timeSlot: '01:30 PM',
            title: 'Authentic Goan Fish Thali & Ayurvedic Foot Massage',
            description: 'Feast on 8-dish Goan fish thali with crab xacuti, followed by Ayurvedic herbal massage.',
            locationName: 'Canacona Coastal Village',
            durationHours: 2.5,
            highlightTip: 'Always dip the fresh local Poi bread into the warm spicy kismoor and fish curry.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '07:30 PM',
            title: 'Night 2: Headphone Party or Acoustic Sessions at Neptune Point',
            description: 'Spend your second night enjoying the famous headphone silent party on the rocky cliff or acoustic fireside songs.',
            locationName: 'Neptune Point Cliff, Palolem',
            durationHours: 3.5,
            highlightTip: 'Switch between 3 DJ channels (Electro, Indie, Reggae) with color-changing glowing wireless headphones.',
            category: 'activity'
          }
        ]
      },
      {
        dayNumber: 3,
        dateStr: '14/11',
        title: 'Scenic Taxi via Cabo de Rama to Mandrem Beach (Night 3)',
        city: 'Mandrem Beach',
        region: 'North Goa',
        country: 'India',
        lat: 15.6706,
        lng: 73.7145,
        summary: 'Check out of Palolem, take scenic inter-city taxi with stop at medieval Cabo de Rama Fort cliff, cross into quiet Mandrem Beach for Night 3.',
        stayRecommendation: 'Dune Eco Village or bohemian beachfront cabana in Mandrem',
        localFoodToTry: ['Crab Xec Xec (Rich Coconut Crab)', 'Tandoori Snapper', 'Kokum Solkadhi Cooler'],
        restaurants: [
          {
            name: 'The Lazy Dog Mandrem',
            cuisine: 'Grill & Fusion Pan-Asian',
            vibe: 'Riverside bamboo deck surrounded by palms and pool',
            recommendedDish: 'Tiger Prawns with garlic butter & cold beer'
          },
          {
            name: 'Verandah Mandrem',
            cuisine: 'Mediterranean & Seafood',
            vibe: 'Chic open-air terrace with sunset sea breeze',
            recommendedDish: 'Pan-seared Red Snapper with lemon caper sauce'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '09:30 AM',
            title: 'Scenic Taxi Departure & Stop at Cabo de Rama Fort',
            description: 'Depart Palolem via private cab. Stop at the ancient Portuguese clifftop fortress with panoramic 180° ocean views.',
            locationName: 'Cabo de Rama Fort & Cliff',
            durationHours: 2.5,
            highlightTip: 'Walk past the white chapel to the western cliff bastion for the dramatic turquoise water panorama.',
            category: 'transit'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '01:30 PM',
            title: 'Cross Mandrem Bamboo Footbridge & Beach Check-in',
            description: 'Arrive at peaceful Mandrem. Cross the charming bamboo bridge spanning the river inlet onto wide quiet sands.',
            locationName: 'Mandrem Beach Eco Cabanas',
            durationHours: 3,
            highlightTip: 'Mandrem is famous for having virtually zero crowds or beach hawkers, making it North Goa most relaxing beach.',
            category: 'hotel'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Night 3: Sunset Acoustic Beach Bonfire & Lazy Dog Dining',
            description: 'Watch the sun paint the wide sandbanks gold. Enjoy chilled ambient acoustic guitar music by the river inlet.',
            locationName: 'The Lazy Dog Restaurant, Mandrem',
            durationHours: 3.5,
            highlightTip: 'Order Solkadhi (tangy kokum coconut cooler); it is the ultimate refreshing digestive after spicy Goan food.',
            category: 'restaurant'
          }
        ]
      },
      {
        dayNumber: 4,
        dateStr: '15/11',
        title: 'Ashvem Coastal Walk, Thalassa Views & Night Market (Night 4)',
        city: 'Mandrem Beach',
        region: 'North Goa',
        country: 'India',
        lat: 15.6706,
        lng: 73.7145,
        summary: 'Morning barefoot walk along Mandrem to Ashvem sands, Greek lunch at Thalassa clifftop, and Night 4 exploring Saturday Night Market before MOPA departure.',
        stayRecommendation: 'Dune Eco Village or Mandrem Junction',
        localFoodToTry: ['Goan Chorizo Pav (Spiced sausage bread)', 'Fresh Grilled Calamari', 'Dodol Goan Sweet'],
        restaurants: [
          {
            name: 'Thalassa Greek Taverna Siolim',
            cuisine: 'Greek & Mediterranean Clifftop Dining',
            vibe: 'Iconic white-washed terrace with fire dancers and live sirtaki music',
            recommendedDish: 'Spanakopita, Souvlaki & Baklava'
          },
          {
            name: 'Burger Factory Morjim',
            cuisine: 'Gourmet Artisanal Burgers & Milkshakes',
            vibe: 'Laid-back surf shack with garden terrace',
            recommendedDish: 'Avocado Gorgonzola & Pork Bacon Burger'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:30 AM',
            title: 'Morning Low-Tide Walk to Ashvem Beach & Yoga Shala',
            description: 'Stroll 2 km along flat golden sands into Ashvem. Optional morning restorative yoga class under palm thatched roof.',
            locationName: 'Ashvem-Mandrem Sandspit',
            durationHours: 2.5,
            highlightTip: 'At low tide, small warm tide-pools form on the sandbars where you can sit and watch sandpipers.',
            category: 'beach'
          },
          {
            timeOfDay: 'Afternoon',
            timeSlot: '01:00 PM',
            title: 'Boutique Shopping & Clifftop Greek Lunch at Thalassa',
            description: 'Short 15-minute taxi ride to Thalassa clifftop overlooking the Chapora river estuary for festive Greek dining.',
            locationName: 'Thalassa, Siolim',
            durationHours: 3,
            highlightTip: 'Book tables 3-4 days in advance to get first-row oceanfront seating.',
            category: 'restaurant'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Night 4: Arpora Night Market & Night Taxi to MOPA Airport',
            description: 'Conclude your Goa stay with artisan spices and handmade leather crafts, followed by 35-min cab to North Goa MOPA Airport.',
            locationName: 'Saturday Night Market & MOPA Airport (GOX)',
            durationHours: 4,
            highlightTip: 'MOPA Airport is only 28 km from Mandrem (35-40 min), eliminating the old 2-hour rush across the state.',
            category: 'transit'
          }
        ]
      }
    ]
  },
  {
    id: 'sample_japan_golden_route',
    createdAt: new Date().toISOString(),
    tripTitle: 'Japan Tokaido Route: Tokyo to Kyoto & Osaka',
    dateRange: 'April 9th 2024 - April 14th 2024',
    summary: 'An ultra-efficient 5-day journey along the legendary Tokaido Shinkansen bullet train corridor with zero backtracking.',
    prompt: '5 days traveling from Tokyo to Hakone, Kyoto, and Osaka with scenic train routes and local food',
    totalDays: 5,
    cities: ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'],
    efficiencyExplanation: 'Sequenced strictly west-bound along the Tokaido high-speed rail artery. Eliminates over 6 hours of unnecessary train reversals.',
    totalDistanceKm: 510,
    totalDistanceMiles: 317,
    totalEstimatedTransitTime: '3h 40m total Shinkansen & express time',
    bestSeason: 'March - May (Cherry Blossoms) or October - November (Autumn Foliage)',
    packingEssentials: [
      'Comfortable slip-on walking shoes for temple visits',
      'Physical IC Card (Suica/Pasmo) loaded with funds for offline gates',
      'Universal 2-prong Type A power adapter',
      'Lightweight packable daypack for Shinkansen overhead racks'
    ],
    offlineTravelTips: [
      'Download Japan Travel Navitime offline train timetables before departure',
      'Take photos or print station platform transfer maps for Tokyo and Kyoto stations'
    ],
    flights: [
      {
        id: 'fl_jp_1',
        flightNumber: 'NH 880',
        airline: 'All Nippon Airways (ANA)',
        fromAirport: 'HND (Tokyo Haneda)',
        toAirport: 'KIX (Kansai Osaka)',
        departureTime: '08:30 AM',
        arrivalTime: '09:45 AM',
        date: 'April 9th',
        estimatedPrice: '$120 (¥18,000)',
        bookingStatus: 'Estimated Price'
      }
    ],
    hotels: [
      {
        id: 'ht_jp_1',
        hotelName: 'Ryokan Gora Hanaougi',
        cityOrArea: 'Hakone Gora (1 Night)',
        nights: 1,
        pricePerNight: '$280/night',
        rating: 4.9,
        vibe: 'Authentic tatami suites with private outdoor cedar hot spring onsen.',
        bookingStatus: 'Suggested',
        amenities: ['Private Onsen', 'Kaiseki Dinner', 'Mountain View']
      }
    ],
    taxiTransfers: [
      {
        id: 'tx_jp_1',
        fromLocation: 'Hakone-Yumoto Station',
        toLocation: 'Gora Ryokan Inn',
        distanceKm: 8,
        duration: '18m',
        estimatedFare: '¥2,400 ($16)',
        taxiType: 'Local Cab Stand',
        pickupAdvice: 'Official taxi queue right at East Exit of Hakone-Yumoto Station.',
        recommendedAppOrStand: 'Hakone Tozan Taxi Stand'
      }
    ],
    interCityLegs: [
      {
        fromCity: 'Tokyo',
        toCity: 'Hakone',
        fromCoords: { lat: 35.6762, lng: 139.6503 },
        toCoords: { lat: 35.2323, lng: 139.1069 },
        recommendedTransport: 'Train',
        estimatedDuration: '1h 15m',
        distanceKm: 85,
        distanceMiles: 53,
        routeHighlights: ['Shinjuku departure', 'Views of Mount Fuji', 'Hakone Tozan mountain railway'],
        navigationNotes: 'Odakyu Romancecar from Shinjuku direct to Hakone-Yumoto Station.',
        efficiencyReason: 'Direct south-west rail corridor.'
      },
      {
        fromCity: 'Hakone',
        toCity: 'Kyoto',
        fromCoords: { lat: 35.2323, lng: 139.1069 },
        toCoords: { lat: 35.0116, lng: 135.7681 },
        recommendedTransport: 'High-Speed Rail',
        estimatedDuration: '2h 00m',
        distanceKm: 375,
        distanceMiles: 233,
        routeHighlights: ['Lake Ashi', 'Tokaido Shinkansen cruise', 'Lake Biwa approaches'],
        navigationNotes: 'Board Hikari Shinkansen from Odawara Station to Kyoto Station.',
        efficiencyReason: 'Direct Shinkansen gateway.'
      }
    ],
    days: [
      {
        dayNumber: 1,
        dateStr: '09/04',
        title: 'Landed at Kansai & Nara Deer Park Stroll',
        city: 'Osaka / Nara',
        country: 'Japan',
        lat: 34.6937,
        lng: 135.5023,
        summary: 'Land at Kansai Airport, transfer to central Osaka, explore sacred deer in ancient Nara, and enjoy dinner.',
        stayRecommendation: 'Namba or Umeda Hub',
        localFoodToTry: ['Fresh Edomae Nigiri Sushi', 'Takoyaki in Dotonbori'],
        restaurants: [
          {
            name: 'Kushikatsu Daruma Dotonbori',
            cuisine: 'Crispy Skewered Cutlets',
            vibe: 'Lively Osaka institution with golden crunch and tangy sauce',
            recommendedDish: 'Original Kushikatsu Set (No double dipping!)'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:30 AM',
            title: 'Landed at Kansai Airport, Osaka',
            description: 'Clear customs, exchange JR Pass voucher, and board Haruka Airport Express.',
            locationName: 'Kansai International Airport (KIX)',
            durationHours: 1.5,
            highlightTip: 'Buy an ICOCA card for quick tap on trains and vending machines.',
            category: 'transit'
          },
          {
            timeOfDay: 'Morning',
            timeSlot: '10:30 AM',
            title: 'Explore Nara Deer Park & Todai-ji Temple',
            description: 'Walk through ancient cedar forests feeding bowing shika deer and marvel at the 15-meter Bronze Great Buddha.',
            locationName: 'Nara Deer Park, Todai-ji',
            durationHours: 3.5,
            highlightTip: 'Buy shika-senbei deer crackers for ¥200; deer will gently bow their heads before taking one!',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Dinner at a Local Restaurant in Dotonbori',
            description: 'Stroll under the illuminated Glico Running Man and enjoy piping hot takoyaki and yakitori skewers.',
            locationName: 'Dotonbori Canal Alleys',
            durationHours: 2.5,
            highlightTip: 'Look for the giant mechanical moving crab above Kani Doraku.',
            category: 'restaurant'
          }
        ]
      },
      {
        dayNumber: 2,
        dateStr: '10/04',
        title: 'Shinkansen to Ancient Kyoto & Fushimi Inari Taisha',
        city: 'Kyoto',
        country: 'Japan',
        lat: 35.0116,
        lng: 135.7681,
        summary: 'Hop 28 minutes to Kyoto, walk through 10,000 vermilion Torii gates, and dine on traditional Yudofu tofu.',
        stayRecommendation: 'Gion or Kawaramachi District',
        localFoodToTry: ['Kyoto Matcha Parfait', 'Yudofu Hot Pot in Gion'],
        restaurants: [
          {
            name: 'Tousuiro Gion',
            cuisine: 'Traditional Kyoto Tofu & Kaiseki',
            vibe: 'Historic wooden machiya townhouse with courtyard zen garden',
            recommendedDish: 'Simmered Oboro-tofu course'
          }
        ],
        activities: [
          {
            timeOfDay: 'Morning',
            timeSlot: '08:30 AM',
            title: 'Go to Kyoto by Train',
            description: 'Board JR Special Rapid Service from Osaka to Kyoto Station (28 min smooth ride).',
            locationName: 'Osaka Station to Kyoto Station',
            durationHours: 1,
            highlightTip: 'Store large luggage in Kyoto Station B1 lockers to explore hands-free.',
            category: 'transit'
          },
          {
            timeOfDay: 'Morning',
            timeSlot: '11:30 AM',
            title: 'Explore Fushimi Inari Taisha 10,000 Gates',
            description: 'Hike through glowing orange Torii tunnels climbing Mount Inari.',
            locationName: 'Fushimi Inari Taisha Shrine',
            durationHours: 3,
            highlightTip: 'Hike past Yotsutsuji intersection for panoramic views across Kyoto basin.',
            category: 'sightseeing'
          },
          {
            timeOfDay: 'Evening',
            timeSlot: '06:30 PM',
            title: 'Lantern-Lit Dinner in Pontocho Alley',
            description: 'Traditional dining overlooking the cooling Kamo River platforms.',
            locationName: 'Pontocho Alley, Kyoto',
            durationHours: 2.5,
            highlightTip: 'Reserve a riverside Kawadoko platform during spring and autumn.',
            category: 'restaurant'
          }
        ]
      }
    ]
  }
];
