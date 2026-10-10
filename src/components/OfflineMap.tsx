import React, { useRef, useEffect, useState, useMemo } from 'react';
import { TripItinerary, InterCityLeg } from '../types/travel';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Download,
  Wifi,
  WifiOff,
  Navigation,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  PhoneCall,
  User,
  Car,
} from 'lucide-react';

interface OfflineMapProps {
  trip: TripItinerary;
  selectedDay?: number | null;
  onSelectDay?: (dayNumber: number) => void;
  isOfflineMode?: boolean;
  theme?: 'dark' | 'light';
}

export const OfflineMap: React.FC<OfflineMapProps> = ({
  trip,
  selectedDay,
  onSelectDay,
  isOfflineMode = false,
  theme = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [activePin, setActivePin] = useState<{
    city: string;
    dayNumber: number;
    title: string;
    lat: number;
    lng: number;
    activitiesCount: number;
    stay: string;
  } | null>(null);

  // Unique cities list with coordinates
  const uniqueCityPins = useMemo(() => {
    const list: Array<{
      city: string;
      dayNumber: number;
      title: string;
      lat: number;
      lng: number;
      activitiesCount: number;
      stay: string;
      order: number;
    }> = [];

    const seen = new Set<string>();
    let orderCounter = 1;

    trip.days.forEach((day) => {
      if (!seen.has(day.city)) {
        seen.add(day.city);
        list.push({
          city: day.city,
          dayNumber: day.dayNumber,
          title: day.title,
          lat: day.lat,
          lng: day.lng,
          activitiesCount: day.activities?.length || 0,
          stay: day.stayRecommendation,
          order: orderCounter++,
        });
      }
    });

    return list;
  }, [trip]);

  // Calculate bounding box for auto-centering
  const bounds = useMemo(() => {
    if (uniqueCityPins.length === 0) {
      return { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 };
    }
    let minLat = 90,
      maxLat = -90,
      minLng = 180,
      maxLng = -180;

    uniqueCityPins.forEach((p) => {
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
      if (p.lng < minLng) minLng = p.lng;
      if (p.lng > maxLng) maxLng = p.lng;
    });

    const spanLat = Math.max(0.3, maxLat - minLat);
    const spanLng = Math.max(0.3, maxLng - minLng);
    const padLat = spanLat * 0.28;
    const padLng = spanLng * 0.28;

    return {
      minLat: minLat - padLat,
      maxLat: maxLat + padLat,
      minLng: minLng - padLng,
      maxLng: maxLng + padLng,
    };
  }, [uniqueCityPins]);

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActivePin(null);
  };

  const gpsToCanvas = (lat: number, lng: number, width: number, height: number) => {
    const latSpan = bounds.maxLat - bounds.minLat || 1;
    const lngSpan = bounds.maxLng - bounds.minLng || 1;

    const normX = (lng - bounds.minLng) / lngSpan;
    const normY = 1 - (lat - bounds.minLat) / latSpan;

    const innerW = width * 0.82;
    const innerH = height * 0.78;
    const originX = width * 0.09;
    const originY = height * 0.11;

    let x = originX + normX * innerW;
    let y = originY + normY * innerH;

    const centerX = width / 2;
    const centerY = height / 2;
    x = centerX + (x - centerX) * zoom + pan.x;
    y = centerY + (y - centerY) * zoom + pan.y;

    return { x, y };
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const isDark = theme === 'dark';

    // Map Background styling based on Light or Dark Mode matching Image 1
    if (isDark) {
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#091528');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
    } else {
      // Light mode street map background matching Image 1
      ctx.fillStyle = '#edf2f7';
    }
    ctx.fillRect(0, 0, w, h);

    // Map grid lines
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1 * dpr;
    const gridSize = 60 * dpr * zoom;
    const startX = (w / 2 + pan.x * dpr) % gridSize;
    const startY = (h / 2 + pan.y * dpr) % gridSize;

    for (let x = startX; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = startY; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Topographical landmass contour simulation
    ctx.fillStyle = isDark ? 'rgba(30, 58, 95, 0.22)' : 'rgba(186, 230, 253, 0.35)';
    ctx.beginPath();
    uniqueCityPins.forEach((pin) => {
      const pt = gpsToCanvas(pin.lat, pin.lng, w, h);
      const rad = 135 * dpr * Math.sqrt(zoom);
      ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
    });
    ctx.fill();

    // 1. DRAW ROUTE LEGS
    if (trip.interCityLegs && trip.interCityLegs.length > 0) {
      trip.interCityLegs.forEach((leg) => {
        const p1 = gpsToCanvas(leg.fromCoords.lat, leg.fromCoords.lng, w, h);
        const p2 = gpsToCanvas(leg.toCoords.lat, leg.toCoords.lng, w, h);

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const curveOffset = Math.min(dist * 0.12, 35 * dpr * zoom);
        const normalX = -dy / dist;
        const normalY = dx / dist;
        const ctrlX = midX + normalX * curveOffset;
        const ctrlY = midY + normalY * curveOffset;

        // Outer glow
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)';
        ctx.lineWidth = 14 * dpr;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, p2.x, p2.y);
        ctx.stroke();

        // Main Route Line
        const isHoveredLeg = hoveredCity === leg.fromCity || hoveredCity === leg.toCity;
        ctx.strokeStyle = isHoveredLeg ? '#38bdf8' : isDark ? '#0284c7' : '#0369a1';
        ctx.lineWidth = (isHoveredLeg ? 5 : 3.5) * dpr;
        ctx.setLineDash([10 * dpr, 6 * dpr]);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Badge on curve midpoint
        const label = `${leg.distanceKm} km • ${leg.estimatedDuration}`;
        ctx.font = `600 ${11 * dpr}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`;
        const textWidth = ctx.measureText(label).width;
        const padX = 8 * dpr;
        const padY = 4 * dpr;

        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)';
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        const rx = ctrlX - textWidth / 2 - padX;
        const ry = ctrlY - 8 * dpr - padY;
        const rw = textWidth + padX * 2;
        const rh = 16 * dpr + padY * 2;
        ctx.roundRect(rx, ry, rw, rh, 10 * dpr);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDark ? '#e0f2fe' : '#0369a1';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, ctrlX, ctrlY + 1 * dpr);
      });
    }

    // 2. DRAW CITY PINS matching Image 1
    uniqueCityPins.forEach((pin) => {
      const pt = gpsToCanvas(pin.lat, pin.lng, w, h);
      const isSelected = selectedDay === pin.dayNumber;
      const isHovered = hoveredCity === pin.city;
      const isActive = activePin?.city === pin.city;

      const pinRadius = (isSelected || isHovered || isActive ? 16 : 13) * dpr;

      // Glow ring
      if (isSelected || isHovered || isActive) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pinRadius + 8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer pin circle
      ctx.fillStyle = isSelected ? '#f59e0b' : '#0284c7';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pinRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner disc
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pinRadius - 3.5 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Number badge
      ctx.fillStyle = isSelected ? '#b45309' : '#0369a1';
      ctx.font = `bold ${11 * dpr}px -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pin.order.toString(), pt.x, pt.y);

      // Callout box matching Image 1's "34956 Tuzla / Istanbul..." label!
      const cityName = pin.city;
      ctx.font = `bold ${12 * dpr}px -apple-system, sans-serif`;
      const nameWidth = ctx.measureText(cityName).width;

      const boxX = pt.x - nameWidth / 2 - 8 * dpr;
      const boxY = pt.y + pinRadius + 6 * dpr;
      const boxW = nameWidth + 16 * dpr;
      const boxH = 22 * dpr;

      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = isSelected
        ? '#f59e0b'
        : isDark
        ? 'rgba(255, 255, 255, 0.25)'
        : 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 8 * dpr);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSelected ? (isDark ? '#fef08a' : '#b45309') : isDark ? '#ffffff' : '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cityName, pt.x, boxY + boxH / 2);
    });

    // 3. Compass Rose
    const compassX = w - 45 * dpr;
    const compassY = 45 * dpr;
    ctx.save();
    ctx.translate(compassX, compassY);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(0, -16 * dpr);
    ctx.lineTo(5 * dpr, 0);
    ctx.lineTo(-5 * dpr, 0);
    ctx.fill();

    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.beginPath();
    ctx.moveTo(0, 16 * dpr);
    ctx.lineTo(5 * dpr, 0);
    ctx.lineTo(-5 * dpr, 0);
    ctx.fill();

    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.font = `bold ${10 * dpr}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('N', 0, -20 * dpr);
    ctx.restore();
  }, [trip, selectedDay, hoveredCity, activePin, zoom, pan, bounds, uniqueCityPins, theme]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clickX = (e.clientX - rect.left) * dpr;
    const clickY = (e.clientY - rect.top) * dpr;

    let foundPin: any = null;
    uniqueCityPins.forEach((pin) => {
      const pt = gpsToCanvas(pin.lat, pin.lng, canvas.width, canvas.height);
      const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
      if (dist <= 26 * dpr) {
        foundPin = pin;
      }
    });

    if (foundPin) {
      setActivePin(foundPin);
      if (onSelectDay) onSelectDay(foundPin.dayNumber);
    } else {
      setActivePin(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mx = (e.clientX - rect.left) * dpr;
    const my = (e.clientY - rect.top) * dpr;

    let hit = false;
    uniqueCityPins.forEach((pin) => {
      const pt = gpsToCanvas(pin.lat, pin.lng, canvas.width, canvas.height);
      if (Math.hypot(mx - pt.x, my - pt.y) <= 26 * dpr) {
        hit = true;
        setHoveredCity(pin.city);
      }
    });
    if (!hit && hoveredCity) setHoveredCity(null);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${trip.tripTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-map.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Extract first leg for the bottom floating card strictly modeled after Image 1!
  const firstLeg = trip.interCityLegs?.[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] sm:min-h-[640px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl select-none"
    >
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Mode Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-lg">
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-700 dark:text-amber-300">100% Offline Vector Map</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-300">Live Cached Offline Map</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Map Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-2xl p-1 shadow-lg">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.3, 4.5))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z / 1.3, 0.6))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
            <button
              onClick={handleResetView}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleDownloadSnapshot}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl text-xs font-bold shadow-lg transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Map Image</span>
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Floating Bottom Trip / Courier Card strictly inspired by Image 1! */}
      {firstLeg && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20 pointer-events-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left Courier/Driver Info */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Transit Route • {trip.cities[0]} ➔ {trip.cities[trip.cities.length - 1]}
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {firstLeg.fromCity} ➔ {firstLeg.toCity}
                </h4>
              </div>
            </div>

            {/* Middle Stats Grid matching Image 1 */}
            <div className="flex items-center gap-6 sm:gap-10 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">From</span>
                <span className="font-bold text-slate-900 dark:text-white">{firstLeg.fromCity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">To</span>
                <span className="font-bold text-slate-900 dark:text-white">{firstLeg.toCity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold">Time in transit</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{firstLeg.estimatedDuration}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-400 block text-[11px] font-semibold">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                  • Optimized Route
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => onSelectDay?.(1)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected City Floating Card Popup */}
      {activePin && (
        <div className="absolute top-20 right-4 sm:right-6 sm:max-w-xs z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-sky-500/50 rounded-2xl p-4 shadow-2xl text-slate-900 dark:text-white animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <div>
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Day {activePin.dayNumber} Stop
              </span>
              <h4 className="text-base font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                {activePin.city}
              </h4>
            </div>
            <button
              onClick={() => setActivePin(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
            {activePin.title}
          </p>

          <div className="text-xs bg-slate-50 dark:bg-slate-800/80 rounded-xl p-2.5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 mb-3">
            <span className="font-semibold text-amber-600 dark:text-amber-300">Stay Area:</span>{' '}
            {activePin.stay}
          </div>

          {onSelectDay && (
            <button
              onClick={() => onSelectDay(activePin.dayNumber)}
              className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              View Day {activePin.dayNumber} Itinerary
            </button>
          )}
        </div>
      )}
    </div>
  );
};
