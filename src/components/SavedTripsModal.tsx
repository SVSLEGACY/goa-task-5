import React from 'react';
import { TripItinerary } from '../types/travel';
import { SAMPLE_TRIPS } from '../data/sampleTrips';
import {
  FolderHeart,
  X,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: TripItinerary[];
  activeTripId: string;
  onSelectTrip: (trip: TripItinerary) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  activeTripId,
  onSelectTrip,
  onDeleteTrip,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved Offline Trips
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between your cached routes stored on this device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trips List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {savedTrips.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No saved trips yet. Speak or generate your first itinerary!
            </div>
          ) : (
            savedTrips.map((trip) => {
              const isActive = trip.id === activeTripId;
              return (
                <div
                  key={trip.id}
                  className={`pt-3 first:pt-0 rounded-2xl p-3.5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                        {trip.totalDays} Days
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {trip.totalDistanceKm} km
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {trip.tripTitle}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {trip.cities.join(' → ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        onSelectTrip(trip);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                      title="Delete trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Preset loader */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Need inspiration?</span>
          <div className="flex gap-2">
            {SAMPLE_TRIPS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => {
                  onSelectTrip(sample);
                  onClose();
                }}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
              >
                Load {sample.cities[0]} Trip
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
