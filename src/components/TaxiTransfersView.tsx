import React from 'react';
import { TripItinerary, TaxiTransfer } from '../types/travel';
import {
  Car,
  Navigation,
  Clock,
  Banknote,
  ShieldCheck,
  MapPin,
  Sparkles,
  PhoneCall,
  Compass,
  ArrowRight,
  Bike,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface TaxiTransfersViewProps {
  trip: TripItinerary;
}

export const TaxiTransfersView: React.FC<TaxiTransfersViewProps> = ({ trip }) => {
  const taxis = trip.taxiTransfers || [];

  return (
    <div className="w-full space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-6 sm:p-7 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-xs font-bold text-sky-300">
            <Car className="w-3.5 h-3.5 text-amber-400" />
            Complete Taxi &amp; Transfer Logistics
          </span>
          <span className="text-xs text-slate-300 font-medium">
            {taxis.length} Transit Routes &amp; Cab Options Planned
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
          Taxis, Cabs &amp; Local Scooter Connections
        </h3>

        <p className="text-xs sm:text-sm text-sky-100/80 max-w-2xl leading-relaxed">
          Full breakdown of all required taxis between your arrival airport, hotel stays, beach destinations, and departure terminals. Includes fair price estimates, pickup booths, and scenic stops along the way.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-sky-900/60 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Transfer Type:</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Pre-paid &amp; Private</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Total Road Distance:</span>
            <span className="text-sm font-bold text-sky-300 mt-0.5 block">{trip.totalDistanceKm} km</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Local Scooter Option:</span>
            <span className="text-sm font-bold text-emerald-300 mt-0.5 block">₹400 - ₹500/day</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block font-medium">Booking Style:</span>
            <span className="text-sm font-bold text-amber-300 mt-0.5 block">Fixed Rate Booths</span>
          </div>
        </div>
      </div>

      {/* Required Taxis List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Required Taxi Legs &amp; Transfers:
        </h4>

        {taxis.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
            No specific taxi transfers recorded yet. Use voice to say e.g. &ldquo;Plan taxis in Goa between Palolem and Mandrem&rdquo;.
          </div>
        ) : (
          taxis.map((taxi, idx) => (
            <div
              key={taxi.id || idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      Transfer #{idx + 1} • {taxi.taxiType}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{taxi.fromLocation}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span>{taxi.toLocation}</span>
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold">
                    💵 {taxi.estimatedFare}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                    ⏱️ {taxi.duration}
                  </span>
                </div>
              </div>

              {/* Pickup Advice & App info */}
              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    📌 Where to Book / Pickup:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">{taxi.pickupAdvice}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <strong>Recommended Booth/App:</strong> {taxi.recommendedAppOrStand}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Distance:</strong> {taxi.distanceKm} km
                  </span>
                </div>

                {/* Famous Stops Along The Way */}
                {taxi.famousStopsOnWay && taxi.famousStopsOnWay.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      🌟 Must-Visit Spots En Route:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {taxi.famousStopsOnWay.map((stop, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-900 rounded-lg text-xs font-medium"
                        >
                          📍 {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2-Night Recommendations Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Night Plans &amp; Recommendations for Each Stay
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
              Destination 1 (e.g. Palolem - 2 Nights)
            </span>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-2 mb-1">
              Night 1 &amp; Night 2 Experiences:
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4 mt-2">
              <li>
                <strong>Night 1:</strong> Candlelit seafood dinner with barefoot sand dining at Dropadi Shack. Sunset cocktails at Cafe Del Mar.
              </li>
              <li>
                <strong>Night 2:</strong> Neptune Point Silent Headphone Beach Club or acoustic fireside live music overlooking the rocky cove.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
              Destination 2 (e.g. Mandrem - 2 Nights)
            </span>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-2 mb-1">
              Night 3 &amp; Night 4 Experiences:
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-4 mt-2">
              <li>
                <strong>Night 3:</strong> Cross the wooden bamboo bridge to The Lazy Dog for riverside chillout music and fresh solkadhi crab dinner.
              </li>
              <li>
                <strong>Night 4:</strong> Greek clifftop sunset feast at Thalassa with live fire dancers, followed by Arpora Night Market shopping.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
