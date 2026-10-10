import React, { useState } from 'react';
import { WishlistItem } from '../types/travel';
import {
  Heart,
  Plus,
  Sparkles,
  MapPin,
  Trash2,
  Compass,
  Tag,
  CheckCircle,
  X,
  ArrowRight,
  Palmtree,
  Utensils,
  Car,
  Landmark,
} from 'lucide-react';

interface WishlistViewProps {
  wishlist: WishlistItem[];
  onAddWishlistItem: (item: WishlistItem) => void;
  onDeleteWishlistItem: (id: string) => void;
  onConvertWishlistToTrip: (wishlistSummary: string) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlist,
  onAddWishlistItem,
  onDeleteWishlistItem,
  onConvertWishlistToTrip,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<{
    title: string;
    location: string;
    notes: string;
    suggestedNights: number;
    category: 'Beach' | 'Cultural' | 'Food & Drinks' | 'Adventure' | 'Scenic Drive';
  }>({
    title: '',
    location: '',
    notes: '',
    suggestedNights: 2,
    category: 'Beach',
  });

  const categories = ['All', 'Beach', 'Food & Drinks', 'Scenic Drive', 'Cultural', 'Adventure'];

  const filteredItems = wishlist.filter(
    (item) => filterCategory === 'All' || item.category === filterCategory
  );

  const handleCreate = () => {
    if (!newItem.title.trim() || !newItem.location.trim()) return;
    onAddWishlistItem({
      ...newItem,
      id: 'wish_' + Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
    });
    setNewItem({
      title: '',
      location: '',
      notes: '',
      suggestedNights: 2,
      category: 'Beach',
    });
    setShowAddModal(false);
  };

  const handleConvertAll = () => {
    if (wishlist.length === 0) return;
    const promptSummary = wishlist
      .map((w) => `${w.title} in ${w.location} (${w.suggestedNights || 2} nights)`)
      .join(', ');
    onConvertWishlistToTrip(
      `Plan a complete trip visiting these wishlist destinations: ${promptSummary} with efficient routes, required taxis, hotels, and 2-night plans.`
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Beach':
        return <Palmtree className="w-4 h-4 text-emerald-500" />;
      case 'Food & Drinks':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'Scenic Drive':
        return <Car className="w-4 h-4 text-sky-500" />;
      case 'Cultural':
        return <Landmark className="w-4 h-4 text-purple-500" />;
      default:
        return <Compass className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-indigo-600/90 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold w-fit mb-2">
            <Heart className="w-3.5 h-3.5 fill-current text-pink-200" />
            Wishlist &amp; Bucket List Travel Planner
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Dream Places &amp; Future Trips
          </h3>
          <p className="text-xs sm:text-sm text-pink-100/90 mt-1 max-w-xl">
            Save spots, beaches, restaurants, and hidden coves you want to visit. With 1-click, convert them into an optimized route!
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-purple-700 hover:bg-pink-50 rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Wishlist Spot</span>
          </button>

          <button
            onClick={handleConvertAll}
            disabled={wishlist.length === 0}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Convert to Itinerary</span>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              filterCategory === cat
                ? 'bg-slate-900 dark:bg-sky-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            No wishlist items in this category yet. Click &ldquo;Add Wishlist Spot&rdquo; to start dreaming!
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-pink-300 dark:hover:border-pink-800 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(item.category)}
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteWishlistItem(item.id)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>

                <div className="text-xs text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{item.location}</span>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-semibold text-[11px]">
                  {item.suggestedNights ? `${item.suggestedNights} Nights Recommended` : 'Stopover'}
                </span>

                <button
                  onClick={() =>
                    onConvertWishlistToTrip(
                      `Create an itinerary focusing on ${item.title} in ${item.location} with 2 nights stay, hotel options and taxi routes.`
                    )
                  }
                  className="text-pink-600 dark:text-pink-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Plan Trip</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: Add Wishlist Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500 fill-current" />
                Add Wishlist Destination or Spot
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Spot or Experience Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Kayak in Palolem, Fontainhas Old Latin Quarter"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Goa, South Goa, Mandrem"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Beach">Beach</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Scenic Drive">Scenic Drive</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Suggested Nights Stay
                </label>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={newItem.suggestedNights}
                  onChange={(e) =>
                    setNewItem({ ...newItem, suggestedNights: parseInt(e.target.value) || 2 })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Notes / Why you want to go
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Dolphin sighting, calm shallow waters, night acoustic beach shacks"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newItem.title.trim() || !newItem.location.trim()}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
              >
                Save to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
