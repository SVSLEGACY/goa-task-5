import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, Volume2, CornerDownLeft, RotateCcw, AlertCircle } from 'lucide-react';
import { SpeechHandler } from '../utils/speech';

interface VoiceInputBarProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
  initialPrompt?: string;
}

const SAMPLE_PROMPTS = [
  {
    title: '🇯🇵 Japan Golden Route',
    prompt: '5 days from Tokyo to Hakone, Kyoto, and Osaka with scenic bullet train rides and local food',
  },
  {
    title: '🇮🇹 Italy Cultural Rail',
    prompt: '6 days traveling Rome, Florence, Venice, and Milan by high-speed train with no backtracking',
  },
  {
    title: '🇺🇸 California Pacific Coast',
    prompt: '7 day coastal road trip from San Francisco down Highway 1 to Big Sur, Santa Barbara, and Los Angeles',
  },
  {
    title: '🇪🇸 Spain Andalusian Circuit',
    prompt: '5 days visiting Madrid, Cordoba, Seville, and Granada with tapas tours and Moorish architecture',
  },
];

export const VoiceInputBar: React.FC<VoiceInputBarProps> = ({
  onGenerate,
  isLoading,
  initialPrompt = '',
}) => {
  const [transcript, setTranscript] = useState<string>(initialPrompt);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const speechHandlerRef = useRef<SpeechHandler | null>(null);

  useEffect(() => {
    const handler = new SpeechHandler({
      onTranscriptChange: (text) => {
        setTranscript((prev) => {
          // If previous text exists, append or replace smoothly
          return text;
        });
        setErrorMessage(null);
      },
      onStateChange: (listening) => {
        setIsListening(listening);
      },
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });

    speechHandlerRef.current = handler;
    setSpeechSupported(handler.isSpeechSupported());

    return () => {
      handler.stop();
    };
  }, []);

  const handleToggleMic = () => {
    setErrorMessage(null);
    if (!speechHandlerRef.current) return;
    speechHandlerRef.current.toggle();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!transcript.trim() || isLoading) return;

    // Stop listening if active
    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
    }
    await onGenerate(transcript.trim());
  };

  const handleSelectSample = (sample: string) => {
    setTranscript(sample);
    setErrorMessage(null);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-lg transition-all">
      {/* Voice Core Section */}
      <div className="flex flex-col items-center text-center mb-6">
        {/* Pulsing Mic Circle */}
        <div className="relative mb-4">
          {isListening && (
            <>
              <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
              <span className="absolute -inset-6 rounded-full bg-red-500/10 animate-pulse" />
            </>
          )}

          <button
            type="button"
            onClick={handleToggleMic}
            disabled={isLoading}
            className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all transform active:scale-95 shadow-xl ${
              isListening
                ? 'bg-red-600 text-white shadow-red-500/40 ring-4 ring-red-400/50 scale-105'
                : 'bg-gradient-to-tr from-sky-600 to-sky-400 hover:from-sky-500 hover:to-sky-300 text-white shadow-sky-500/30 hover:scale-105'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start speaking your itinerary'}
          >
            {isListening ? (
              <MicOff className="w-9 h-9 sm:w-11 sm:h-11 animate-pulse" />
            ) : (
              <Mic className="w-9 h-9 sm:w-11 sm:h-11" />
            )}
          </button>
        </div>

        {/* Status Callout */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isListening ? (
            <span className="text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              Listening... Speak your dream trip!
            </span>
          ) : (
            'Speak Anything to Plan Your Route'
          )}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
          {isListening
            ? 'Tell us your cities, days, travel style, or road trip idea. Tap mic again when finished.'
            : 'Tap the mic or type below. AI will optimize your travel sequence between cities with zero backtrack.'}
        </p>

        {/* Audio Waveform animation when listening */}
        {isListening && (
          <div className="flex items-center gap-1 mt-3">
            {[40, 75, 50, 90, 60, 80, 45, 95, 70, 50].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{
                  height: `${h * 0.35}px`,
                  animationDuration: `${0.4 + (i % 4) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error notification if mic blocked or error */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Transcript & Input Bar Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-sky-500 dark:focus-within:border-sky-400 bg-slate-50 dark:bg-slate-950/60 transition-colors p-2.5">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="e.g. 'I want to travel 6 days in Italy: Rome, Florence, Venice and Milan. I prefer scenic trains, good food, and efficient routes...'"
            rows={3}
            className="w-full bg-transparent border-0 resize-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:ring-0 focus:outline-none p-1"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 mt-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {transcript.length > 0 && (
                <button
                  type="button"
                  onClick={() => setTranscript('')}
                  className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !transcript.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-sky-600/20 disabled:shadow-none transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Optimizing Routes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Itinerary & Route</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Inspiration Prompts */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
          Or try a popular multi-city trip:
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(item.prompt)}
              className="text-xs bg-slate-100 hover:bg-sky-50 hover:text-sky-700 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 transition-colors text-left"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
