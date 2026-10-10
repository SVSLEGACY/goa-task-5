import React from 'react';
import { FlightTicket } from '../types/travel';
import { X, Plane, Download, Check, Share2 } from 'lucide-react';

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight?: FlightTicket;
  passengerName?: string;
  seat?: string;
  gate?: string;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  flight,
  passengerName = 'Ellise S.',
  seat = '14A',
  gate = 'B7',
}) => {
  if (!isOpen) return null;

  // Defaults matching Image 1
  const airline = flight?.airline || 'BRITISH AIRWAYS';
  const fromCode = flight?.fromAirport ? flight.fromAirport.substring(0, 3).toUpperCase() : 'LCY';
  const fromCity = flight?.fromAirport ? flight.fromAirport.replace(/\(.*\)/, '').trim() : 'London City';
  const toCode = flight?.toAirport ? flight.toAirport.substring(0, 3).toUpperCase() : 'DPS';
  const toCity = flight?.toAirport ? flight.toAirport.replace(/\(.*\)/, '').trim() : 'Denpasar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background container with sunset glow backdrop strictly matching Image 1 */}
      <div className="relative max-w-sm sm:max-w-md w-full">
        {/* Glow halo behind frosted card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-sky-500/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors z-20"
          title="Close Boarding Pass"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Frosted Glass Boarding Pass Card matching Image 1 */}
        <div className="relative rounded-[28px] overflow-hidden backdrop-blur-2xl bg-slate-900/60 dark:bg-slate-900/80 border border-white/20 shadow-2xl text-white p-7 sm:p-8 space-y-6">
          {/* Subtle gradient overlay */}
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
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
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
              <span className="text-sm font-bold text-white block truncate">
                {passengerName}
              </span>
            </div>

            <div className="text-center">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 block mb-0.5">
                SEAT
              </span>
              <span className="text-sm font-bold text-white block">
                {seat}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/60 block mb-0.5">
                GATE
              </span>
              <span className="text-sm font-bold text-white block">
                {gate}
              </span>
            </div>
          </div>

          {/* Perforated Dashed Tear Line with Circular Notches matching Image 1 */}
          <div className="relative my-4">
            {/* Left Notch */}
            <div className="absolute -left-9 sm:-left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border border-white/10" />
            {/* Right Notch */}
            <div className="absolute -right-9 sm:-right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border border-white/10" />
            {/* Dashed line */}
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
              BA • 9428 • LCY • DPS • 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
