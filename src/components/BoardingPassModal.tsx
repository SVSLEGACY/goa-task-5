import React, { useState } from 'react';
import { FlightTicket } from '../types/travel';
import { X, Plane, Download, Check, Printer, Edit2 } from 'lucide-react';

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight?: FlightTicket;
  passengerName?: string;
  seat?: string;
  gate?: string;
  onSavePass?: (updatedFlight: Partial<FlightTicket> & { passengerName?: string; seat?: string; gate?: string }) => void;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  flight,
  passengerName: initialPassenger = 'Traveler',
  seat: initialSeat = '14A',
  gate: initialGate = 'B7',
  onSavePass,
}) => {
  const [passenger, setPassenger] = useState(initialPassenger);
  const [seatNum, setSeatNum] = useState(initialSeat);
  const [gateNum, setGateNum] = useState(initialGate);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getAirportCode = (str?: string) => {
    if (!str) return 'DEP';
    if (str.includes('(')) {
      const match = str.match(/\(([A-Z]{3})/i) || str.split('(');
      return (match[1] || match[0]).trim().substring(0, 3).toUpperCase();
    }
    return str.substring(0, 3).toUpperCase();
  };

  const airline = flight?.airline || 'IndiGo Airlines';
  const fromCode = getAirportCode(flight?.fromAirport);
  const fromCity = flight?.fromAirport ? flight.fromAirport.replace(/\(.*?\)/g, '').trim() : 'Mumbai';
  const toCode = getAirportCode(flight?.toAirport);
  const toCity = flight?.toAirport ? flight.toAirport.replace(/\(.*?\)/g, '').trim() : 'Goa Dabolim';

  const handleSave = () => {
    onSavePass?.({
      passengerName: passenger,
      seat: seatNum,
      gate: gateNum,
    });
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(
      `BOARDING PASS: ${airline} | ${fromCode} -> ${toCode} | Passenger: ${passenger} | Seat: ${seatNum} | Gate: ${gateNum}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-sm sm:max-w-md w-full">
        {/* Glow halo behind frosted card matching Image 1 */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-sky-500/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

        {/* Action buttons on top */}
        <div className="absolute -top-12 left-0 right-0 flex items-center justify-between z-20 px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Edit Ticket'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Details' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors"
            title="Close Boarding Pass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Frosted Glass Boarding Pass Card strictly matching Image 1 */}
        <div className="relative rounded-[28px] overflow-hidden backdrop-blur-2xl bg-slate-900/65 dark:bg-slate-900/85 border border-white/20 shadow-2xl text-white p-7 sm:p-8 space-y-6">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-amber-500/10 to-slate-950/60 pointer-events-none" />

          {/* Header Airline */}
          <div className="relative text-center">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase block drop-shadow-sm">
              {airline}
            </span>
          </div>

          {/* Flight Route Codes & Plane Icon */}
          <div className="relative flex items-center justify-between pt-1">
            {/* Origin */}
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight block">
                {fromCode}
              </span>
              <span className="text-xs text-white/70 font-medium block mt-0.5">
                {fromCity}
              </span>
            </div>

            {/* Flight Center Icon matching Image 1 */}
            <div className="flex flex-col items-center px-4">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-md">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
            </div>

            {/* Destination */}
            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight block">
                {toCode}
              </span>
              <span className="text-xs text-white/70 font-medium block mt-0.5">
                {toCity}
              </span>
            </div>
          </div>

          {/* Passenger Info Columns matching Image 1 */}
          <div className="relative grid grid-cols-3 gap-2 pt-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 block mb-0.5">
                PASSENGER
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={passenger}
                  onChange={(e) => setPassenger(e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded px-1.5 py-0.5 text-xs text-white font-bold focus:outline-none"
                />
              ) : (
                <span className="text-sm font-bold text-white block truncate">
                  {passenger}
                </span>
              )}
            </div>

            <div className="text-center">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 block mb-0.5">
                SEAT
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={seatNum}
                  onChange={(e) => setSeatNum(e.target.value)}
                  className="w-full text-center bg-white/10 border border-white/30 rounded px-1.5 py-0.5 text-xs text-white font-bold focus:outline-none"
                />
              ) : (
                <span className="text-sm font-bold text-white block">
                  {seatNum}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 block mb-0.5">
                GATE
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={gateNum}
                  onChange={(e) => setGateNum(e.target.value)}
                  className="w-full text-right bg-white/10 border border-white/30 rounded px-1.5 py-0.5 text-xs text-white font-bold focus:outline-none"
                />
              ) : (
                <span className="text-sm font-bold text-white block">
                  {gateNum}
                </span>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="relative text-center pt-1">
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-colors"
              >
                Save Details
              </button>
            </div>
          )}

          {/* Perforated Dashed Tear Line with Circular Notches matching Image 1 */}
          <div className="relative my-4">
            <div className="absolute -left-9 sm:-left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border border-white/10" />
            <div className="absolute -right-9 sm:-right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border border-white/10" />
            <div className="border-t-2 border-dashed border-white/30 w-full" />
          </div>

          {/* Realistic Barcode Stripes matching Image 1 */}
          <div className="relative pt-1 flex flex-col items-center">
            <div className="flex items-center justify-center gap-[2px] sm:gap-[3px] h-12 sm:h-14 w-full px-2 overflow-hidden">
              {[
                3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1,
                3, 2, 1, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 4
              ].map((w, i) => (
                <div
                  key={i}
                  className="bg-white rounded-full opacity-90 h-full"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] tracking-[0.3em] font-mono text-white/50 mt-2 uppercase">
              BA • 9428 • {fromCode} • {toCode} • 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
