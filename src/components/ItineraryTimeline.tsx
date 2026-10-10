import React, { useState } from 'react';
import { TripItinerary, DayPlan, Activity } from '../types/travel';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Utensils,
  Moon,
  Sun,
  Sunset,
  ArrowRight,
  Train,
  Car,
  Compass,
  Check,
  X,
  Volume2,
} from 'lucide-react';

interface ItineraryTimelineProps {
  trip: TripItinerary;
  onUpdateTrip: (updatedTrip: TripItinerary) => void;
  onModifyWithAI: (instruction: string) => Promise<void>;
  isAIModifying: boolean;
  selectedDay: number | null;
  onSelectDay: (dayNumber: number | null) => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  trip,
  onUpdateTrip,
  onModifyWithAI,
  isAIModifying,
  selectedDay,
  onSelectDay,
}) => {
  const [editingActivity, setEditingActivity] = useState<{
    dayNumber: number;
    activityIdx: number;
    activity: Activity;
  } | null>(null);

  const [newActivityDay, setNewActivityDay] = useState<number | null>(null);
  const [newActivityData, setNewActivityData] = useState<Activity>({
    timeOfDay: 'Morning',
    timeSlot: '09:00 AM',
    title: '',
    description: '',
    locationName: '',
    durationHours: 2,
    highlightTip: '',
  });

  const [aiInstruction, setAiInstruction] = useState<string>('');
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  // Handle saving an edited activity
  const handleSaveEdit = () => {
    if (!editingActivity) return;
    const { dayNumber, activityIdx, activity } = editingActivity;

    const updatedDays = trip.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        const updatedActivities = [...day.activities];
        updatedActivities[activityIdx] = activity;
        return { ...day, activities: updatedActivities };
      }
      return day;
    });

    onUpdateTrip({ ...trip, days: updatedDays });
    setEditingActivity(null);
  };

  // Handle deleting an activity
  const handleDeleteActivity = (dayNumber: number, activityIdx: number) => {
    const updatedDays = trip.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        const updatedActivities = day.activities.filter((_, i) => i !== activityIdx);
        return { ...day, activities: updatedActivities };
      }
      return day;
    });
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  // Handle adding a brand new activity
  const handleAddNewActivity = () => {
    if (!newActivityDay || !newActivityData.title.trim()) return;

    const updatedDays = trip.days.map((day) => {
      if (day.dayNumber === newActivityDay) {
        return {
          ...day,
          activities: [...day.activities, { ...newActivityData, id: 'act_' + Date.now() }],
        };
      }
      return day;
    });

    onUpdateTrip({ ...trip, days: updatedDays });
    setNewActivityDay(null);
    setNewActivityData({
      timeOfDay: 'Morning',
      timeSlot: '09:00 AM',
      title: '',
      description: '',
      locationName: '',
      durationHours: 2,
      highlightTip: '',
    });
  };

  const handleRunAiModify = async () => {
    if (!aiInstruction.trim() || isAIModifying) return;
    await onModifyWithAI(aiInstruction.trim());
    setAiInstruction('');
    setShowAiModal(false);
  };

  const filteredDays = trip.days.filter((d) =>
    selectedDay === null ? true : d.dayNumber === selectedDay
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Card Header strictly inspired by Image 2 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            {/* Circular Calendar Icon matching Image 2 */}
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-inner shrink-0">
              <Calendar className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {trip.tripTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {trip.dateRange || `Day 1 to Day ${trip.totalDays}`}
              </p>
            </div>
          </div>

          {/* Quick Action: Modify Itinerary with AI */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowAiModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Modify with AI / Voice</span>
            </button>
          </div>
        </div>

        {/* Day Jumper Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none text-xs">
          <button
            onClick={() => onSelectDay(null)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedDay === null
                ? 'bg-slate-900 dark:bg-sky-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Days ({trip.totalDays})
          </button>
          {trip.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => onSelectDay(selectedDay === day.dayNumber ? null : day.dayNumber)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedDay === day.dayNumber
                  ? 'bg-slate-900 dark:bg-sky-600 text-white ring-2 ring-sky-400/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Day {day.dayNumber}</span>
              <span className="ml-1 opacity-70 font-normal">({day.city})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Card matching Image 2 Layout & Minimalist Style */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
        {filteredDays.map((day) => {
          const displayDate = day.dateStr || `${day.dayNumber}/${new Date().getMonth() + 1}`;

          return (
            <div key={day.dayNumber} className="relative">
              {/* Day Label Header */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-lg text-xs font-bold">
                    Day {day.dayNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {day.title}
                  </h3>
                  <span className="text-xs text-slate-400">• {day.city}</span>
                </div>

                <button
                  onClick={() => setNewActivityDay(day.dayNumber)}
                  className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stop</span>
                </button>
              </div>

              {/* Minimalist Vertical Dashed Timeline strictly matching Image 2 */}
              <div className="relative space-y-7">
                {/* Vertical Dashed Connection Line */}
                <div
                  className="absolute left-[70px] sm:left-[76px] top-3 bottom-3 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-700 pointer-events-none"
                  aria-hidden="true"
                />

                {day.activities.map((activity, actIdx) => (
                  <div
                    key={actIdx}
                    className="relative flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Left Column: Date and Time */}
                    <div className="w-[62px] sm:w-[68px] text-right shrink-0 pt-0.5">
                      {actIdx === 0 && (
                        <div className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 mb-1 tracking-tight">
                          {displayDate}
                        </div>
                      )}
                      <div className="text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-tight">
                        {activity.timeSlot ||
                          (activity.timeOfDay === 'Morning'
                            ? '08:30 AM'
                            : activity.timeOfDay === 'Afternoon'
                            ? '01:30 PM'
                            : '06:30 PM')}
                      </div>
                    </div>

                    {/* Timeline Node Dot */}
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900 shrink-0 mt-1.5 group-hover:bg-sky-500 group-hover:scale-125 transition-all" />

                    {/* Right Content: Title, Location, and Edit Controls */}
                    <div className="flex-1 bg-transparent group-hover:bg-slate-50 dark:group-hover:bg-slate-800/40 p-2 sm:p-2.5 -m-2 sm:-m-2.5 rounded-2xl transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {activity.title}
                          </h4>
                          {activity.locationName && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-sky-500 shrink-0" />
                              <span>{activity.locationName}</span>
                            </div>
                          )}
                          {activity.description && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {activity.description}
                            </p>
                          )}
                          {activity.highlightTip && (
                            <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg mt-2 inline-block border border-amber-200/60 dark:border-amber-900/60">
                              💡 <strong>Tip:</strong> {activity.highlightTip}
                            </div>
                          )}
                        </div>

                        {/* Inline Actions (Edit / Delete) */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              setEditingActivity({
                                dayNumber: day.dayNumber,
                                activityIdx: actIdx,
                                activity: { ...activity },
                              })
                            }
                            className="p-1.5 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit activity"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(day.dayNumber, actIdx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete activity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Restaurants for this Day / Stop */}
              {day.restaurants && day.restaurants.length > 0 && (
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                    Recommended Dining in {day.city}:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {day.restaurants.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-xs"
                      >
                        <span className="font-bold text-slate-900 dark:text-white block text-sm">
                          {res.name}
                        </span>
                        <span className="text-sky-600 dark:text-sky-400 font-medium block mt-0.5">
                          {res.cuisine}
                        </span>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">{res.vibe}</p>
                        <div className="mt-2 text-emerald-700 dark:text-emerald-300 font-medium">
                          🍴 Must Try: {res.recommendedDish}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Edit Activity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pencil className="w-4 h-4 text-sky-500" />
                Edit Activity
              </h3>
              <button
                onClick={() => setEditingActivity(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Time Slot (e.g. 08:30 AM, 11:30 AM)
                </label>
                <input
                  type="text"
                  value={editingActivity.activity.timeSlot || ''}
                  onChange={(e) =>
                    setEditingActivity({
                      ...editingActivity,
                      activity: { ...editingActivity.activity, timeSlot: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  value={editingActivity.activity.title}
                  onChange={(e) =>
                    setEditingActivity({
                      ...editingActivity,
                      activity: { ...editingActivity.activity, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={editingActivity.activity.locationName}
                  onChange={(e) =>
                    setEditingActivity({
                      ...editingActivity,
                      activity: { ...editingActivity.activity, locationName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Plan
                </label>
                <textarea
                  rows={2}
                  value={editingActivity.activity.description}
                  onChange={(e) =>
                    setEditingActivity({
                      ...editingActivity,
                      activity: { ...editingActivity.activity, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Pro Tip / Note
                </label>
                <input
                  type="text"
                  value={editingActivity.activity.highlightTip || ''}
                  onChange={(e) =>
                    setEditingActivity({
                      ...editingActivity,
                      activity: { ...editingActivity.activity, highlightTip: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setEditingActivity(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Stop Modal */}
      {newActivityDay !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-500" />
                Add New Stop on Day {newActivityDay}
              </h3>
              <button
                onClick={() => setNewActivityDay(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Time of Day
                  </label>
                  <select
                    value={newActivityData.timeOfDay}
                    onChange={(e) =>
                      setNewActivityData({
                        ...newActivityData,
                        timeOfDay: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:30 AM"
                    value={newActivityData.timeSlot}
                    onChange={(e) =>
                      setNewActivityData({ ...newActivityData, timeSlot: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Kayaking at Palolem"
                  value={newActivityData.title}
                  onChange={(e) =>
                    setNewActivityData({ ...newActivityData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Palolem North Point"
                  value={newActivityData.locationName}
                  onChange={(e) =>
                    setNewActivityData({ ...newActivityData, locationName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What to see and do..."
                  value={newActivityData.description}
                  onChange={(e) =>
                    setNewActivityData({ ...newActivityData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setNewActivityDay(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewActivity}
                disabled={!newActivityData.title.trim()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Modify with AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Modify Itinerary with AI
              </h3>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tell RoamVoice how you want to adjust your trip (e.g. &ldquo;Add a sunset dinner at Dropadi on Day 1&rdquo;, &ldquo;Add 1 more night in Mandrem&rdquo;, or &ldquo;Include a boat dolphin trip&rdquo;):
            </p>

            <textarea
              rows={3}
              value={aiInstruction}
              onChange={(e) => setAiInstruction(e.target.value)}
              placeholder="e.g. 'I want to add a morning dolphin trip in Palolem on day 2 and replace the museum with beach relaxing...'"
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRunAiModify}
                disabled={!aiInstruction.trim() || isAIModifying}
                className="flex items-center gap-2 px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 cursor-pointer"
              >
                {isAIModifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Modifying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Apply Modification</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
