import React, { useState } from 'react';
import { TripItinerary } from '../types/travel';
import { downloadOfflineGuideHtml, exportGpxRoute } from '../utils/storage';
import {
  Download,
  WifiOff,
  FileText,
  Map,
  CheckCircle,
  AlertTriangle,
  Briefcase,
  Compass,
  Smartphone,
  Share2,
  Check,
} from 'lucide-react';

interface OfflineTravelerPackProps {
  trip: TripItinerary;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  onSaveOffline: () => void;
}

export const OfflineTravelerPack: React.FC<OfflineTravelerPackProps> = ({
  trip,
  isOfflineMode,
  onToggleOfflineMode,
  onSaveOffline,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadHtml = () => {
    downloadOfflineGuideHtml(trip);
    setDownloadSuccess('html');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleExportGpx = () => {
    exportGpxRoute(trip);
    setDownloadSuccess('gpx');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Offline Status & Control Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Offline Traveler Ready
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Offline Travel Kit & Map Access
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Travel abroad without international roaming or through remote tunnels. This trip and all route maps are stored directly on your device.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleOfflineMode}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isOfflineMode
                  ? 'bg-amber-600 text-white shadow-amber-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              <span>{isOfflineMode ? 'Exit Offline Simulation' : 'Simulate Offline Mode'}</span>
            </button>

            <button
              onClick={onSaveOffline}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Save Trip to Device</span>
            </button>
          </div>
        </div>

        {/* Download Standalone Offline Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* HTML Standalone Guide */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Standalone Offline Guide (.html)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                A single self-contained travel file. Open it on any iPhone, Android, or laptop in Airplane Mode. Contains interactive offline vector maps, schedules, food lists, and printable styling.
              </p>
            </div>

            <button
              onClick={handleDownloadHtml}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {downloadSuccess === 'html' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Downloaded Offline Guide!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Offline Travel File</span>
                </>
              )}
            </button>
          </div>

          {/* GPX Navigation Route */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                GPS Route File (.gpx)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Standard route and waypoints file. Import directly into offline GPS apps like Maps.me, Organic Maps, OsmAnd, Garmin, or Google Earth for live turn-by-turn navigation without data.
              </p>
            </div>

            <button
              onClick={handleExportGpx}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {downloadSuccess === 'gpx' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Exported GPX File!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export GPX GPS Route</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Offline Traveler Tips & Packing Kit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offline Traveler Field Survival Tips */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Smartphone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Offline Transit & Navigation Advice
            </h4>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {trip.offlineTravelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 text-[11px] font-bold items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Route Packing Essentials */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Briefcase className="w-5 h-5 text-amber-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Packing Checklist for this Route
            </h4>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {trip.packingEssentials.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <strong>Optimal Timing:</strong> {trip.bestSeason}
          </div>
        </div>
      </div>
    </div>
  );
};
