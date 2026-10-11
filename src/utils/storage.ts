import { TripItinerary, WishlistItem } from '../types/travel';
import { CURATED_TRIPS } from '../data/curatedTrips';

const CURRENT_TRIP_KEY = 'roamvoice_active_trip_v3';
const SAVED_TRIPS_KEY = 'roamvoice_saved_trips_v3';
const OFFLINE_PACK_KEY = 'roamvoice_offline_packs_v3';
const WISHLIST_KEY = 'roamvoice_wishlist_v3';
const THEME_KEY = 'roamvoice_theme';

const DEFAULT_WISHLIST: WishlistItem[] = [
  {
    id: 'wish_1',
    title: 'Sunset Kayaking in Palolem Crescent Bay',
    location: 'Palolem Beach, South Goa',
    notes: 'Rent kayak at 5 PM to watch sunset from the ocean and see gentle dolphins',
    suggestedNights: 2,
    category: 'Beach',
    dateAdded: '2024-04-01'
  },
  {
    id: 'wish_2',
    title: 'Peaceful Bamboo Huts over River Inlet',
    location: 'Mandrem Beach, North Goa',
    notes: 'Walk across wooden footbridge to serene quiet beaches with zero crowds',
    suggestedNights: 2,
    category: 'Beach',
    dateAdded: '2024-04-02'
  },
  {
    id: 'wish_3',
    title: 'Cabo de Rama Portuguese Fortress Clifftop',
    location: 'Betul, South Goa',
    notes: 'Dramatic 180° cliffside ocean panorama en route between South and North Goa',
    category: 'Scenic Drive',
    dateAdded: '2024-04-03'
  },
  {
    id: 'wish_4',
    title: 'Candlelit Seafood Dinner at Dropadi Beach Shack',
    location: 'Palolem Beach, South Goa',
    notes: 'Fresh grilled kingfish with garlic butter and warm poi bread on the sand',
    category: 'Food & Drinks',
    dateAdded: '2024-04-04'
  }
];

export function getWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(DEFAULT_WISHLIST));
      return DEFAULT_WISHLIST;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get wishlist', e);
    return DEFAULT_WISHLIST;
  }
}

export function saveWishlistItem(item: WishlistItem): WishlistItem[] {
  try {
    const list = getWishlist();
    const existingIdx = list.findIndex(w => w.id === item.id);
    if (existingIdx >= 0) {
      list[existingIdx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    return list;
  } catch (e) {
    console.error('Failed to save wishlist item', e);
    return getWishlist();
  }
}

export function deleteWishlistItem(id: string): WishlistItem[] {
  try {
    const list = getWishlist().filter(w => w.id !== id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    return list;
  } catch (e) {
    console.error('Failed to delete wishlist item', e);
    return [];
  }
}

export function getStoredTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {}
  return 'dark'; // Default to sleek dark mode
}

export function setStoredTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

export function getSavedTrips(): TripItinerary[] {
  try {
    const raw = localStorage.getItem(SAVED_TRIPS_KEY);
    if (!raw) {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(CURATED_TRIPS));
      return CURATED_TRIPS;
    }
    const trips = JSON.parse(raw);
    return Array.isArray(trips) ? trips : CURATED_TRIPS;
  } catch (e) {
    console.error('Failed to read saved trips from localStorage', e);
    return CURATED_TRIPS;
  }
}

export function saveTrip(trip: TripItinerary): void {
  try {
    const currentList = getSavedTrips();
    const existingIndex = currentList.findIndex((t) => t.id === trip.id);
    const updatedTrip = { ...trip, isSavedOffline: true };

    if (existingIndex >= 0) {
      currentList[existingIndex] = updatedTrip;
    } else {
      currentList.unshift(updatedTrip);
    }

    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(currentList));
    localStorage.setItem(CURRENT_TRIP_KEY, JSON.stringify(updatedTrip));
  } catch (e) {
    console.error('Failed to save trip to localStorage', e);
  }
}

export function deleteSavedTrip(tripId: string): TripItinerary[] {
  try {
    const currentList = getSavedTrips().filter((t) => t.id !== tripId);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(currentList));
    return currentList;
  } catch (e) {
    console.error('Failed to delete saved trip', e);
    return [];
  }
}

export function getActiveTrip(): TripItinerary {
  try {
    const current = localStorage.getItem(CURRENT_TRIP_KEY);
    if (current) {
      return JSON.parse(current);
    }
  } catch (e) {
    console.error('Failed to parse current trip', e);
  }
  const saved = getSavedTrips();
  return saved[0] || CURATED_TRIPS[0];
}

export function setActiveTrip(trip: TripItinerary): void {
  try {
    localStorage.setItem(CURRENT_TRIP_KEY, JSON.stringify(trip));
  } catch (e) {
    console.error('Failed to set active trip', e);
  }
}

/**
 * Generates and downloads a self-contained offline HTML travel dossier
 * Contains interactive offline map, full itinerary, contact sheet, and printable styling.
 */
export function downloadOfflineGuideHtml(trip: TripItinerary): void {
  const citiesJson = JSON.stringify(trip.cities);
  const legsJson = JSON.stringify(trip.interCityLegs);
  const daysJson = JSON.stringify(trip.days);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(trip.tripTitle)} - Offline Travel Guide</title>
  <style>
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --accent: #f59e0b;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 16px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 9999px;
      background: #e0f2fe;
      color: #0369a1;
      margin-bottom: 8px;
    }
    .header {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid var(--border);
    }
    h1 { font-size: 26px; color: #0f172a; margin-bottom: 8px; }
    .subtitle { color: var(--text-muted); font-size: 15px; margin-bottom: 16px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .stat-card {
      background: #f1f5f9;
      padding: 12px;
      border-radius: 10px;
    }
    .stat-label { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
    .stat-val { font-size: 16px; font-weight: 700; color: #0369a1; margin-top: 2px; }

    /* Offline Vector Map */
    .map-box {
      background: #0f172a;
      border-radius: 16px;
      padding: 20px;
      color: white;
      margin-bottom: 24px;
      border: 1px solid #334155;
    }
    .map-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .map-canvas-wrap {
      position: relative;
      width: 100%;
      height: 380px;
      background: #1e293b;
      border-radius: 12px;
      overflow: hidden;
    }
    canvas { width: 100%; height: 100%; display: block; }
    
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin: 28px 0 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Day Cards */
    .day-card {
      background: var(--card-bg);
      border-radius: 14px;
      border: 1px solid var(--border);
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .day-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .day-num { font-size: 14px; font-weight: 700; color: var(--primary); }
    .day-city { font-size: 13px; font-weight: 600; background: #f8fafc; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0; }
    .activity-row {
      margin-bottom: 14px;
      padding-left: 14px;
      border-left: 3px solid #38bdf8;
    }
    .activity-time { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0284c7; }
    .activity-name { font-size: 15px; font-weight: 600; color: #1e293b; }
    .activity-desc { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
    .tip-box {
      font-size: 12px;
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 8px 12px;
      border-radius: 4px;
      margin-top: 6px;
      color: #92400e;
    }
    .food-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 13px;
      color: #166534;
      margin-top: 12px;
    }

    /* Legs view */
    .leg-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .leg-cities {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .leg-meta {
      display: flex;
      gap: 16px;
      font-size: 13px;
      color: var(--text-muted);
      margin: 8px 0;
    }

    /* Print styling */
    @media print {
      body { background: white; padding: 0; }
      .header, .map-box, .day-card, .leg-card { border: 1px solid #ccc; box-shadow: none; break-inside: avoid; }
      .map-canvas-wrap { height: 260px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">OFFLINE TRAVEL PACKET • ROAMVOICE</span>
      <h1>${escapeHtml(trip.tripTitle)}</h1>
      <p class="subtitle">${escapeHtml(trip.summary)}</p>
      <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 12px; font-size: 13px; color: #166534; margin-top: 10px;">
        <strong>Route Efficiency:</strong> ${escapeHtml(trip.efficiencyExplanation)}
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Duration</div>
          <div class="stat-val">${trip.totalDays} Days</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Distance</div>
          <div class="stat-val">${trip.totalDistanceKm} km (${trip.totalDistanceMiles} mi)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Transit Time</div>
          <div class="stat-val">${escapeHtml(trip.totalEstimatedTransitTime)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Best Season</div>
          <div class="stat-val" style="font-size: 13px;">${escapeHtml(trip.bestSeason)}</div>
        </div>
      </div>
    </div>

    <!-- Offline Vector Map -->
    <div class="map-box">
      <div class="map-header">
        <div>
          <h2 style="font-size: 17px; font-weight: 700;">Offline Route Map</h2>
          <p style="font-size: 12px; color: #94a3b8;">100% vector rendered on-device with zero internet connection</p>
        </div>
        <span style="font-size: 12px; background: #0284c7; color: white; padding: 3px 8px; border-radius: 6px; font-weight: 600;">Offline Active</span>
      </div>
      <div class="map-canvas-wrap">
        <canvas id="offlineCanvas"></canvas>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; font-size: 12px; color: #cbd5e1;">
        <span><strong>Route:</strong> ${trip.cities.join(' ➔ ')}</span>
      </div>
    </div>

    <!-- Inter-City Transit Routes -->
    <h2 class="section-title">🚆 Inter-City Transit & Navigation Legs</h2>
    ${trip.interCityLegs
      .map(
        (leg, idx) => `
      <div class="leg-card">
        <div class="leg-cities">
          <span>Leg ${idx + 1}: ${escapeHtml(leg.fromCity)}</span>
          <span style="color: #0284c7;">➔</span>
          <span>${escapeHtml(leg.toCity)}</span>
          <span style="font-size: 12px; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: auto;">${escapeHtml(leg.recommendedTransport)}</span>
        </div>
        <div class="leg-meta">
          <span>⏱️ <strong>${escapeHtml(leg.estimatedDuration)}</strong></span>
          <span>📏 <strong>${leg.distanceKm} km</strong> (${leg.distanceMiles} mi)</span>
        </div>
        <p style="font-size: 13px; color: #334155; margin-bottom: 6px;"><strong>Navigation:</strong> ${escapeHtml(leg.navigationNotes)}</p>
        <p style="font-size: 12px; color: #64748b;"><strong>Efficiency Factor:</strong> ${escapeHtml(leg.efficiencyReason)}</p>
        ${
          leg.routeHighlights && leg.routeHighlights.length > 0
            ? `<div style="font-size: 12px; color: #0369a1; margin-top: 6px;"><strong>Highlights along way:</strong> ${leg.routeHighlights.map(escapeHtml).join(' • ')}</div>`
            : ''
        }
      </div>
    `
      )
      .join('')}

    <!-- Daily Itinerary -->
    <h2 class="section-title">📋 Day-by-Day Schedule</h2>
    ${trip.days
      .map(
        (d) => `
      <div class="day-card">
        <div class="day-top">
          <div>
            <span class="day-num">DAY ${d.dayNumber}</span>
            <h3 style="font-size: 18px; font-weight: 700; margin-top: 2px;">${escapeHtml(d.title)}</h3>
          </div>
          <span class="day-city">📍 ${escapeHtml(d.city)}, ${escapeHtml(d.country)}</span>
        </div>
        <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">${escapeHtml(d.summary)}</p>
        
        <div>
          ${d.activities
            .map(
              (act) => `
            <div class="activity-row">
              <div class="activity-time">${escapeHtml(act.timeOfDay)} • ${act.durationHours} hrs</div>
              <div class="activity-name">${escapeHtml(act.title)}</div>
              <div style="font-size: 12px; color: #0284c7; font-weight: 500;">📍 ${escapeHtml(act.locationName)}</div>
              <div class="activity-desc">${escapeHtml(act.description)}</div>
              ${
                act.highlightTip
                  ? `<div class="tip-box">💡 <strong>Pro Tip:</strong> ${escapeHtml(act.highlightTip)}</div>`
                  : ''
              }
            </div>
          `
            )
            .join('')}
        </div>

        <div style="font-size: 13px; color: #334155; margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--border);">
          <strong>Stay District:</strong> ${escapeHtml(d.stayRecommendation)}
        </div>

        <div class="food-box">
          <strong>🍽️ Local Food to Taste:</strong> ${d.localFoodToTry.map(escapeHtml).join(', ')}
        </div>
      </div>
    `
      )
      .join('')}

    <!-- Offline Survival Tips -->
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin-top: 24px;">
      <h3 style="font-size: 16px; font-weight: 700; color: #92400e; margin-bottom: 10px;">📶 Offline Traveler Field Tips</h3>
      <ul style="padding-left: 20px; font-size: 13px; color: #78350f; line-height: 1.6;">
        ${trip.offlineTravelTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
      </ul>
    </div>
  </div>

  <script>
    // Offline Vector Map Canvas Renderer
    (function() {
      var canvas = document.getElementById('offlineCanvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var legs = ${legsJson};
      var days = ${daysJson};

      function resize() {
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        render();
      }

      function render() {
        if (!days || days.length === 0) return;
        var w = canvas.width;
        var h = canvas.height;

        // Background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (var x = 0; x < w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (var y = 0; y < h; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Compute bounding box
        var minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
        days.forEach(function(d) {
          if (d.lat < minLat) minLat = d.lat;
          if (d.lat > maxLat) maxLat = d.lat;
          if (d.lng < minLng) minLng = d.lng;
          if (d.lng > maxLng) maxLng = d.lng;
        });

        var padX = Math.max(0.5, (maxLng - minLng) * 0.2);
        var padY = Math.max(0.5, (maxLat - minLat) * 0.2);
        minLng -= padX; maxLng += padX;
        minLat -= padY; maxLat += padY;

        function toPx(lat, lng) {
          var x = ((lng - minLng) / (maxLng - minLng)) * (w - 120) + 60;
          var y = h - (((lat - minLat) / (maxLat - minLat)) * (h - 120) + 60);
          return { x: x, y: y };
        }

        // Draw Route Lines
        if (legs && legs.length > 0) {
          legs.forEach(function(leg) {
            var p1 = toPx(leg.fromCoords.lat, leg.fromCoords.lng);
            var p2 = toPx(leg.toCoords.lat, leg.toCoords.lng);

            // Glow line
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Main line
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          });
        }

        // Draw Waypoint pins
        var seenCities = {};
        var pinIdx = 1;
        days.forEach(function(d) {
          if (seenCities[d.city]) return;
          seenCities[d.city] = true;
          var pt = toPx(d.lat, d.lng);

          // Outer circle
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
          ctx.fill();

          // Index
          ctx.fillStyle = '#0369a1';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pinIdx + '', pt.x, pt.y);

          // City Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(d.city, pt.x, pt.y + 24);

          pinIdx++;
        });
      }

      window.addEventListener('resize', resize);
      setTimeout(resize, 100);
    })();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${trip.tripTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-offline-guide.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports GPX route data for offline GPS apps
 */
export function exportGpxRoute(trip: TripItinerary): void {
  const waypoints = trip.days
    .map(
      (d) => `  <wpt lat="${d.lat}" lon="${d.lng}">
    <name>${escapeXml(d.city)} - Day ${d.dayNumber}</name>
    <desc>${escapeXml(d.title)}: ${escapeXml(d.summary)}</desc>
  </wpt>`
    )
    .join('\n');

  const routePoints = trip.days
    .map(
      (d) => `    <rtept lat="${d.lat}" lon="${d.lng}">
      <name>${escapeXml(d.city)}</name>
    </rtept>`
    )
    .join('\n');

  const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="RoamVoice" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${escapeXml(trip.tripTitle)}</name>
    <desc>${escapeXml(trip.summary)}</desc>
  </metadata>
${waypoints}
  <rte>
    <name>${escapeXml(trip.tripTitle)}</name>
${routePoints}
  </rte>
</gpx>`;

  const blob = new Blob([gpxContent], { type: 'application/gpx+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${trip.tripTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-route.gpx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
