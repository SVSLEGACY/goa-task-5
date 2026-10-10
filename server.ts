import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Itinerary generation API
app.post('/api/itinerary/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Please provide a travel description or speak your destination.' });
    }

    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add your GEMINI_API_KEY.',
      });
    }

    const systemInstruction = `You are RoamVoice, a world-class travel planner, logistics route optimization engine, and personal travel concierge.
The user speaks or types a travel idea (destinations, duration, preferences, or desires, such as "I want to visit Goa, in Palolem, Mandrem, etc. 2 nights each").
Your mission:
1. Identify all target cities, beaches, or regions mentioned. If the user specifies staying "X nights each" (e.g. 2 nights in Palolem and 2 nights in Mandrem), allocate exactly that number of nights and plan complete day AND night activities for each night!
2. ORGANIZE AND SEQUENCE THE CITIES/STOPS TO FORM THE MOST EFFICIENT, LOGICAL TRAVEL ROUTE:
   - Minimize total travel time and distance.
   - Avoid geographic zigzagging or backtracking.
3. TAXIS & TRANSIT TRANSFERS:
   - Whenever traveling between airports, cities, beaches, or regions (e.g. Goa Airport -> Palolem, Palolem -> Mandrem, Mandrem -> Airport), generate an ENTIRE LIST OF TAXIS REQUIRED in between those traveling points.
   - Include realistic estimated fares (in local currency e.g. INR ₹ or USD $), travel duration, taxi type (Pre-paid Airport Taxi, Local Cab Stand, Inter-city cab, Scooter/Bike rental), pickup advice, famous spots to stop at along the way (e.g. Cabo de Rama Fort between Palolem and north), and recommended taxi app/booth.
4. FLIGHTS & HOTELS:
   - Provide realistic sample flight ticket options/estimates for arrival and departure (with airline, estimated price, departure/arrival times).
   - Recommend authentic hotel/stay options for each destination matching the requested nights (e.g. beachfront cottages, boutique resorts) with price per night and vibe.
5. RESTAURANTS & FAMOUS SPOTS:
   - For every destination, recommend top authentic restaurants and famous spots with recommended dishes and ambiance.
6. TIMELINE & ACTIVITIES (Image 2 clean timeline style):
   - Provide precise timeSlots (e.g. '08:30 AM', '11:00 AM', '02:30 PM', '06:30 PM', '09:00 PM') and short dates (e.g. '9/04', '10/04').
   - Provide night plans for each night stayed (sunset viewpoints, beach shacks, live music, night markets, candlelit dining).
7. Offline tips & packing essentials.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Create a complete, highly optimized travel itinerary with taxi transfers, restaurants, hotels, flights, and day/night plans based on this request:
"${prompt.trim()}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripTitle: { type: Type.STRING, description: 'Catchy and descriptive title of the trip' },
            dateRange: { type: Type.STRING, description: 'Sample date range e.g. April 9th 2024 - April 14th 2024' },
            summary: { type: Type.STRING, description: '1-2 sentence executive overview of the trip' },
            totalDays: { type: Type.INTEGER, description: 'Total number of days in the itinerary' },
            cities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Ordered sequence of cities/beaches from start to finish',
            },
            efficiencyExplanation: {
              type: Type.STRING,
              description: 'Explanation of why this routing sequence is optimal and avoids backtracking',
            },
            totalDistanceKm: { type: Type.NUMBER, description: 'Total inter-city/area travel distance in kilometers' },
            totalDistanceMiles: { type: Type.NUMBER, description: 'Total inter-city/area travel distance in miles' },
            totalEstimatedTransitTime: { type: Type.STRING, description: 'Total estimated transit time (e.g. "4h 30m")' },
            bestSeason: { type: Type.STRING, description: 'Best season or months to visit' },
            packingEssentials: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Top 4-5 packing essentials',
            },
            offlineTravelTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Practical tips for traveling with limited cell service or offline maps',
            },
            taxiTransfers: {
              type: Type.ARRAY,
              description: 'List of all taxis and cabs required between arrival points, destinations, and departures',
              items: {
                type: Type.OBJECT,
                properties: {
                  fromLocation: { type: Type.STRING },
                  toLocation: { type: Type.STRING },
                  distanceKm: { type: Type.NUMBER },
                  duration: { type: Type.STRING },
                  estimatedFare: { type: Type.STRING, description: 'e.g. ₹1,800 - ₹2,200 ($25)' },
                  taxiType: { type: Type.STRING, description: 'Pre-paid Airport Taxi, Local Cab Stand, Scooter Rental, etc.' },
                  pickupAdvice: { type: Type.STRING, description: 'Where to board, negotiation tips, or pre-booking info' },
                  famousStopsOnWay: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Famous viewpoints, forts, or restaurants to stop at en route',
                  },
                  recommendedAppOrStand: { type: Type.STRING, description: 'e.g. GoaMiles counter, airport prepaid booth' },
                },
                required: ['fromLocation', 'toLocation', 'distanceKm', 'duration', 'estimatedFare', 'taxiType', 'pickupAdvice', 'recommendedAppOrStand'],
              },
            },
            flights: {
              type: Type.ARRAY,
              description: 'Flight tickets or estimated price options for arrival and departure',
              items: {
                type: Type.OBJECT,
                properties: {
                  flightNumber: { type: Type.STRING },
                  airline: { type: Type.STRING },
                  fromAirport: { type: Type.STRING },
                  toAirport: { type: Type.STRING },
                  departureTime: { type: Type.STRING },
                  arrivalTime: { type: Type.STRING },
                  date: { type: Type.STRING },
                  estimatedPrice: { type: Type.STRING },
                  bookingStatus: { type: Type.STRING, description: 'Estimated Price or Suggested' },
                  terminal: { type: Type.STRING },
                },
                required: ['flightNumber', 'airline', 'fromAirport', 'toAirport', 'departureTime', 'arrivalTime', 'date', 'estimatedPrice', 'bookingStatus'],
              },
            },
            hotels: {
              type: Type.ARRAY,
              description: 'Recommended hotel and stay options per destination',
              items: {
                type: Type.OBJECT,
                properties: {
                  hotelName: { type: Type.STRING },
                  cityOrArea: { type: Type.STRING },
                  nights: { type: Type.INTEGER },
                  pricePerNight: { type: Type.STRING },
                  vibe: { type: Type.STRING },
                  bookingStatus: { type: Type.STRING },
                  amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['hotelName', 'cityOrArea', 'nights', 'pricePerNight', 'vibe', 'bookingStatus', 'amenities'],
              },
            },
            interCityLegs: {
              type: Type.ARRAY,
              description: 'Ordered transit legs between consecutive cities/regions',
              items: {
                type: Type.OBJECT,
                properties: {
                  fromCity: { type: Type.STRING },
                  toCity: { type: Type.STRING },
                  fromCoords: {
                    type: Type.OBJECT,
                    properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                    required: ['lat', 'lng'],
                  },
                  toCoords: {
                    type: Type.OBJECT,
                    properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                    required: ['lat', 'lng'],
                  },
                  recommendedTransport: { type: Type.STRING },
                  estimatedDuration: { type: Type.STRING },
                  distanceKm: { type: Type.NUMBER },
                  distanceMiles: { type: Type.NUMBER },
                  routeHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                  navigationNotes: { type: Type.STRING },
                  efficiencyReason: { type: Type.STRING },
                },
                required: [
                  'fromCity', 'toCity', 'fromCoords', 'toCoords', 'recommendedTransport',
                  'estimatedDuration', 'distanceKm', 'distanceMiles', 'routeHighlights', 'navigationNotes', 'efficiencyReason'
                ],
              },
            },
            days: {
              type: Type.ARRAY,
              description: 'Day-by-day detailed schedule with time slots',
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  dateStr: { type: Type.STRING, description: 'e.g. 09/04' },
                  title: { type: Type.STRING },
                  city: { type: Type.STRING },
                  region: { type: Type.STRING },
                  country: { type: Type.STRING },
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER },
                  summary: { type: Type.STRING },
                  stayRecommendation: { type: Type.STRING },
                  localFoodToTry: { type: Type.ARRAY, items: { type: Type.STRING } },
                  restaurants: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        cuisine: { type: Type.STRING },
                        vibe: { type: Type.STRING },
                        recommendedDish: { type: Type.STRING },
                      },
                      required: ['name', 'cuisine', 'vibe', 'recommendedDish'],
                    },
                  },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        timeOfDay: { type: Type.STRING, description: 'Morning, Afternoon, or Evening' },
                        timeSlot: { type: Type.STRING, description: 'e.g. 08:30 AM, 11:30 AM, 06:30 PM' },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        locationName: { type: Type.STRING },
                        durationHours: { type: Type.NUMBER },
                        highlightTip: { type: Type.STRING },
                        category: { type: Type.STRING, description: 'sightseeing, restaurant, beach, transit, hotel, or activity' },
                      },
                      required: ['timeOfDay', 'timeSlot', 'title', 'description', 'locationName', 'durationHours'],
                    },
                  },
                },
                required: ['dayNumber', 'title', 'city', 'country', 'lat', 'lng', 'summary', 'stayRecommendation', 'localFoodToTry', 'activities'],
              },
            },
          },
          required: [
            'tripTitle', 'summary', 'totalDays', 'cities', 'efficiencyExplanation',
            'totalDistanceKm', 'totalDistanceMiles', 'totalEstimatedTransitTime',
            'bestSeason', 'packingEssentials', 'offlineTravelTips', 'interCityLegs', 'days'
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('No content returned from AI model');
    }

    const parsedData = JSON.parse(rawText);
    const enrichedData = {
      id: 'trip_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      prompt: prompt.trim(),
      ...parsedData,
    };

    return res.json(enrichedData);
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate itinerary. Please try again.',
    });
  }
});

// Edit / Modify existing itinerary with natural language instructions
app.post('/api/itinerary/modify', async (req, res) => {
  try {
    const { currentTrip, editInstruction } = req.body;
    if (!editInstruction || !currentTrip) {
      return res.status(400).json({ error: 'Missing current trip or modification instruction.' });
    }

    if (!ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an expert travel modifier. Here is the current JSON itinerary:
${JSON.stringify(currentTrip)}

The user requests this modification:
"${editInstruction.trim()}"

Update the itinerary accordingly (e.g. adjust days, add/remove activities, update hotels or taxis, recalculate times). Return the complete updated JSON strictly following the original schema.`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text;
    if (!rawText) throw new Error('No response from AI');
    const updated = JSON.parse(rawText);
    return res.json({ ...currentTrip, ...updated, id: currentTrip.id });
  } catch (error: any) {
    console.error('Error modifying itinerary:', error);
    return res.status(500).json({ error: error?.message || 'Failed to modify itinerary.' });
  }
});

// Audio transcribe fallback endpoint
app.post('/api/itinerary/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'No audio data provided' });
    }

    if (!ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text: 'Transcribe this voice audio into clear, verbatim text representing the traveler itinerary request. Output only the transcription.',
          },
        ],
      },
    });

    return res.json({ text: response.text?.trim() || '' });
  } catch (error: any) {
    console.error('Error transcribing audio:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to transcribe audio.',
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoamVoice server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
