import React, { useState } from 'react';
import { TripItinerary, DayPlan, Activity } from '../types/travel';
import {
  Calendar,
  MapPin,
  Clock,
  Utensils,
  Home,
  Sun,
  Sunset,
  Moon,
  ArrowRight,
  Train,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ItineraryViewProps {
  trip: TripItinerary;
  selectedDay: number | null;
  onSelectDay: (dayNumber: number | null) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  selectedDay,
  onSelectDay,
}) => {
  const [filterCity, setFilterCity] = useState<string>('all');

  const filteredDays = trip.days.filter((day) => {
    if (selectedDay !== null && day.dayNumber !== selectedDay) return false;
    if (filterCity !== 'all' && day.city !== filterCity) return false;
    return true;
  });

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay.toLowerCase()) {
      case 'morning':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'afternoon':
        return <Sunset className="w-4 h-4 text-orange-500" />;
      case 'evening':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      default:
        return <Clock className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Day Selector Quick Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Jump to Day:
            </span>
          </div>

          {selectedDay !== null && (
            <button
              onClick={() => onSelectDay(null)}
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
            >
              Show All {trip.totalDays} Days
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => onSelectDay(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDay === null
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Days ({trip.totalDays})
          </button>

          {trip.days.map((day) => {
            const isSelected = selectedDay === day.dayNumber;
            return (
              <button
                key={day.dayNumber}
                onClick={() => onSelectDay(isSelected ? null : day.dayNumber)}
                className={`flex flex-col items-start px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-400/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-bold">Day {day.dayNumber}</span>
                <span
                  className={`text-[10px] truncate max-w-[90px] ${
                    isSelected ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {day.city}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-6">
        {filteredDays.map((day, idx) => {
          // Check if there is an inter-city travel leg departing today or between days
          const prevDay = idx > 0 ? trip.days[idx - 1] : null;
          const isCityTransition = prevDay && prevDay.city !== day.city;
          const matchingLeg = isCityTransition
            ? trip.interCityLegs?.find(
                (l) => l.fromCity === prevDay.city && l.toCity === day.city
              )
            : null;

          return (
            <div key={day.dayNumber} className="space-y-4">
              {/* Inter-City Transit Transition Banner */}
              {isCityTransition && matchingLeg && (
                <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800/90 dark:to-slate-800/60 border border-sky-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
                        <span>Travel Leg</span>
                        <span>•</span>
                        <span>{matchingLeg.recommendedTransport}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{matchingLeg.fromCity}</span>
                        <ArrowRight className="w-4 h-4 text-sky-500" />
                        <span>{matchingLeg.toCity}</span>
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-300">
                    <span>
                      ⏱️ <strong>{matchingLeg.estimatedDuration}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      📏 <strong>{matchingLeg.distanceKm} km</strong> ({matchingLeg.distanceMiles} mi)
                    </span>
                  </div>
                </div>
              )}

              {/* Day Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Day Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center px-3 py-1 bg-sky-600 text-white rounded-xl text-xs font-bold shadow-sm">
                      DAY {day.dayNumber}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {day.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        <span>
                          {day.city}, {day.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {day.activities.length} Activities Planned
                  </span>
                </div>

                {/* Day Summary */}
                <div className="px-5 sm:px-6 pt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {day.summary}
                </div>

                {/* Activities Timeline */}
                <div className="p-5 sm:p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Schedule:
                  </h4>

                  <div className="space-y-4">
                    {day.activities.map((activity, actIdx) => (
                      <div
                        key={actIdx}
                        className="relative pl-6 border-l-2 border-sky-400 dark:border-sky-500 pb-2 last:pb-0"
                      >
                        {/* Dot on line */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-700/60">
                          {/* Time & Duration */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                              {getTimeIcon(activity.timeOfDay)}
                              <span>{activity.timeOfDay}</span>
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.durationHours} hrs
                            </span>
                          </div>

                          {/* Activity Name & Location */}
                          <h5 className="text-base font-bold text-slate-900 dark:text-white">
                            {activity.title}
                          </h5>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                            📍 {activity.locationName}
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {activity.description}
                          </p>

                          {/* Highlight Pro Tip */}
                          {activity.highlightTip && (
                            <div className="mt-3 text-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 rounded-xl p-2.5 text-amber-900 dark:text-amber-200 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">Insider Tip:</span>{' '}
                                {activity.highlightTip}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day Footer: Stay & Food */}
                <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Stay Recommendation */}
                  <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Home className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">
                        Recommended Stay Area:
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {day.stayRecommendation}
                      </span>
                    </div>
                  </div>

                  {/* Food to Try */}
                  <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Utensils className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">
                        Must-Try Food in {day.city}:
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {day.localFoodToTry.join(' • ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
