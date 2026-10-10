import React, { useState } from 'react';
import { TripItinerary, FlightTicket, HotelStay } from '../types/travel';
import {
  Plane,
  Home,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Banknote,
  Star,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Tag,
} from 'lucide-react';

interface FlightsHotelsViewProps {
  trip: TripItinerary;
  onUpdateTrip: (updated: TripItinerary) => void;
}

export const FlightsHotelsView: React.FC<FlightsHotelsViewProps> = ({
  trip,
  onUpdateTrip,
}) => {
  const [showAddFlight, setShowAddFlight] = useState<boolean>(false);
  const [showAddHotel, setShowAddHotel] = useState<boolean>(false);

  const [flightForm, setFlightForm] = useState<FlightTicket>({
    id: '',
    flightNumber: '',
    airline: '',
    fromAirport: '',
    toAirport: '',
    departureTime: '10:00 AM',
    arrivalTime: '12:30 PM',
    date: '2024-11-12',
    estimatedPrice: '$150 (₹12,500)',
    bookingStatus: 'Booked',
    terminal: 'T2',
  });

  const [hotelForm, setHotelForm] = useState<HotelStay>({
    id: '',
    hotelName: '',
    cityOrArea: trip.cities[0] || '',
    nights: 2,
    pricePerNight: '$60/night (₹5,000)',
    vibe: 'Peaceful beachfront boutique cottage',
    bookingStatus: 'Booked',
    amenities: ['Direct Beach Access', 'Free Wi-Fi', 'Breakfast Included'],
  });

  const handleAddFlight = () => {
    if (!flightForm.flightNumber.trim() || !flightForm.airline.trim()) return;
    const newFlight: FlightTicket = {
      ...flightForm,
      id: 'flight_' + Date.now(),
    };
    const updatedFlights = [...(trip.flights || []), newFlight];
    onUpdateTrip({ ...trip, flights: updatedFlights });
    setShowAddFlight(false);
    setFlightForm({
      id: '',
      flightNumber: '',
      airline: '',
      fromAirport: '',
      toAirport: '',
      departureTime: '10:00 AM',
      arrivalTime: '12:30 PM',
      date: '2024-11-12',
      estimatedPrice: '$150 (₹12,500)',
      bookingStatus: 'Booked',
      terminal: 'T2',
    });
  };

  const handleRemoveFlight = (id: string) => {
    const updated = (trip.flights || []).filter((f) => f.id !== id);
    onUpdateTrip({ ...trip, flights: updated });
  };

  const handleAddHotel = () => {
    if (!hotelForm.hotelName.trim()) return;
    const newHotel: HotelStay = {
      ...hotelForm,
      id: 'hotel_' + Date.now(),
    };
    const updatedHotels = [...(trip.hotels || []), newHotel];
    onUpdateTrip({ ...trip, hotels: updatedHotels });
    setShowAddHotel(false);
    setHotelForm({
      id: '',
      hotelName: '',
      cityOrArea: trip.cities[0] || '',
      nights: 2,
      pricePerNight: '$60/night (₹5,000)',
      vibe: 'Peaceful beachfront boutique cottage',
      bookingStatus: 'Booked',
      amenities: ['Direct Beach Access', 'Free Wi-Fi', 'Breakfast Included'],
    });
  };

  const handleRemoveHotel = (id: string) => {
    const updated = (trip.hotels || []).filter((h) => h.id !== id);
    onUpdateTrip({ ...trip, hotels: updated });
  };

  const flights = trip.flights || [];
  const hotels = trip.hotels || [];

  return (
    <div className="w-full space-y-8">
      {/* SECTION 1: FLIGHTS & TICKET PRICES */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Flight Tickets &amp; Price Estimates
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track booked flight tickets or see price estimates for where to go
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddFlight(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add My Flight Ticket</span>
          </button>
        </div>

        {/* Flight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flights.length === 0 ? (
            <div className="col-span-full py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              No flights added yet. Click &ldquo;Add My Flight Ticket&rdquo; to store your flight details!
            </div>
          ) : (
            flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/60 relative group"
              >
                <button
                  onClick={() => handleRemoveFlight(flight.id)}
                  className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove flight"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {flight.airline}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {flight.flightNumber}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {flight.bookingStatus}
                  </span>
                </div>

                {/* From / To Flight Route */}
                <div className="flex items-center justify-between my-3 py-2 border-y border-slate-200/60 dark:border-slate-700/60">
                  <div>
                    <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white block">
                      {flight.fromAirport}
                    </span>
                    <span className="text-xs text-slate-500 block">{flight.departureTime}</span>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <Plane className="w-4 h-4 text-indigo-500 rotate-90" />
                    <span className="text-[10px] text-slate-400 mt-1">{flight.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white block">
                      {flight.toAirport}
                    </span>
                    <span className="text-xs text-slate-500 block">{flight.arrivalTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <span>
                    Price: <strong className="text-slate-900 dark:text-white">{flight.estimatedPrice}</strong>
                  </span>
                  {flight.terminal && <span>Terminal: {flight.terminal}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 2: HOTELS & STAY OPTIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Hotel Stays &amp; Accommodations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2-night beachfront cottages, boutique resorts, and booked stays
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddHotel(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-amber-600/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hotel Option</span>
          </button>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.length === 0 ? (
            <div className="col-span-full py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              No hotels recorded yet. Click &ldquo;Add Hotel Option&rdquo; to add your stay!
            </div>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 relative group space-y-3"
              >
                <button
                  onClick={() => handleRemoveHotel(hotel.id)}
                  className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove hotel"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start justify-between gap-2 pr-6">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {hotel.hotelName}
                    </h4>
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium block mt-0.5">
                      📍 {hotel.cityOrArea}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-xs font-bold rounded-lg shrink-0">
                    {hotel.nights} Nights
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {hotel.vibe}
                </p>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.map((amenity, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-2 py-0.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] rounded-md font-medium"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pricing Footer */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Rate:{' '}
                    <strong className="text-slate-900 dark:text-white">{hotel.pricePerNight}</strong>
                  </span>
                  {hotel.totalPrice && (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Total: {hotel.totalPrice}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL: ADD FLIGHT TICKET */}
      {showAddFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-indigo-500" />
                Add Flight Ticket
              </h3>
              <button
                onClick={() => setShowAddFlight(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Airline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IndiGo, Air India, Emirates"
                    value={flightForm.airline}
                    onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6E 5218"
                    value={flightForm.flightNumber}
                    onChange={(e) =>
                      setFlightForm({ ...flightForm, flightNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    From Airport
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BOM (Mumbai)"
                    value={flightForm.fromAirport}
                    onChange={(e) =>
                      setFlightForm({ ...flightForm, fromAirport: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    To Airport
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GOI (Goa Dabolim)"
                    value={flightForm.toAirport}
                    onChange={(e) =>
                      setFlightForm({ ...flightForm, toAirport: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Departure Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 08:30 AM"
                    value={flightForm.departureTime}
                    onChange={(e) =>
                      setFlightForm({ ...flightForm, departureTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Price (USD / INR)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3,400 ($41)"
                    value={flightForm.estimatedPrice}
                    onChange={(e) =>
                      setFlightForm({ ...flightForm, estimatedPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAddFlight(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFlight}
                disabled={!flightForm.airline.trim() || !flightForm.flightNumber.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
              >
                Save Flight
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD HOTEL STAY */}
      {showAddHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                Add Hotel Option
              </h3>
              <button
                onClick={() => setShowAddHotel(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Hotel or Cottage Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ciaran’s Beach Cottages"
                  value={hotelForm.hotelName}
                  onChange={(e) => setHotelForm({ ...hotelForm, hotelName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    City or Beach Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Palolem Beach, South Goa"
                    value={hotelForm.cityOrArea}
                    onChange={(e) => setHotelForm({ ...hotelForm, cityOrArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nights Stay
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={hotelForm.nights}
                    onChange={(e) =>
                      setHotelForm({ ...hotelForm, nights: parseInt(e.target.value) || 2 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Price per Night
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹4,200/night ($50)"
                  value={hotelForm.pricePerNight}
                  onChange={(e) => setHotelForm({ ...hotelForm, pricePerNight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Vibe / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Wooden beach hut on white sand, tranquil coconut grove"
                  value={hotelForm.vibe}
                  onChange={(e) => setHotelForm({ ...hotelForm, vibe: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAddHotel(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHotel}
                disabled={!hotelForm.hotelName.trim()}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
              >
                Save Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
