import React, { useState } from 'react';
import { TripItinerary } from '../types/travel';
import {
  Calendar,
  Clock,
  MapPin,
  Plane,
  Home,
  Check,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  ArrowRight,
  Compass,
  Sun,
  Eye,
  DollarSign,
  Camera,
  Sparkles,
  Car,
  Footprints,
  Plus,
  X,
  Mic,
} from 'lucide-react';

interface BentoDashboardProps {
  trip: TripItinerary;
  onOpenBoardingPass: () => void;
  onOpenMap: () => void;
  onOpenTimeline: () => void;
  onOpenTaxis: () => void;
  onOpenFlights: () => void;
  onUpdateTrip?: (updated: TripItinerary) => void;
  onEditTrip?: () => void;
  onOpenSearch?: () => void;
}

export const BentoDashboard: React.FC<BentoDashboardProps> = ({
  trip,
  onOpenBoardingPass,
  onOpenMap,
  onOpenTimeline,
  onOpenTaxis,
  onOpenFlights,
  onUpdateTrip,
  onEditTrip,
  onOpenSearch,
}) => {
  // Modal states
  const [isEditTripOpen, setIsEditTripOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(trip.tripTitle);
  const [editDateRange, setEditDateRange] = useState(trip.dateRange || 'Jan 20 - Jan 25');
  const [editHeroImage, setEditHeroImage] = useState(trip.heroImageUrl || '');

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetSpent, setBudgetSpent] = useState(trip.budget?.spent ?? 100);
  const [budgetTotal, setBudgetTotal] = useState(trip.budget?.total ?? 1250);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Sync state when trip prop changes
  React.useEffect(() => {
    setEditTitle(trip.tripTitle);
    setEditDateRange(trip.dateRange || 'Nov 12th - Nov 16th');
    setEditHeroImage(trip.heroImageUrl || '');
    setBudgetSpent(trip.budget?.spent ?? 240);
    setBudgetTotal(trip.budget?.total ?? 950);
    if (trip.checklist && trip.checklist.length > 0) {
      setChecklist(trip.checklist);
    }
  }, [trip.id]);

  // Checklist state
  const [checklist, setChecklist] = useState(
    trip.checklist && trip.checklist.length > 0
      ? trip.checklist
      : [
          { id: '1', text: 'Pre-book Airport Taxi', subtext: 'Terminal pickup booth', completed: true },
          { id: '2', text: 'Rent Activa Scooter', subtext: 'Beach exploration', completed: true },
          { id: '3', text: 'Sunset Kayak booking', subtext: 'Butterfly Beach cove', completed: false },
        ]
  );
  const [newChecklistText, setNewChecklistText] = useState('');
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  const toggleCheck = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    onUpdateTrip?.({ ...trip, checklist: updated });
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: 'chk_' + Date.now(),
      text: newChecklistText.trim(),
      completed: false,
    };
    const updated = [...checklist, newItem];
    setChecklist(updated);
    onUpdateTrip?.({ ...trip, checklist: updated });
    setNewChecklistText('');
    setShowAddChecklist(false);
  };

  const handleSaveTripDetails = () => {
    onUpdateTrip?.({
      ...trip,
      tripTitle: editTitle,
      dateRange: editDateRange,
      heroImageUrl: editHeroImage || trip.heroImageUrl,
    });
    setIsEditTripOpen(false);
  };

  const handleSaveBudget = () => {
    const remainingDays = Math.max(1, trip.totalDays);
    const daily = Math.round((budgetTotal - budgetSpent) / remainingDays);
    onUpdateTrip?.({
      ...trip,
      budget: {
        spent: budgetSpent,
        total: budgetTotal,
        dailyRecommended: Math.max(0, daily),
        currency: trip.budget?.currency || '$',
      },
    });
    setIsBudgetModalOpen(false);
  };

  // Weather fallback
  const weather = trip.weather || {
    location: trip.cities[0] || 'London',
    temp: 28,
    feelsLike: 21,
    condition: 'Partly Sunny',
    hourly: [
      { time: '12:00', temp: 28 },
      { time: '13:00', temp: 28 },
      { time: '14:00', temp: 30 },
      { time: '15:00', temp: 29 },
    ],
  };

  // Budget
  const budget = trip.budget || {
    spent: budgetSpent,
    total: budgetTotal,
    dailyRecommended: 230,
    currency: '$',
  };

  // Hero image
  const heroImage =
    trip.heroImageUrl ||
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80';

  // Flight info
  const flight = trip.flights?.[0] || {
    airline: 'IndiGo Airlines',
    flightNumber: '6E 5218',
    fromAirport: 'BOM (Mumbai Chhatrapati Shivaji)',
    toAirport: 'GOI (Goa Dabolim Airport)',
    departureTime: '06:45 AM',
    arrivalTime: '08:00 AM',
    date: 'Nov 12th',
    bookingStatus: 'Confirmed',
  };

  const getAirportCode = (str: string) => {
    if (!str) return 'DEP';
    if (str.includes('(')) {
      const parts = str.split('(');
      return parts[0].trim().substring(0, 3).toUpperCase();
    }
    return str.substring(0, 3).toUpperCase();
  };

  const fromCode = getAirportCode(flight.fromAirport);
  const toCode = getAirportCode(flight.toAirport);

  // Gallery
  const gallery = trip.galleryPhotos || [
    {
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
      caption: 'Tower Bridge & River Thames',
    },
    {
      url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80',
      caption: 'Big Ben & Parliament',
    },
    {
      url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
      caption: 'Regent Street Red Bus',
    },
  ];

  return (
    <div className="w-full space-y-4 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Search & Plan Prompt Bar matching User's Image */}
      {onOpenSearch && (
        <div
          onClick={onOpenSearch}
          className="w-full rounded-full bg-[#171c28]/95 hover:bg-[#1d2333] border border-slate-700/70 hover:border-sky-500/50 p-2 sm:px-5 sm:py-3 flex items-center justify-between gap-3 cursor-pointer shadow-xl transition-all duration-200 group"
          title="Click to search destinations or create a new plan with Gemini"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1 sm:p-1.5 rounded-full bg-slate-800 text-slate-300 group-hover:text-white group-hover:bg-sky-500/20 transition-colors shrink-0">
              <Plus className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-xs sm:text-sm text-slate-300 font-normal truncate">
              Where should we start?{' '}
              <span className="text-slate-500 hidden md:inline font-light">
                — Ask Gemini to plan your next trip or multi-city route
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400 shrink-0">
            <span className="hidden sm:flex items-center gap-1 bg-slate-800/90 border border-slate-700 px-2 py-0.5 rounded-md text-slate-300 font-medium">
              Pro <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
            <div className="p-1.5 rounded-full bg-slate-800/60 text-slate-400 group-hover:text-sky-400 transition-colors">
              <Mic className="w-4 h-4" />
            </div>
            <span className="text-[11px] bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full font-semibold border border-sky-500/30">
              Plan New Trip
            </span>
          </div>
        </div>
      )}

      {/* ROW 1: Hero Trip Card + Checklist Action Card (Matching Image 2 Top Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Hero Photographic Trip Card (Span 2 cols on lg) */}
        <div className="lg:col-span-2 relative h-[260px] sm:h-[300px] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800 group">
          <img
            src={heroImage}
            alt={trip.tripTitle}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

          {/* Top Controls matching Image 2 */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onOpenTimeline}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="View Itinerary Timeline"
            >
              <Compass className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsEditTripOpen(true)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="Edit Trip Title & Dates"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Card Content: Title, Date, Traveler Avatars */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10 text-white">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                {trip.tripTitle}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{trip.dateRange || `Jan 20 - Jan 25`}</span>
              </div>
            </div>

            {/* Stacked Avatars with Pencil Edit matching Image 2 */}
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Ellise"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="David"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Sarah"
                />
              </div>
              <button
                onClick={() => setIsEditTripOpen(true)}
                className="w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur-sm text-white/80 hover:text-white flex items-center justify-center text-xs ml-1"
                title="Edit Trip Settings"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* CARD 2: Quick Actions & Checklist Card (Matching Image 2 Top-Right) */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-base">
                🏡
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Pre-Trip Checklist
              </span>
            </div>
            <button
              onClick={() => setShowAddChecklist(!showAddChecklist)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              title="Add Checklist Item"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Checklist Input */}
          {showAddChecklist && (
            <div className="px-5 pt-3 pb-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="New task..."
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
              <button
                onClick={handleAddChecklistItem}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </div>
          )}

          {/* Checklist items matching Image 2 */}
          <div className="p-5 space-y-3">
            {checklist.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                    item.completed
                      ? 'bg-indigo-600 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span
                    className={`text-xs font-bold block ${
                      item.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.text}
                  </span>
                  {item.subtext && (
                    <span className="text-[10px] text-pink-500 font-semibold block">
                      {item.subtext}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={onOpenFlights}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
            >
              Show more
            </button>
          </div>
        </div>
      </div>

      {/* ROW 2: Flight Countdown + Weather + Agenda + Budget (Matching Image 2 Mid Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 3: Flight Countdown Card (Matching Image 2 Middle-Left) */}
        <div
          onClick={onOpenBoardingPass}
          className="rounded-[32px] overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 cursor-pointer group bg-white dark:bg-slate-900 transition-transform hover:-translate-y-0.5"
          title="Click to view full Boarding Pass ticket!"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>{flight.departureTime}</span>
              <span className="opacity-80">{flight.arrivalTime}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-black">{fromCode}</span>
              <div className="flex items-center gap-1 opacity-80 text-xs">
                <span>------</span>
                <Plane className="w-3.5 h-3.5" />
                <span>------</span>
              </div>
              <span className="text-sm font-black">{toCode}</span>
            </div>
            <span className="text-[10px] opacity-75 block text-center mt-1">
              {flight.airline} • {flight.flightNumber}
            </span>
          </div>

          <div className="p-4 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {flight.date ? `Flight on ${flight.date}` : 'Scheduled Flight'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {flight.bookingStatus || 'Confirmed'}
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold block mt-1 group-hover:underline">
              View Boarding Pass ➔
            </span>
          </div>
        </div>

        {/* CARD 4: Weather Widget Card (Matching Image 2 Middle) */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{weather.location}</span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-white block">
                  {weather.temp}°
                </span>
                <span className="text-xs text-slate-400">Feels like {weather.feelsLike}°</span>
              </div>
              <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center text-xl shadow-inner">
                ☀️
              </div>
            </div>
          </div>

          {/* Hourly Forecast Bar matching Image 2 */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
            {weather.hourly.map((h, i) => (
              <div key={i}>
                <span className="text-[10px] text-slate-400 block">{h.time}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 5: Schedule / Agenda Card (Matching Image 2 Middle-Right) */}
        <div
          onClick={onOpenTimeline}
          className="bg-white dark:bg-slate-900 rounded-[32px] p-5 shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between cursor-pointer hover:border-sky-400 transition-colors"
        >
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">Day 1</span>
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                  {trip.days[0]?.city || 'Arrival'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                  {trip.days[0]?.activities?.length || 3} Activities
                </span>
              </div>
            </div>

            {/* Time Blocks matching Image 2 */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900 text-xs">
                <span className="text-[10px] text-indigo-500 font-bold block">
                  {trip.days[0]?.activities?.[0]?.timeSlot || '08:30 AM'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                  {trip.days[0]?.activities?.[0]?.title || 'Arrival & Check-in'}
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-900 text-xs">
                <span className="text-[10px] text-pink-500 font-bold block">
                  {trip.days[0]?.activities?.[1]?.timeSlot || '01:30 PM'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                  {trip.days[0]?.activities?.[1]?.title || 'Scenic Tour & Local Lunch'}
                </span>
              </div>
            </div>
          </div>

          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-2 text-right block">
            View full day ➔
          </span>
        </div>

        {/* CARD 6: Budget & Expense Card (Matching Image 2 Far-Right) */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 shadow-xl border-2 border-lime-400/80 dark:border-lime-500/80 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-lime-600 dark:text-lime-400">
                {budget.currency}
                {budget.spent}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                of {budget.currency}
                {budget.total} spent
              </span>
            </div>

            {/* Green Progress Bar with Glowing Dot matching Image 2 */}
            <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-lime-500 rounded-full"
                style={{ width: `${Math.min(100, (budget.spent / budget.total) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse" />
              <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight">
                You can spend {budget.currency}
                {budget.dailyRecommended}/day to stay on budget
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsBudgetModalOpen(true)}
            className="text-[10px] text-lime-700 dark:text-lime-400 font-bold uppercase tracking-wider hover:underline text-left mt-3 cursor-pointer"
          >
            Manage trip budget
          </button>
        </div>
      </div>

      {/* ROW 3: Interactive Route Map Preview + Photo Gallery (Matching Image 2 Bottom Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CARD 7: Interactive Route / Walking Map Card (Matching Image 2 Bottom-Left) */}
        <div
          onClick={onOpenMap}
          className="relative h-[250px] sm:h-[280px] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 cursor-pointer group"
        >
          <div className="absolute inset-0 bg-[#0f172a]">
            <svg className="w-full h-full" viewBox="0 0 500 280">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <pattern id="bentoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="500" height="280" fill="#0b1120" />
              <rect width="500" height="280" fill="url(#bentoGrid)" />

              {/* Coastal contour line */}
              <path
                d="M 60 30 Q 110 110 80 180 T 130 270"
                fill="none"
                stroke="#0e7490"
                strokeWidth="24"
                opacity="0.25"
              />

              {/* Smooth dynamic transit route curve */}
              <path
                d="M 110 70 C 180 90, 160 170, 260 190 S 370 210, 420 180"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />

              {/* Dynamic city pins */}
              {trip.cities.slice(0, 4).map((city, idx, arr) => {
                const step = arr.length > 1 ? idx / (arr.length - 1) : 0.5;
                const cx = 110 + step * 300;
                const cy = 70 + step * 110 + (idx % 2 === 1 ? -25 : 15);
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="18" fill="#38bdf8" opacity="0.2" />
                    <circle cx={cx} cy={cy} r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                    <text x={cx} y={cy + 4} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {idx + 1}
                    </text>
                    <rect
                      x={cx - 50}
                      y={cy + 18}
                      width="100"
                      height="20"
                      rx="6"
                      fill="#1e293b"
                      opacity="0.95"
                      stroke="#334155"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy + 32}
                      fill="#f1f5f9"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {city.length > 15 ? city.substring(0, 13) + '..' : city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-bold text-slate-100 shadow-lg flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-sky-400" />
              <span>{trip.totalDistanceKm} km • {trip.totalEstimatedTransitTime || 'Optimized Route'}</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <span className="font-bold truncate max-w-[240px] sm:max-w-md">
                {trip.cities.join(' → ')}
              </span>
            </div>
            <span className="text-sky-400 font-bold group-hover:underline shrink-0">Open Live Map ➔</span>
          </div>
        </div>

        {/* CARD 8: Photo Gallery Card (Matching Image 2 Bottom-Right) */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Photo Gallery
              </h3>
            </div>
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* Stacked Photos Row matching Image 2 */}
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(img.url)}
                className="group relative h-28 sm:h-36 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-white font-semibold line-clamp-1">
                    {img.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-slate-400 text-center font-medium">
            Tap any destination photo to view full resolution
          </div>
        </div>
      </div>

      {/* MODAL: EDIT TRIP DETAILS */}
      {isEditTripOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Trip Header
              </h3>
              <button
                onClick={() => setIsEditTripOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Trip Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Dates Range
                </label>
                <input
                  type="text"
                  value={editDateRange}
                  onChange={(e) => setEditDateRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Cover Photo Image URL
                </label>
                <input
                  type="text"
                  value={editHeroImage}
                  onChange={(e) => setEditHeroImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsEditTripOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTripDetails}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MANAGE BUDGET */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Manage Trip Budget
              </h3>
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Amount Spent ({trip.budget?.currency || '$'})
                </label>
                <input
                  type="number"
                  value={budgetSpent}
                  onChange={(e) => setBudgetSpent(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Budget ({trip.budget?.currency || '$'})
                </label>
                <input
                  type="number"
                  value={budgetTotal}
                  onChange={(e) => setBudgetTotal(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                className="px-4 py-2 bg-lime-600 hover:bg-lime-500 text-white rounded-xl text-xs font-bold"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PHOTO GALLERY LIGHTBOX */}
      {(isGalleryModalOpen || selectedPhoto) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Destination Gallery</h3>
              <button
                onClick={() => {
                  setIsGalleryModalOpen(false);
                  setSelectedPhoto(null);
                }}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedPhoto ? (
              <div className="space-y-3">
                <img
                  src={selectedPhoto}
                  alt="Expanded view"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-xs text-sky-400 font-bold hover:underline"
                >
                  ← Back to all photos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => setSelectedPhoto(photo.url)}
                    className="h-40 rounded-2xl overflow-hidden cursor-pointer group relative"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 text-white text-xs font-semibold">
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
