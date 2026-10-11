import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Mic,
  MicOff,
  ChevronDown,
  Sparkles,
  Camera,
  Film,
  Compass,
  MapPin,
  X,
  ArrowRight,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Loader2,
  Calendar,
  DollarSign,
  Car,
  Plane,
} from 'lucide-react';
import { SpeechHandler } from '../utils/speech';

export interface GeminiSearchBarProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
  initialPrompt?: string;
  onClose?: () => void;
  isModal?: boolean;
}

interface SuggestionItem {
  id: string;
  icon: 'sparkles' | 'camera' | 'film' | 'compass' | 'mappin';
  title: string;
  prompt: string;
}

const DEFAULT_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 's-goa',
    icon: 'sparkles',
    title: '4 days in Goa: 2 nights Palolem beach, 2 nights Mandrem',
    prompt: 'Plan a 4-day trip to Goa: 2 nights in Palolem beach and 2 nights in Mandrem beach. Include local taxi union stands, flights, boutique stays, and authentic Goan beach shacks.',
  },
  {
    id: 's-kyoto',
    icon: 'camera',
    title: 'Weekend in Kyoto: bamboo grove, historic temples & ramen',
    prompt: '3-day cultural weekend in Kyoto visiting Arashiyama bamboo forest, Fushimi Inari shrine, Gion teahouses, and top ramen spots with transit routes.',
  },
  {
    id: 's-swiss',
    icon: 'film',
    title: 'Swiss Alps scenic rail: Zurich to Zermatt via Glacier Express',
    prompt: '5-day Swiss Alps journey from Zurich through Lucerne and Interlaken to Zermatt Matterhorn via scenic train lines with mountain excursions.',
  },
  {
    id: 's-amalfi',
    icon: 'compass',
    title: 'Amalfi Coast & Capri: 5 days cliffside villages & ferry hops',
    prompt: '5 days exploring Positano, Amalfi town, Ravello cliff gardens, and a ferry excursion to Capri with recommended cliffside hotels and lemon grove dinners.',
  },
];

const MODEL_OPTIONS = [
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Gemini 2.5 Pro · Deep multimodal travel planning with maps, flights & taxi fares',
    badge: 'Recommended',
  },
  {
    id: 'flash',
    name: 'Flash',
    subtitle: 'Gemini 2.5 Flash · Ultra-fast route generation & daily summaries',
    badge: 'Fast',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    subtitle: 'Luxury Concierge · Boutique resorts, curated dinners & private driver quotes',
    badge: 'Curated',
  },
];

const PREFERENCE_TAGS = [
  { label: '2-3 Days Weekend', promptSuffix: 'for a 3-day weekend escape' },
  { label: '4-5 Days Getaway', promptSuffix: 'for 4 to 5 days' },
  { label: '7+ Days Road Trip', promptSuffix: 'for a 7-day comprehensive tour' },
  { label: 'Beach & Sun', promptSuffix: 'focused on coastal beaches, sunsets, and water activities' },
  { label: 'Cultural & Heritage', promptSuffix: 'focused on historic architecture, landmarks, and temples' },
  { label: 'Foodie & Cafes', promptSuffix: 'with authentic local street eats and renowned dining spots' },
  { label: 'Include Taxis & Stays', promptSuffix: 'with taxi fares, union stands, and hotel recommendations' },
];

export const GeminiSearchBar: React.FC<GeminiSearchBarProps> = ({
  onGenerate,
  isLoading,
  initialPrompt = '',
  onClose,
  isModal = false,
}) => {
  const [query, setQuery] = useState(initialPrompt);
  const [selectedModel, setSelectedModel] = useState('pro');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(DEFAULT_SUGGESTIONS);
  const [hoveredSuggestionId, setHoveredSuggestionId] = useState<string | null>(null);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const speechHandlerRef = useRef<SpeechHandler | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Loading status cycle
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const loadingSteps = [
    'Synthesizing destination coordinates & geography...',
    'Curating day-by-day itinerary & activity time slots...',
    'Calculating local taxi fares & transport union stands...',
    'Finding top-rated boutique hotels & authentic dining...',
    'Finalizing interactive map waypoints...',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % loadingSteps.length);
      }, 3200);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Setup Speech Handler
  useEffect(() => {
    const handler = new SpeechHandler({
      onTranscriptChange: (text) => {
        setQuery(text);
        setSpeechError(null);
      },
      onStateChange: (listening) => {
        setIsListening(listening);
      },
      onError: (msg) => {
        setSpeechError(msg);
      },
    });

    speechHandlerRef.current = handler;
    setSpeechSupported(handler.isSpeechSupported());

    return () => {
      handler.stop();
    };
  }, []);

  // Auto focus input on mount
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleToggleMic = () => {
    setSpeechError(null);
    if (!speechHandlerRef.current) return;
    speechHandlerRef.current.toggle();
  };

  const handleToggleTag = (tag: typeof PREFERENCE_TAGS[0]) => {
    if (selectedTags.includes(tag.label)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag.label));
    } else {
      setSelectedTags((prev) => [...prev, tag.label]);
      // Append tag prompt suffix if not already present
      if (!query.toLowerCase().includes(tag.label.toLowerCase())) {
        const nextQuery = query.trim() ? `${query.trim()}, ${tag.promptSuffix}` : `Plan a trip ${tag.promptSuffix}`;
        setQuery(nextQuery);
      }
    }
  };

  const handleDismissSuggestion = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleResetSuggestions = () => {
    setSuggestions(DEFAULT_SUGGESTIONS);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalPrompt = query.trim();
    if (!finalPrompt || isLoading) return;

    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
    }
    setIsPreferencesOpen(false);
    setIsModelDropdownOpen(false);
    await onGenerate(finalPrompt);
  };

  const handleSelectSuggestion = async (item: SuggestionItem) => {
    setQuery(item.prompt);
    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
    }
    await onGenerate(item.prompt);
  };

  const renderSuggestionIcon = (type: SuggestionItem['icon']) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'film':
        return <Film className="w-4 h-4 text-purple-400 shrink-0" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'mappin':
        return <MapPin className="w-4 h-4 text-rose-400 shrink-0" />;
    }
  };

  const activeModelObj = MODEL_OPTIONS.find((m) => m.id === selectedModel) || MODEL_OPTIONS[0];

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center select-none ${
        isModal
          ? 'p-6 sm:p-10 bg-[#090d19] rounded-[32px] border border-slate-800 text-slate-100 shadow-2xl'
          : 'min-h-[75vh] px-4 py-8 sm:py-16 text-slate-100'
      }`}
      style={{
        background: isModal
          ? 'radial-gradient(ellipse at 50% 10%, #172038 0%, #0a0d18 70%, #05070d 100%)'
          : 'radial-gradient(ellipse at 50% 15%, #18223c 0%, #0a0e1b 60%, #05070d 100%)',
      }}
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Modal Close Button if in modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          title="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Top Main Title: "Where should we start?" matching the image */}
      <div className="text-center mb-8 sm:mb-10 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-100 tracking-tight font-sans">
          Where should we start?
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400/90 font-light">
          Enter any destination, beaches, multi-city route, or tap a suggestion below
        </p>
      </div>

      {/* Central Search Bar Container (Exact recreation from user's image) */}
      <div className="w-full max-w-2xl md:max-w-3xl z-20">
        <form
          onSubmit={handleSubmit}
          className={`relative rounded-full bg-[#1b202d] border transition-all duration-300 shadow-2xl flex items-center px-4 sm:px-5 py-3 sm:py-3.5 gap-2.5 sm:gap-3.5 ${
            isLoading
              ? 'border-sky-500 ring-2 ring-sky-500/30'
              : isListening
              ? 'border-red-500/80 ring-2 ring-red-500/30 shadow-red-950/40'
              : 'border-slate-700/70 hover:border-slate-600 focus-within:border-sky-500/80 focus-within:ring-2 focus-within:ring-sky-500/20'
          }`}
        >
          {/* Left '+' Button (Add Context / Preferences) matching the image */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsPreferencesOpen((v) => !v);
                setIsModelDropdownOpen(false);
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center ${
                isPreferencesOpen
                  ? 'bg-sky-500/20 text-sky-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title="Add travel preferences & options"
              aria-label="Add preferences"
            >
              <Plus className={`w-5 h-5 transition-transform duration-200 ${isPreferencesOpen ? 'rotate-45' : ''}`} />
            </button>

            {/* Dropdown Menu for '+' Button: Quick Preferences */}
            {isPreferencesOpen && (
              <div className="absolute top-12 left-0 w-72 sm:w-80 bg-[#161a26] border border-slate-700/80 rounded-2xl p-3 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
                    Trip Preferences
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </button>
                </div>

                <div className="pt-2.5 flex flex-wrap gap-1.5 max-h-56 overflow-y-auto">
                  {PREFERENCE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag.label);
                    return (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-all text-left flex items-center gap-1 ${
                          isSelected
                            ? 'bg-sky-500 text-white font-medium shadow-sm'
                            : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 border border-slate-700/60'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Central Input Field: "Ask Gemini" matching image */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder={isListening ? 'Listening... Speak your dream trip' : 'Ask Gemini'}
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-400/90 text-base sm:text-lg font-normal border-0 outline-none truncate"
          />

          {/* Right Controls inside the Pill Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mode / Model Selector: 'Pro ⌵' matching the image */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsModelDropdownOpen((v) => !v);
                  setIsPreferencesOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                title="Select Gemini Model Tier"
              >
                <span>{activeModelObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Model Dropdown Menu */}
              {isModelDropdownOpen && (
                <div className="absolute top-10 right-0 w-72 bg-[#161a26] border border-slate-700/80 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Model Intelligence Tier
                  </div>
                  {MODEL_OPTIONS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-all flex items-start justify-between gap-2 ${
                        selectedModel === model.id
                          ? 'bg-sky-500/15 border border-sky-500/40 text-sky-200'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          {model.name}
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {model.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{model.subtitle}</div>
                      </div>
                      {selectedModel === model.id && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Microphone Button matching image */}
            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleMic}
                disabled={isLoading}
                className={`p-1.5 sm:p-2 rounded-full transition-all flex items-center justify-center ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                title={isListening ? 'Stop listening' : 'Speak your trip with voice'}
                aria-label="Microphone input"
              >
                {isListening ? <MicOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Mic className="w-4 sm:w-5 h-4 sm:h-5" />}
              </button>
            )}

            {/* Submit / Arrow Button (shows when typing or loading) */}
            {isLoading ? (
              <div className="p-1.5 sm:p-2 text-sky-400 animate-spin">
                <Loader2 className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
            ) : query.trim() ? (
              <button
                type="submit"
                className="p-1.5 sm:p-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/30 transition-all hover:scale-105 active:scale-95"
                title="Generate Itinerary"
              >
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            ) : null}
          </div>
        </form>

        {/* Live Audio Waves / Speech Feedback when recording */}
        {isListening && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-red-300 bg-red-950/40 border border-red-800/60 rounded-full px-4 py-1.5 w-fit mx-auto animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Listening to your voice... Speak naturally (e.g. &quot;Goa 4 days with Palolem beach&quot;)</span>
          </div>
        )}

        {speechError && (
          <div className="mt-3 text-center text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded-full px-4 py-1 w-fit mx-auto">
            {speechError}
          </div>
        )}

        {/* Loading Step Progress Banner */}
        {isLoading && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center animate-in fade-in">
            <div className="h-1 w-48 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 w-full animate-pulse" />
            </div>
            <p className="text-xs text-sky-300 font-medium tracking-wide">
              {loadingSteps[loadingStepIndex]}
            </p>
          </div>
        )}

        {/* Suggestions Rows (matching the exact 3 rows style from user's image) */}
        {!isLoading && (
          <div className="mt-6 sm:mt-7 space-y-1.5 sm:space-y-2">
            {suggestions.map((item, index) => {
              // Row 2 is styled with darker highlight and dismiss X matching screenshot's second row
              const isHighlighted = hoveredSuggestionId === item.id || (hoveredSuggestionId === null && index === 1);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item)}
                  onMouseEnter={() => setHoveredSuggestionId(item.id)}
                  onMouseLeave={() => setHoveredSuggestionId(null)}
                  className={`w-full px-4 sm:px-5 py-3 rounded-2xl sm:rounded-full transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                    isHighlighted
                      ? 'bg-[#1b2232] border border-slate-700/60 shadow-lg text-slate-100'
                      : 'hover:bg-slate-800/40 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {renderSuggestionIcon(item.icon)}
                    <span className="text-xs sm:text-sm font-normal truncate">{item.title}</span>
                  </div>

                  {/* Dismiss X button matching the image's row */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isHighlighted && (
                      <button
                        type="button"
                        onClick={(e) => handleDismissSuggestion(e, item.id)}
                        className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                        title="Dismiss suggestion"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Restore suggestions link if user dismissed all */}
            {suggestions.length < DEFAULT_SUGGESTIONS.length && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleResetSuggestions}
                  className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 mx-auto transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore travel suggestions
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle Bottom Travel Tags */}
      {!isLoading && (
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 z-10 max-w-xl text-center px-4">
          <span className="text-slate-500 font-medium">Popular:</span>
          {['Goa 4 Days', 'Japan Golden Route', 'London 5 Days', 'Amalfi Coast', 'Swiss Alps Rail'].map(
            (popularPlace) => (
              <button
                key={popularPlace}
                onClick={() => {
                  setQuery(`Plan a trip to ${popularPlace} with hotels, local taxi transfers, and flight options`);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                {popularPlace}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
