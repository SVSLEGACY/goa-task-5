import React from 'react';
import { TripItinerary, InterCityLeg } from '../types/travel';
import {
  Train,
  Car,
  Plane,
  Ship,
  Bus,
  Clock,
  Navigation,
  Compass,
  Zap,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface TransitRoutesViewProps {
  trip: TripItinerary;
}

export const TransitRoutesView: React.FC<TransitRoutesViewProps> = ({ trip }) => {
  const getTransportIcon = (transport: string) => {
    const lower = transport.toLowerCase();
    if (lower.includes('rail') || lower.includes('train') || lower.includes('shinkansen')) {
      return <Train className="w-5 h-5 text-sky-500" />;
    }
    if (lower.includes('car') || lower.includes('drive') || lower.includes('road')) {
      return <Car className="w-5 h-5 text-emerald-500" />;
    }
    if (lower.includes('flight') || lower.includes('air')) {
      return <Plane className="w-5 h-5 text-indigo-500" />;
    }
    if (lower.includes('ferry') || lower.includes('boat')) {
      return <Ship className="w-5 h-5 text-blue-500" />;
    }
    return <Bus className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="w-full space-y-6">
      {/* Route Efficiency Intelligence Summary */}
      <div className="bg-gradient-to-br from-sky-900 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-lg border border-sky-800/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-xs font-bold text-sky-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Optimized Travel Sequence
          </span>
          <span className="text-xs text-slate-300">
            {trip.cities.length} Connected Cities • {trip.interCityLegs?.length || 0} Transit Legs
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
          {trip.cities.join(' ➔ ')}
        </h3>

        <p className="text-sm text-sky-100/90 leading-relaxed mb-6">
          {trip.efficiencyExplanation}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-sky-800/80 text-xs">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Total Distance:</span>
            <span className="text-base font-bold text-white mt-0.5 block">
              {trip.totalDistanceKm} km
            </span>
            <span className="text-[11px] text-slate-400">({trip.totalDistanceMiles} miles)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Estimated Transit:</span>
            <span className="text-base font-bold text-white mt-0.5 block">
              {trip.totalEstimatedTransitTime}
            </span>
            <span className="text-[11px] text-emerald-400">⚡ Minimized Detours</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Best Season:</span>
            <span className="text-xs font-semibold text-white mt-1 block line-clamp-2">
              {trip.bestSeason}
            </span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Transit Logic:</span>
            <span className="text-xs font-semibold text-amber-300 mt-1 block">
              ✓ Direct Linear Corridor
            </span>
          </div>
        </div>
      </div>

      {/* Inter-City Legs Cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Step-by-Step City Travel Legs:
        </h4>

        {trip.interCityLegs?.map((leg, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {getTransportIcon(leg.recommendedTransport)}
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Leg {index + 1}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{leg.fromCity}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span>{leg.toCity}</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold">
                  {leg.recommendedTransport}
                </span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                  ⏱️ {leg.estimatedDuration}
                </span>
              </div>
            </div>

            {/* Navigation Instructions */}
            <div className="space-y-3 text-sm">
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  🧭 Navigation & Transit Route:
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  {leg.navigationNotes}
                </p>
              </div>

              {/* Efficiency factor */}
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Why this route:</strong> {leg.efficiencyReason}
                </span>
              </div>

              {/* Scenic Route Highlights along the way */}
              {leg.routeHighlights && leg.routeHighlights.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Scenic Points Along Way:
                  </span>
                  {leg.routeHighlights.map((hl, hlIdx) => (
                    <span
                      key={hlIdx}
                      className="bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800/80"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
