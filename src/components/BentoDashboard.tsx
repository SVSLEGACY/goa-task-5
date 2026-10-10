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
} from 'lucide-react';

interface BentoDashboardProps {
  trip: TripItinerary;
  onOpenBoardingPass: () => void;
  onOpenMap: () => void;
  onOpenTimeline: () => void;
  onOpenTaxis: () => void;
  onOpenFlights: () => void;
  onEditTrip?: () => void;
}

export const BentoDashboard: React.FC<BentoDashboardProps> = ({
  trip,
  onOpenBoardingPass,
  onOpenMap,
  onOpenTimeline,
  onOpenTaxis,
  onOpenFlights,
  onEditTrip,
}) => {
  const [checklist, setChecklist] = useState(
    trip.checklist || [
      { id: '1', text: 'Compare prices', subtext: '', completed: true },
      { id: '2', text: 'Add baggage', subtext: 'Thu, 18 Jan', completed: true },
      { id: '3', text: 'Pre-book airport taxi', subtext: '', completed: false },
    ]
  );

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
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

  // Budget fallback
  const budget = trip.budget || {
    spent: 100,
    total: 1250,
    dailyRecommended: 230,
    currency: '$',
  };

  // Hero image fallback
  const heroImage =
    trip.heroImageUrl ||
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80';

  // Flight info
  const flight = trip.flights?.[0] || {
    airline: 'BRITISH AIRWAYS',
    flightNumber: 'BA 001',
    fromAirport: 'LGA (New York)',
    toAirport: 'LCY (London City)',
    departureTime: '7:00 AM',
    arrivalTime: '8:15 PM',
    date: '20 Jan',
  };

  const fromCode = flight.fromAirport.substring(0, 3).toUpperCase();
  const toCode = flight.toAirport.substring(0, 3).toUpperCase();

  // Gallery fallback
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
      {/* ROW 1: Hero Trip Card + Checklist Action Card (Matching Image 2 Top Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Hero Photographic Trip Card (Span 2 cols on lg) */}
        <div className="lg:col-span-2 relative h-[260px] sm:h-[300px] rounded-[32px] overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800 group">
          {/* Background Photo */}
          <img
            src={heroImage}
            alt={trip.tripTitle}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

          {/* Top Controls matching Image 2: left arrow & right edit pencil */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onOpenTimeline}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="View Itinerary"
            >
              <Compass className="w-5 h-5" />
            </button>

            <button
              onClick={onEditTrip}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="Edit Trip Details"
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
                onClick={onEditTrip}
                className="w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur-sm text-white/80 hover:text-white flex items-center justify-center text-xs ml-1"
                title="Edit Travelers"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* CARD 2: Quick Actions & Checklist Card (Matching Image 2 Top-Right) */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          {/* Purple Gradient Header with Tent/Home icon & 3 dots */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-base">
                🏡
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Pre-Trip Checklist
              </span>
            </div>
            <button className="text-white/80 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

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

            {/* Purple pill button matching Image 2 "Show more" */}
            <button
              onClick={onOpenFlights}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
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
          {/* Purple Glass Header */}
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
            <span className="text-[10px] opacity-75 block text-center mt-1">13h 15m duration</span>
          </div>

          {/* Lower Countdown section matching Image 2 */}
          <div className="p-4 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Check-in opens in
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              48<span className="text-sm font-normal text-slate-400">h</span> 22
              <span className="text-sm font-normal text-slate-400">m</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold block mt-1 group-hover:underline">
              Tap for Boarding Pass ➔
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
              {/* Sun/Weather Graphic */}
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
            {/* Date Header matching "20 Tuesday January" */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">20</span>
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                  Tuesday
                </span>
                <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                  January
                </span>
              </div>
            </div>

            {/* Time Blocks matching Image 2 colored pills */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900 text-xs">
                <span className="text-[10px] text-indigo-500 font-bold block">7:00 - 8:00 AM</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                  Flight (LGA - LCY)
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-900 text-xs">
                <span className="text-[10px] text-pink-500 font-bold block">10:00 - 11:00 AM</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                  Hotel Check-in
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
            onClick={onOpenFlights}
            className="text-[10px] text-lime-700 dark:text-lime-400 font-bold uppercase tracking-wider hover:underline text-left mt-3"
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
          {/* Stylized Vector Map Preview with Waypoints (1, 2, 3) matching Image 2 */}
          <div className="absolute inset-0 bg-[#1e293b]">
            {/* SVG Map Graphic */}
            <svg className="w-full h-full" viewBox="0 0 500 280">
              {/* Landmass and streets styling */}
              <rect width="500" height="280" fill="#0f172a" />
              <path
                d="M 60 40 L 440 40 M 60 120 L 440 120 M 60 200 L 440 200"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <path
                d="M 120 20 L 120 260 M 240 20 L 240 260 M 360 20 L 360 260"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Park shape */}
              <polygon
                points="100,50 200,60 220,180 110,190"
                fill="#164e63"
                opacity="0.6"
              />

              {/* Glowing Purple Route Polyline matching Image 2 */}
              <path
                d="M 140 70 L 160 130 L 140 170 L 120 220 L 260 240 L 340 240"
                fill="none"
                stroke="#818cf8"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              <path
                d="M 140 70 L 160 130 L 140 170 L 120 220 L 260 240 L 340 240"
                fill="none"
                stroke="#6366f1"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Waypoint 1 matching Image 2 */}
              <circle cx="140" cy="70" r="14" fill="#6366f1" />
              <circle cx="140" cy="70" r="10" fill="#ffffff" />
              <text
                x="140"
                y="74"
                fill="#4338ca"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                1
              </text>

              {/* Waypoint 2 */}
              <circle cx="120" cy="220" r="14" fill="#6366f1" />
              <circle cx="120" cy="220" r="10" fill="#ffffff" />
              <text
                x="120"
                y="224"
                fill="#4338ca"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                2
              </text>

              {/* Waypoint 3 */}
              <circle cx="340" cy="240" r="14" fill="#6366f1" />
              <circle cx="340" cy="240" r="10" fill="#ffffff" />
              <text
                x="340"
                y="244"
                fill="#4338ca"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                3
              </text>
            </svg>
          </div>

          {/* Top-Right Badge matching "35 min walk" */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-100 shadow-lg flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-indigo-500" />
              <span>35 min walk / route</span>
            </span>
          </div>

          {/* Bottom Callout Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <span className="font-bold">Offline Route & City Navigation Map</span>
            </div>
            <span className="text-sky-400 font-bold group-hover:underline">Open Map ➔</span>
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
              onClick={onOpenTimeline}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All
            </button>
          </div>

          {/* Stacked Photos Row matching Image 2 */}
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="group relative h-28 sm:h-36 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800"
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

          {/* Quick Caption */}
          <div className="mt-3 text-xs text-slate-400 text-center font-medium">
            Tap any destination photo to explore highlights and recommendations
          </div>
        </div>
      </div>
    </div>
  );
};
