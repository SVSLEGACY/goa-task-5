/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TripItinerary, WishlistItem } from './types/travel';
import { SAMPLE_TRIPS } from './data/sampleTrips';
import {
  getActiveTrip,
  setActiveTrip,
  getSavedTrips,
  saveTrip,
  deleteSavedTrip,
  getWishlist,
  saveWishlistItem,
  deleteWishlistItem,
  getStoredTheme,
  setStoredTheme,
  downloadOfflineGuideHtml,
} from './utils/storage';
import { BentoDashboard } from './components/BentoDashboard';
import { BoardingPassModal } from './components/BoardingPassModal';
import { VoiceInputBar } from './components/VoiceInputBar';
import { OfflineMap } from './components/OfflineMap';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { TaxiTransfersView } from './components/TaxiTransfersView';
import { FlightsHotelsView } from './components/FlightsHotelsView';
import { WishlistView } from './components/WishlistView';
import { OfflineTravelerPack } from './components/OfflineTravelerPack';
import { SavedTripsModal } from './components/SavedTripsModal';
import {
  Home,
  Map as MapIcon,
  Calendar,
  Car,
  Plane,
  Heart,
  Sun,
  Moon,
  PlusCircle,
  Download,
  Wifi,
  WifiOff,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  GitBranch,
  User,
  Compass,
  FolderHeart,
  Grid,
} from 'lucide-react';

export default function App() {
  const [currentTrip, setCurrentTrip] = useState<TripItinerary>(getActiveTrip());
  const [savedTrips, setSavedTrips] = useState<TripItinerary[]>(getSavedTrips());
  const [wishlist, setWishlist] = useState<WishlistItem[]>(getWishlist());
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme());

  // Active view
  const [activeTab, setActiveTab] = useState<'bento' | 'map' | 'itinerary' | 'taxis' | 'flights' | 'wishlist' | 'offline' | 'voice'>('bento');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isNetworkOnline, setIsNetworkOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Boarding Pass Modal state (Image 1)
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAIModifying, setIsAIModifying] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Apply dark class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setStoredTheme(theme);
  }, [theme]);

  // Network listeners & Service Worker
  useEffect(() => {
    const handleOnline = () => {
      setIsNetworkOnline(true);
      showToast('Network online. Live map caching active.');
    };
    const handleOffline = () => {
      setIsNetworkOnline(false);
      setIsOfflineMode(true);
      showToast('Offline mode active - 100% vector map on device.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.warn);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  // Generate Itinerary with Gemini API
  const handleGenerateItinerary = async (promptText: string) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const newTrip: TripItinerary = await response.json();
      setCurrentTrip(newTrip);
      setActiveTrip(newTrip);
      saveTrip(newTrip);
      setSavedTrips(getSavedTrips());
      setSelectedDay(null);
      setActiveTab('bento');
      showToast(`Trip created: "${newTrip.tripTitle}"!`);
    } catch (err: any) {
      console.error('Failed to generate trip:', err);
      setApiError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Modify current trip with AI
  const handleModifyWithAI = async (editInstruction: string) => {
    setIsAIModifying(true);
    setApiError(null);

    try {
      const response = await fetch('/api/itinerary/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentTrip, editInstruction }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const updated: TripItinerary = await response.json();
      setCurrentTrip(updated);
      setActiveTrip(updated);
      saveTrip(updated);
      setSavedTrips(getSavedTrips());
      showToast('Itinerary modified successfully!');
    } catch (err: any) {
      console.error('Failed to modify trip:', err);
      showToast('Could not modify with AI. You can edit items manually.');
    } finally {
      setIsAIModifying(false);
    }
  };

  const handleUpdateTrip = (updated: TripItinerary) => {
    setCurrentTrip(updated);
    setActiveTrip(updated);
    saveTrip(updated);
    setSavedTrips(getSavedTrips());
  };

  const handleSelectTrip = (trip: TripItinerary) => {
    setCurrentTrip(trip);
    setActiveTrip(trip);
    setSelectedDay(null);
    showToast(`Loaded "${trip.tripTitle}"`);
  };

  const handleDeleteTrip = (tripId: string) => {
    const updated = deleteSavedTrip(tripId);
    setSavedTrips(updated);
    if (currentTrip.id === tripId) {
      const fallback = updated[0] || SAMPLE_TRIPS[0];
      setCurrentTrip(fallback);
      setActiveTrip(fallback);
    }
    showToast('Trip removed.');
  };

  // Wishlist handlers
  const handleAddWishlistItem = (item: WishlistItem) => {
    const updated = saveWishlistItem(item);
    setWishlist(updated);
    showToast(`Added "${item.title}" to Wishlist!`);
  };

  const handleDeleteWishlistItem = (id: string) => {
    const updated = deleteWishlistItem(id);
    setWishlist(updated);
    showToast('Removed from Wishlist.');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 dark:bg-black text-slate-100 font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. FLOATING PILL SIDEBAR strictly matching Image 2 Left Navigation Rail */}
      <aside className="w-16 sm:w-20 flex flex-col items-center py-5 justify-between shrink-0 z-30 select-none bg-slate-950/80 dark:bg-black/90 backdrop-blur-xl border-r border-slate-800/80">
        {/* Top: Compass / Star Circular Button matching Image 2 */}
        <button
          onClick={() => setActiveTab('bento')}
          className="w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
          title="Home / Bento Dashboard"
        >
          <Compass className="w-5 h-5 text-sky-400" />
        </button>

        {/* Central Floating Pill Container matching Image 2 */}
        <div className="flex flex-col items-center gap-1.5 p-2 rounded-full bg-slate-800/90 dark:bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-2xl">
          {/* Home icon */}
          <button
            onClick={() => setActiveTab('bento')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'bento'
                ? 'bg-white text-slate-900 shadow-md scale-105 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title="Bento Travel Dashboard"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Route / Branch icon matching Image 2 active circle */}
          <button
            onClick={() => setActiveTab('map')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'map'
                ? 'bg-white text-slate-900 shadow-md scale-105 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title="Interactive Route Map"
          >
            <GitBranch className="w-4 h-4" />
          </button>

          {/* Timeline / Itinerary icon */}
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'itinerary'
                ? 'bg-white text-slate-900 shadow-md scale-105 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title="Itinerary Timeline"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Voice AI / Sparkles icon */}
          <button
            onClick={() => setActiveTab('voice')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'voice'
                ? 'bg-white text-slate-900 shadow-md scale-105 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title="Speak / Voice Travel Route Planner"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* User / Saved Trips icon */}
          <button
            onClick={() => setIsSavedModalOpen(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isSavedModalOpen
                ? 'bg-white text-slate-900 shadow-md scale-105 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title="Previous Saved Trips"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Avatar / Theme Toggle matching Image 2 */}
        <div className="flex flex-col items-center gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Bottom user avatar circular button matching Image 2 */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Ellise S."
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE / CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 dark:bg-black text-slate-100">
        {/* Top Floating App Bar matching tablet status from Image 2 (9:41, Tue Apr 1, etc.) */}
        <header className="h-16 shrink-0 px-4 sm:px-8 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur-md flex items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-3">
            {/* Quick Switch Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('bento')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'bento' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'map' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'itinerary' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveTab('taxis')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'taxis' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Taxis
              </button>
              <button
                onClick={() => setActiveTab('flights')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'flights' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Flights
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'wishlist' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Wishlist
              </button>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Boarding Pass button matching Image 1 */}
            <button
              onClick={() => setIsBoardingPassOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600/80 to-indigo-600/80 hover:from-sky-500 hover:to-indigo-500 border border-sky-400/40 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Open Boarding Pass"
            >
              <Plane className="w-3.5 h-3.5 -rotate-45" />
              <span className="hidden sm:inline">Boarding Pass</span>
            </button>

            {/* Offline indicator */}
            <button
              onClick={() => setIsOfflineMode((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                isOfflineMode || !isNetworkOnline
                  ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              }`}
              title="Toggle offline map simulation"
            >
              {isOfflineMode || !isNetworkOnline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Offline Map Ready</span>
                  <span className="sm:hidden">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Online / Cached</span>
                  <span className="sm:hidden">Online</span>
                </>
              )}
            </button>

            {/* Speak New Trip */}
            <button
              onClick={() => setActiveTab('voice')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/30 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Speak Trip</span>
            </button>
          </div>
        </header>

        {/* Tab View Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {/* TAB 1: BENTO DASHBOARD matching Image 2 */}
          {activeTab === 'bento' && (
            <BentoDashboard
              trip={currentTrip}
              onOpenBoardingPass={() => setIsBoardingPassOpen(true)}
              onOpenMap={() => setActiveTab('map')}
              onOpenTimeline={() => setActiveTab('itinerary')}
              onOpenTaxis={() => setActiveTab('taxis')}
              onOpenFlights={() => setActiveTab('flights')}
              onEditTrip={() => setActiveTab('itinerary')}
            />
          )}

          {/* TAB 2: INTERACTIVE OFFLINE MAP */}
          {activeTab === 'map' && (
            <div className="h-full w-full min-h-[550px]">
              <OfflineMap
                trip={currentTrip}
                selectedDay={selectedDay}
                onSelectDay={(day) => {
                  setSelectedDay(day);
                  setActiveTab('itinerary');
                }}
                isOfflineMode={isOfflineMode || !isNetworkOnline}
                theme={theme}
              />
            </div>
          )}

          {/* TAB 3: TIMELINE ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <ItineraryTimeline
                trip={currentTrip}
                onUpdateTrip={handleUpdateTrip}
                onModifyWithAI={handleModifyWithAI}
                isAIModifying={isAIModifying}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            </div>
          )}

          {/* TAB 4: TAXI & TRANSFERS LOGISTICS */}
          {activeTab === 'taxis' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <TaxiTransfersView trip={currentTrip} />
            </div>
          )}

          {/* TAB 5: FLIGHTS & HOTELS */}
          {activeTab === 'flights' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <FlightsHotelsView trip={currentTrip} onUpdateTrip={handleUpdateTrip} />
            </div>
          )}

          {/* TAB 6: WISHLIST PLANNING */}
          {activeTab === 'wishlist' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <WishlistView
                wishlist={wishlist}
                onAddWishlistItem={handleAddWishlistItem}
                onDeleteWishlistItem={handleDeleteWishlistItem}
                onConvertWishlistToTrip={(summary) => handleGenerateItinerary(summary)}
              />
            </div>
          )}

          {/* TAB 7: VOICE TRIP PLANNER */}
          {activeTab === 'voice' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <VoiceInputBar
                onGenerate={handleGenerateItinerary}
                isLoading={isLoading}
                initialPrompt={currentTrip.prompt}
              />
            </div>
          )}

          {/* TAB 8: OFFLINE TRAVELER PACK */}
          {activeTab === 'offline' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <OfflineTravelerPack
                trip={currentTrip}
                isOfflineMode={isOfflineMode}
                onToggleOfflineMode={() => setIsOfflineMode((v) => !v)}
                onSaveOffline={() => {
                  saveTrip(currentTrip);
                  setSavedTrips(getSavedTrips());
                  showToast('Trip saved offline to device storage!');
                }}
              />
            </div>
          )}
        </div>
      </main>

      {/* BOARDING PASS MODAL strictly matching Image 1 */}
      <BoardingPassModal
        isOpen={isBoardingPassOpen}
        onClose={() => setIsBoardingPassOpen(false)}
        flight={currentTrip.flights?.[0]}
        passengerName="Ellise S."
        seat="14A"
        gate="B7"
      />

      {/* Saved / Previous Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        activeTripId={currentTrip.id}
        onSelectTrip={handleSelectTrip}
        onDeleteTrip={handleDeleteTrip}
      />
    </div>
  );
}
