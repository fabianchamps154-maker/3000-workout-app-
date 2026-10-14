import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  Utensils, 
  Flame, 
  RotateCcw, 
  Award,
  Layers,
  Clock,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  UserProfile, 
  FitnessGoal, 
  MealNutritionAnalysis, 
  MealFoodItem, 
  FoodDiaryEntry, 
  USDAFoodMatch,
  CookingMethod 
} from '../types';
import { storage } from '../utils/storage';

interface AIFoodScannerProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

type ScannerTab = 'scanner' | 'diary' | 'trends';

const COOKING_METHODS: { value: CookingMethod; label: string }[] = [
  { value: 'grilled', label: 'Grilled' },
  { value: 'baked', label: 'Baked' },
  { value: 'boiled_steamed', label: 'Boiled / Steamed' },
  { value: 'pan_fried', label: 'Pan-Fried' },
  { value: 'deep_fried', label: 'Deep-Fried' },
  { value: 'raw', label: 'Raw / Fresh' },
  { value: 'roasted', label: 'Roasted' },
  { value: 'air_fried', label: 'Air-Fried' },
];

const FITNESS_GOAL_DETAILS: Record<FitnessGoal, { label: string; icon: string; description: string; targetNote: string }> = {
  muscle_building: {
    label: 'Muscle Building',
    icon: '💪',
    description: 'Hypertrophy & high-protein recovery after high-volume compound training.',
    targetNote: 'Prioritizes 1.6 - 2.2g protein per kg of bodyweight.'
  },
  maintenance: {
    label: 'Athletic Maintenance',
    icon: '⚖️',
    description: 'Equilibrium intake for sustained athletic conditioning and recovery.',
    targetNote: 'Maintains steady daily energy and lean muscle mass.'
  },
  weight_management: {
    label: 'Weight Management',
    icon: '🎯',
    description: 'Lean protein density & satiety-focused nutrient distribution.',
    targetNote: 'High fullness index with controlled caloric density.'
  },
  endurance: {
    label: 'High Performance / Endurance',
    icon: '⚡',
    description: 'Glycogen replenishment & sustained complex carbohydrates.',
    targetNote: 'Optimizes intramuscular glycogen for high-rep workouts.'
  }
};

const SAMPLE_MEALS = [
  {
    title: 'Chicken & Brown Rice Bowl',
    icon: '🍗',
    notes: 'Grilled chicken breast with brown rice and steamed broccoli',
    img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230c0e17"/><circle cx="200" cy="150" r="110" fill="%23171a26" stroke="%2310b981" stroke-width="4"/><path d="M140 130 Q170 110 200 130 T260 130" fill="none" stroke="%23f59e0b" stroke-width="24" stroke-linecap="round"/><circle cx="160" cy="170" r="35" fill="%2310b981" opacity="0.8"/><circle cx="230" cy="170" r="40" fill="%23d97706" opacity="0.6"/><text x="200" y="270" fill="%2394a3b8" font-size="14" text-anchor="middle" font-family="sans-serif">Sample Meal: Chicken &amp; Rice</text></svg>'
  },
  {
    title: 'Salmon & Quinoa Plate',
    icon: '🐟',
    notes: 'Atlantic salmon fillet with cooked quinoa and roasted asparagus',
    img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230c0e17"/><circle cx="200" cy="150" r="110" fill="%23171a26" stroke="%2306b6d4" stroke-width="4"/><rect x="150" y="120" width="100" height="40" rx="8" fill="%23f43f5e" opacity="0.9"/><circle cx="160" cy="180" r="35" fill="%23eab308" opacity="0.6"/><line x1="210" y1="170" x2="260" y2="185" stroke="%2310b981" stroke-width="12" stroke-linecap="round"/><text x="200" y="270" fill="%2394a3b8" font-size="14" text-anchor="middle" font-family="sans-serif">Sample Meal: Salmon &amp; Quinoa</text></svg>'
  },
  {
    title: 'Recovery Oats & Berries',
    icon: '🥣',
    notes: 'Rolled oats with greek yogurt and fresh blueberries',
    img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230c0e17"/><circle cx="200" cy="150" r="100" fill="%231e293b" stroke="%238b5cf6" stroke-width="4"/><circle cx="200" cy="150" r="75" fill="%23f1f5f9" opacity="0.2"/><circle cx="180" cy="140" r="14" fill="%233b82f6"/><circle cx="210" cy="135" r="12" fill="%233b82f6"/><circle cx="195" cy="165" r="15" fill="%233b82f6"/><circle cx="225" cy="160" r="11" fill="%233b82f6"/><text x="200" y="270" fill="%2394a3b8" font-size="14" text-anchor="middle" font-family="sans-serif">Sample Meal: Protein Oats</text></svg>'
  }
];

export const AIFoodScanner: React.FC<AIFoodScannerProps> = ({ profile, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<ScannerTab>('scanner');
  const [diaryEntries, setDiaryEntries] = useState<FoodDiaryEntry[]>(() => storage.getFoodDiary());

  // Scanner Form State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'post_workout'>('lunch');
  const [activeFitnessGoal, setActiveFitnessGoal] = useState<FitnessGoal>(profile.fitnessGoal || 'muscle_building');
  const [userNotes, setUserNotes] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanError, setScanError] = useState<string | null>(null);

  // Analysis Result & Interactive Correction State
  const [analysis, setAnalysis] = useState<MealNutritionAnalysis | null>(null);
  const [editedItems, setEditedItems] = useState<MealFoodItem[]>([]);
  const [editedMealName, setEditedMealName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPhotoSetupCollapsed, setIsPhotoSetupCollapsed] = useState<boolean>(true);
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(null);
  const [mobileResultView, setMobileResultView] = useState<'all' | 'foods' | 'coach'>('all');
  const resultsRef = useRef<HTMLDivElement>(null);

  // USDA Search Modal State
  const [isUsdaModalOpen, setIsUsdaModalOpen] = useState<boolean>(false);
  const [usdaSearchTargetIndex, setUsdaSearchTargetIndex] = useState<number | null>(null);
  const [usdaQuery, setUsdaQuery] = useState<string>('');
  const [usdaLoading, setUsdaLoading] = useState<boolean>(false);
  const [usdaResults, setUsdaResults] = useState<any[]>([]);

  // Daily Diary Selected Date State
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // File Input References
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Sync profile fitness goal if changed
  useEffect(() => {
    if (profile.fitnessGoal && profile.fitnessGoal !== activeFitnessGoal) {
      setActiveFitnessGoal(profile.fitnessGoal);
    }
  }, [profile.fitnessGoal]);

  // Handle Photo selection from camera or file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setAnalysis(null);
      setIsSaved(false);
      setScanError(null);
      setIsPhotoSetupCollapsed(false);
    };
    reader.readAsDataURL(file);
  };

  // Select Sample Meal for quick test
  const handleSelectSampleMeal = (sample: typeof SAMPLE_MEALS[0]) => {
    setSelectedImage(sample.img);
    setUserNotes(sample.notes);
    setAnalysis(null);
    setIsSaved(false);
    setScanError(null);
    setIsPhotoSetupCollapsed(false);
  };

  // Perform Gemini AI Vision Scan & USDA Cross-reference
  const handleScanMeal = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setScanError(null);
    setScanStep('Analyzing visual composition with Gemini 3.8...');

    try {
      setTimeout(() => {
        setScanStep('Cross-referencing verified USDA FoodData Central records...');
      }, 1200);

      const res = await fetch('/api/ai/scan-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          fitnessGoal: activeFitnessGoal,
          mealType,
          userNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to scan meal');
      }

      setAnalysis(data.analysis);
      setEditedMealName(data.analysis.mealName);
      setEditedItems(data.analysis.items);
      setIsSaved(false);
      setIsPhotoSetupCollapsed(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Scan error:', err);
      setScanError(err.message || 'Error scanning meal photo. Please try again.');
    } finally {
      setIsScanning(false);
      setScanStep('');
    }
  };

  // Recalculate totals and bounds whenever editedItems change
  const recalculateEditedTotals = (items: MealFoodItem[]) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let minCalories = 0;
    let maxCalories = 0;

    for (const item of items) {
      totalCalories += item.calories;
      totalProtein += item.protein;
      totalCarbs += item.carbs;
      totalFat += item.fat;

      const cPer100 = item.calories / (item.portionGrams || 100) * 100;
      const minG = Math.max(10, item.portionGrams - item.portionUncertaintyGrams);
      const maxG = item.portionGrams + item.portionUncertaintyGrams;

      minCalories += Math.round((minG / 100) * cPer100);
      maxCalories += Math.round((maxG / 100) * cPer100);
    }

    return {
      totalCalories,
      totalProtein: Math.round(totalProtein * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      totalFat: Math.round(totalFat * 10) / 10,
      uncertaintyRange: { minCalories, maxCalories },
    };
  };

  // Update Item Portion with automatic macro recalculation
  const handleUpdateItemPortion = (index: number, newGrams: number) => {
    const updated = [...editedItems];
    const item = updated[index];
    const grams = Math.max(10, newGrams);

    const prevGrams = item.portionGrams || 100;
    const factor = grams / prevGrams;

    item.portionGrams = grams;
    item.portionUncertaintyGrams = Math.round(grams * 0.15);
    item.calories = Math.round(item.calories * factor);
    item.protein = Math.round(item.protein * factor * 10) / 10;
    item.carbs = Math.round(item.carbs * factor * 10) / 10;
    item.fat = Math.round(item.fat * factor * 10) / 10;

    setEditedItems(updated);
  };

  // Update Cooking Method
  const handleUpdateCookingMethod = (index: number, method: CookingMethod) => {
    const updated = [...editedItems];
    updated[index].cookingMethod = method;
    setEditedItems(updated);
  };

  // Remove Item
  const handleRemoveItem = (index: number) => {
    const updated = editedItems.filter((_, i) => i !== index);
    setEditedItems(updated);
  };

  // Add Custom Item
  const handleAddCustomItem = () => {
    const newItem: MealFoodItem = {
      id: `custom-${Date.now()}`,
      name: 'Custom Food Item',
      portionGrams: 100,
      portionUncertaintyGrams: 15,
      cookingMethod: 'raw',
      visibleIngredients: [],
      calories: 120,
      protein: 10,
      carbs: 12,
      fat: 3,
      isVerifiedUSDA: false,
    };
    setEditedItems([...editedItems, newItem]);
  };

  // Open USDA Search modal for a specific item
  const handleOpenUsdaSearch = (index: number) => {
    setUsdaSearchTargetIndex(index);
    setUsdaQuery(editedItems[index]?.name || '');
    setUsdaResults([]);
    setIsUsdaModalOpen(true);
    if (editedItems[index]?.name) {
      performUsdaSearch(editedItems[index].name);
    }
  };

  // Perform USDA Search
  const performUsdaSearch = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) return;
    setUsdaLoading(true);
    try {
      const res = await fetch(`/api/nutrition/usda-search?query=${encodeURIComponent(queryToSearch.trim())}`);
      const data = await res.json();
      if (data.results) {
        setUsdaResults(data.results);
      }
    } catch (e) {
      console.error('Error querying USDA:', e);
    } finally {
      setUsdaLoading(false);
    }
  };

  // Apply USDA Match to Item
  const handleApplyUsdaMatch = (match: any) => {
    if (usdaSearchTargetIndex === null) return;
    const updated = [...editedItems];
    const item = updated[usdaSearchTargetIndex];

    const portionGrams = item.portionGrams || 100;
    const scale = portionGrams / 100;

    item.name = match.description;
    item.isVerifiedUSDA = true;
    item.usdaMatch = {
      fdcId: match.fdcId,
      description: match.description,
      dataType: match.dataType,
      brandName: match.brandName,
      caloriesPer100g: match.caloriesPer100g,
      proteinPer100g: match.proteinPer100g,
      carbsPer100g: match.carbsPer100g,
      fatPer100g: match.fatPer100g,
      servingSize: match.servingSize,
      servingSizeUnit: match.servingSizeUnit,
    };
    item.calories = Math.round(match.caloriesPer100g * scale);
    item.protein = Math.round(match.proteinPer100g * scale * 10) / 10;
    item.carbs = Math.round(match.carbsPer100g * scale * 10) / 10;
    item.fat = Math.round(match.fatPer100g * scale * 10) / 10;

    setEditedItems(updated);
    setIsUsdaModalOpen(false);
  };

  // Save Confirmed Meal to Daily Food Diary
  const handleSaveToDiary = () => {
    if (editedItems.length === 0) return;

    const totals = recalculateEditedTotals(editedItems);
    const hasUsda = editedItems.some(i => i.isVerifiedUSDA);

    const entry: FoodDiaryEntry = {
      id: `diary-${Date.now()}`,
      date: new Date().toISOString(),
      mealType,
      name: editedMealName || 'Athletic Meal',
      totalCalories: totals.totalCalories,
      totalProtein: totals.totalProtein,
      totalCarbs: totals.totalCarbs,
      totalFat: totals.totalFat,
      uncertaintyRange: totals.uncertaintyRange,
      items: editedItems,
      fitnessGoal: activeFitnessGoal,
      supportiveFeedback: analysis?.goalFeedback.summary || 'Nutrient-rich athletic fuel supporting recovery and strength training.',
      imageThumbnail: selectedImage || undefined,
      hasUsdaVerifiedItems: hasUsda,
    };

    const updated = storage.addFoodDiaryEntry(entry);
    setDiaryEntries(updated);
    setIsSaved(true);
  };

  // Delete Diary Entry
  const handleDeleteDiaryEntry = (id: string) => {
    const updated = storage.deleteFoodDiaryEntry(id);
    setDiaryEntries(updated);
  };

  // Calculate Diary Daily Totals
  const filteredDiaryEntries = diaryEntries.filter(
    e => e.date.split('T')[0] === selectedDiaryDate
  );

  const dayTotalCalories = filteredDiaryEntries.reduce((acc, e) => acc + (e.totalCalories || 0), 0);
  const dayTotalProtein = filteredDiaryEntries.reduce((acc, e) => acc + (e.totalProtein || 0), 0);
  const dayTotalCarbs = filteredDiaryEntries.reduce((acc, e) => acc + (e.totalCarbs || 0), 0);
  const dayTotalFat = filteredDiaryEntries.reduce((acc, e) => acc + (e.totalFat || 0), 0);

  const targets = profile.nutritionTargets || {
    dailyCalories: 2600,
    dailyProteinGrams: 165,
    dailyCarbsGrams: 280,
    dailyFatGrams: 75,
  };

  // Calculate 7-day Weekly Trends Data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayEntries = diaryEntries.filter(e => e.date.split('T')[0] === dateStr);
    const calories = dayEntries.reduce((acc, e) => acc + e.totalCalories, 0);
    const protein = dayEntries.reduce((acc, e) => acc + e.totalProtein, 0);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    return { dateStr, dayLabel, calories, protein, count: dayEntries.length };
  });

  const weeklyAvgCalories = Math.round(
    last7Days.reduce((acc, d) => acc + d.calories, 0) / 7
  );
  const weeklyAvgProtein = Math.round(
    (last7Days.reduce((acc, d) => acc + d.protein, 0) / 7) * 10
  ) / 10;

  const currentTotals = recalculateEditedTotals(editedItems);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Sub-tab Navigation */}
      <div className="flex p-1 bg-[#090b12] border border-zinc-850 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-w-0 ${
            activeTab === 'scanner'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Camera className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Scan Meal</span>
        </button>
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-w-0 ${
            activeTab === 'diary'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Food Diary</span>
          {diaryEntries.length > 0 && (
            <span className="ml-0.5 text-[9px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono shrink-0">
              {filteredDiaryEntries.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-w-0 ${
            activeTab === 'trends'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-950/60'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Trends & Goals</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: AI FOOD SCANNER & MEAL PHOTO ANALYZER         */}
      {/* ==================================================== */}
      {activeTab === 'scanner' && (
        <div className="space-y-5">
          {/* Top Info Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#0a0c12] to-[#07080e] border border-emerald-900/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-300">
                Powered by <strong className="text-white">Gemini 3.8 Vision</strong> & cross-referenced with official <strong className="text-emerald-400">USDA FoodData Central</strong>.
              </span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-mono text-emerald-400">
              Verified Database
            </span>
          </div>

          {/* Photo Input & Preview Zone (Collapsible once Scanned) */}
          {selectedImage && analysis && isPhotoSetupCollapsed ? (
            <div className="p-3 rounded-2xl bg-[#08090e] border border-zinc-850 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center space-x-3 overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Scanned Meal" 
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-800 shrink-0 bg-black"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {mealType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/30">
                      {FITNESS_GOAL_DETAILS[activeFitnessGoal].label}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {userNotes ? userNotes : 'Scanned with Gemini 3.8 & USDA'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setIsPhotoSetupCollapsed(false)}
                  className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 flex items-center space-x-1 font-medium transition-all"
                  title="View or edit meal photo and options"
                >
                  <span>Photo & Setup</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setIsSaved(false);
                    setIsPhotoSetupCollapsed(false);
                  }}
                  className="p-1.5 rounded-xl bg-zinc-900 hover:bg-rose-950/30 border border-zinc-850 hover:border-rose-900/40 text-zinc-400 hover:text-rose-400 transition-all"
                  title="Scan another meal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                    <span>Photo Meal Scanner</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Capture your dish to automatically identify foods, estimate portions, and retrieve USDA nutrition.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {analysis && (
                    <button
                      onClick={() => setIsPhotoSetupCollapsed(true)}
                      className="px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs text-zinc-300 flex items-center space-x-1"
                    >
                      <span>Collapse</span>
                      <ChevronUp className="w-3 h-3 text-zinc-400" />
                    </button>
                  )}
                  {selectedImage && (
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysis(null);
                        setIsSaved(false);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Hidden Input Elements */}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={cameraInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <input 
                type="file" 
                accept="image/*" 
                ref={uploadInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />

              {!selectedImage ? (
                <div className="space-y-4">
                  {/* Drag / Drop / Capture Area */}
                  <div className="border-2 border-dashed border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 hover:border-zinc-700 transition-all bg-[#050609]/70">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center">
                      <Camera className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Snap or Upload Your Meal</h3>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                        Position your plate in good lighting. Gemini will identify foods, calculate portions with confidence ranges, and fetch USDA values.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take Photo</span>
                      </button>

                      <button
                        onClick={() => uploadInputRef.current?.click()}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0e0f17] hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all"
                      >
                        <Upload className="w-4 h-4 text-zinc-400" />
                        <span>Upload Existing Image</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Sample Meals for instant testing */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-zinc-500 font-mono uppercase text-[10px] font-bold">Or test with a sample meal:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SAMPLE_MEALS.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectSampleMeal(sample)}
                          className="p-2.5 rounded-2xl bg-[#06070a] border border-zinc-850 hover:border-emerald-800/50 text-left flex items-center space-x-2.5 active:scale-95 transition-all group"
                        >
                          <span className="text-xl p-1.5 rounded-xl bg-zinc-900 group-hover:bg-emerald-950/40 shrink-0">
                            {sample.icon}
                          </span>
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-white block truncate">{sample.title}</span>
                            <span className="text-[10px] text-zinc-500 truncate block">{sample.notes}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Selected Image Preview & Scan Options */
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 max-h-56 bg-[#040507] flex items-center justify-center">
                    <img 
                      src={selectedImage} 
                      alt="Meal Preview" 
                      className="max-h-56 w-full object-contain"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1.5">
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="p-2 rounded-xl bg-black/70 backdrop-blur-md text-white hover:bg-black text-xs active:scale-95 border border-white/10"
                        title="Retake photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => uploadInputRef.current?.click()}
                        className="p-2 rounded-xl bg-black/70 backdrop-blur-md text-white hover:bg-black text-xs active:scale-95 border border-white/10"
                        title="Choose another image"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contextual Options prior to scanning */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                        Meal Type:
                      </label>
                      <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value as any)}
                        className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="post_workout">Post-Workout Meal</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                        Active Fitness Goal:
                      </label>
                      <select
                        value={activeFitnessGoal}
                        onChange={(e) => {
                          const newGoal = e.target.value as FitnessGoal;
                          setActiveFitnessGoal(newGoal);
                          onUpdateProfile({ ...profile, fitnessGoal: newGoal });
                        }}
                        className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="muscle_building">💪 Muscle Building (Hypertrophy)</option>
                        <option value="maintenance">⚖️ Athletic Maintenance</option>
                        <option value="weight_management">🎯 Weight Management / Satiety</option>
                        <option value="endurance">⚡ High Performance / Endurance</option>
                      </select>
                    </div>
                  </div>

                  {/* User Notes Input */}
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Meal Notes / Ingredients (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cooked with 1 tbsp olive oil, skinless breast, post heavy deadlifts"
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Scan Action Button */}
                  <button
                    onClick={handleScanMeal}
                    disabled={isScanning}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-emerald-950/60 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? scanStep || 'Analyzing meal...' : 'Scan Meal with Gemini & USDA'}</span>
                  </button>

                  {scanError && (
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{scanError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* ANALYSIS RESULTS: STREAMLINED, COMPACT & GLANCEABLE   */}
          {/* ==================================================== */}
          {analysis && (
            <div ref={resultsRef} className="bg-[#08090e] border border-zinc-850 rounded-3xl p-3.5 sm:p-5 shadow-xl space-y-3.5">
              {/* Header: Title Editing & Instant Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-zinc-850/80 pb-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-bold">
                      Scan Results
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Editable Breakdown
                    </span>
                  </div>
                  <input
                    type="text"
                    value={editedMealName}
                    onChange={(e) => setEditedMealName(e.target.value)}
                    className="text-base sm:text-lg font-extrabold text-white bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-emerald-500 focus:outline-none w-full"
                    placeholder="Meal name"
                  />
                </div>

                {/* Instant Actions at Top (No Scrolling Required) */}
                <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={handleAddCustomItem}
                    className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-bold flex items-center space-x-1 transition-all active:scale-95"
                    title="Add a custom item to this meal"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Add Item</span>
                  </button>

                  <button
                    onClick={handleSaveToDiary}
                    disabled={isSaved}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all active:scale-95 ${
                      isSaved
                        ? 'bg-zinc-800 text-emerald-400 border border-emerald-800/50'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-950/60'
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Utensils className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved to Diary' : 'Save to Diary'}</span>
                  </button>
                </div>
              </div>

              {/* Compact Nutrition Snapshot (Glanceable Macro Bar) */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#050609] border border-zinc-800/90 space-y-2">
                {/* 4-Macro Numbers Grid */}
                <div className="grid grid-cols-4 gap-2 text-center sm:text-left">
                  {/* Calories */}
                  <div className="sm:border-r sm:border-zinc-850 sm:pr-2">
                    <div className="flex items-center justify-center sm:justify-start space-x-1 text-zinc-400 text-[10px] font-mono font-bold uppercase">
                      <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Calories</span>
                    </div>
                    <div className="mt-0.5">
                      <span className="text-lg sm:text-2xl font-mono font-extrabold text-white">
                        {currentTotals.totalCalories}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1">kcal</span>
                    </div>
                    <span 
                      className="text-[9px] font-mono text-zinc-500 block truncate"
                      title={`Estimated confidence: ${currentTotals.uncertaintyRange.minCalories} – ${currentTotals.uncertaintyRange.maxCalories} kcal`}
                    >
                      <span className="hidden sm:inline">±15% ({currentTotals.uncertaintyRange.minCalories}–{currentTotals.uncertaintyRange.maxCalories})</span>
                      <span className="sm:hidden">±15% est.</span>
                    </span>
                  </div>

                  {/* Protein */}
                  <div className="sm:border-r sm:border-zinc-850 sm:pr-2">
                    <div className="text-zinc-400 text-[10px] font-mono font-bold uppercase">
                      Protein
                    </div>
                    <div className="mt-0.5">
                      <span className="text-lg sm:text-2xl font-mono font-extrabold text-emerald-400">
                        {currentTotals.totalProtein}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1">g</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-500/80 block">
                      {Math.round((currentTotals.totalProtein * 4 / Math.max(1, currentTotals.totalCalories)) * 100)}% kcal
                    </span>
                  </div>

                  {/* Carbs */}
                  <div className="sm:border-r sm:border-zinc-850 sm:pr-2">
                    <div className="text-zinc-400 text-[10px] font-mono font-bold uppercase">
                      Carbs
                    </div>
                    <div className="mt-0.5">
                      <span className="text-lg sm:text-2xl font-mono font-extrabold text-cyan-400">
                        {currentTotals.totalCarbs}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1">g</span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-500/80 block">
                      {Math.round((currentTotals.totalCarbs * 4 / Math.max(1, currentTotals.totalCalories)) * 100)}% kcal
                    </span>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="text-zinc-400 text-[10px] font-mono font-bold uppercase">
                      Fat
                    </div>
                    <div className="mt-0.5">
                      <span className="text-lg sm:text-2xl font-mono font-extrabold text-amber-400">
                        {currentTotals.totalFat}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1">g</span>
                    </div>
                    <span className="text-[9px] font-mono text-amber-500/80 block">
                      {Math.round((currentTotals.totalFat * 9 / Math.max(1, currentTotals.totalCalories)) * 100)}% kcal
                    </span>
                  </div>
                </div>

                {/* Integrated Slim Macro Proportion Bar */}
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${Math.max(5, (currentTotals.totalProtein * 4 / Math.max(1, currentTotals.totalCalories)) * 100)}%` }} 
                    className="bg-emerald-500 h-full" 
                    title={`Protein: ${currentTotals.totalProtein}g`}
                  />
                  <div 
                    style={{ width: `${Math.max(5, (currentTotals.totalCarbs * 4 / Math.max(1, currentTotals.totalCalories)) * 100)}%` }} 
                    className="bg-cyan-500 h-full" 
                    title={`Carbs: ${currentTotals.totalCarbs}g`}
                  />
                  <div 
                    style={{ width: `${Math.max(5, (currentTotals.totalFat * 9 / Math.max(1, currentTotals.totalCalories)) * 100)}%` }} 
                    className="bg-amber-500 h-full" 
                    title={`Fat: ${currentTotals.totalFat}g`}
                  />
                </div>

                {/* Footnote: Database Verification & Uncertainty */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-0.5">
                  <span className="flex items-center space-x-1 text-emerald-400/90 truncate">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{editedItems.filter(i => i.isVerifiedUSDA).length}/{editedItems.length} items USDA Verified</span>
                  </span>
                  <span>Portions ±15-20% uncertainty</span>
                </div>
              </div>

              {/* Mobile Quick Switcher (< lg) */}
              <div className="flex lg:hidden p-1 bg-[#050609] border border-zinc-800 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setMobileResultView('foods')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mobileResultView === 'foods'
                      ? 'bg-zinc-800 text-emerald-400 shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Foods ({editedItems.length})
                </button>
                <button
                  onClick={() => setMobileResultView('coach')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mobileResultView === 'coach'
                      ? 'bg-zinc-800 text-emerald-400 shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Goal Alignment
                </button>
                <button
                  onClick={() => setMobileResultView('all')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mobileResultView === 'all'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  All
                </button>
              </div>

              {/* Responsive Layout: Side-by-Side on Tablet/Desktop, Compact on Mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                {/* Left: Identified Foods & Portion Adjuster (lg:col-span-7) */}
                {(mobileResultView === 'all' || mobileResultView === 'foods') && (
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex items-center justify-between text-xs px-0.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Identified Foods ({editedItems.length})
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        Adjust grams or cooking to update macros
                      </span>
                    </div>

                    <div className="space-y-2">
                      {editedItems.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-2.5 rounded-xl bg-[#050609] border border-zinc-850 hover:border-zinc-800 transition-all space-y-2"
                        >
                          {/* Top Row: Food Name, USDA Status, Macros & Quick Actions */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const updated = [...editedItems];
                                  updated[idx].name = e.target.value;
                                  setEditedItems(updated);
                                }}
                                className="font-bold text-xs text-white bg-transparent border-b border-transparent hover:border-zinc-750 focus:border-emerald-500 focus:outline-none truncate w-full"
                              />
                              {item.isVerifiedUSDA ? (
                                <button
                                  onClick={() => handleOpenUsdaSearch(idx)}
                                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 shrink-0 hover:bg-emerald-900/60"
                                  title={`USDA FDC #${item.usdaMatch?.fdcId} - Click to change match`}
                                >
                                  ✓ USDA
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleOpenUsdaSearch(idx)}
                                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-850 hover:bg-zinc-700 text-zinc-400 shrink-0"
                                  title="Click to search official USDA database"
                                >
                                  AI Est.
                                </button>
                              )}
                            </div>

                            {/* Desktop Macro Summary & Actions */}
                            <div className="flex items-center space-x-1.5 shrink-0">
                              <div className="text-[10px] font-mono text-right hidden sm:block">
                                <span className="font-bold text-white mr-1.5">{item.calories} kcal</span>
                                <span className="text-emerald-400 font-semibold mr-1">P:{item.protein}g</span>
                                <span className="text-cyan-400 font-semibold mr-1">C:{item.carbs}g</span>
                                <span className="text-amber-400 font-semibold">F:{item.fat}g</span>
                              </div>
                              
                              <button
                                onClick={() => handleOpenUsdaSearch(idx)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-850"
                                title="Match official USDA record"
                              >
                                <Search className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setExpandedItemIndex(expandedItemIndex === idx ? null : idx)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-850"
                                title="Details & cooking method"
                              >
                                {expandedItemIndex === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleRemoveItem(idx)}
                                className="p-1 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20"
                                title="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Control Row: Stepper, Cooking Method, and Mobile Macros */}
                          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-zinc-850/60 text-xs">
                            {/* Portion Stepper */}
                            <div className="flex items-center space-x-1.5 shrink-0">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase">Portion:</span>
                              <div className="flex items-center space-x-1 bg-[#090b12] border border-zinc-800 rounded-lg px-1 py-0.5">
                                <button
                                  onClick={() => handleUpdateItemPortion(idx, item.portionGrams - 10)}
                                  className="w-4 h-4 text-xs text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.portionGrams}
                                  onChange={(e) => handleUpdateItemPortion(idx, parseInt(e.target.value) || 10)}
                                  className="w-10 text-center font-mono font-bold text-xs text-white bg-transparent focus:outline-none"
                                />
                                <span className="text-[10px] text-zinc-500">g</span>
                                <button
                                  onClick={() => handleUpdateItemPortion(idx, item.portionGrams + 10)}
                                  className="w-4 h-4 text-xs text-zinc-400 hover:text-white flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Cooking Method Dropdown */}
                            <div className="flex items-center space-x-1 shrink-0">
                              <select
                                value={item.cookingMethod}
                                onChange={(e) => handleUpdateCookingMethod(idx, e.target.value as CookingMethod)}
                                className="bg-[#090b12] border border-zinc-800 rounded-lg px-1.5 py-0.5 text-[10px] text-zinc-300 focus:outline-none focus:border-emerald-500 max-w-[110px]"
                              >
                                {COOKING_METHODS.map((m) => (
                                  <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                              </select>
                            </div>

                            {/* Mobile Inline Macro Display */}
                            <div className="flex items-center space-x-1.5 text-[10px] font-mono sm:hidden shrink-0">
                              <span className="text-white font-bold">{item.calories}k</span>
                              <span className="text-emerald-400">P{item.protein}</span>
                              <span className="text-cyan-400">C{item.carbs}</span>
                              <span className="text-amber-400">F{item.fat}</span>
                            </div>
                          </div>

                          {/* Optional Expanded Drawer (USDA Match info) */}
                          {expandedItemIndex === idx && item.usdaMatch && (
                            <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[10px] text-zinc-400 space-y-0.5">
                              <div className="flex items-center justify-between text-zinc-300">
                                <span className="truncate font-semibold">{item.usdaMatch.description}</span>
                                <span className="font-mono text-emerald-400 text-[9px]">FDC #{item.usdaMatch.fdcId}</span>
                              </div>
                              {item.usdaMatch.brandName && (
                                <div className="text-zinc-500">Brand: {item.usdaMatch.brandName}</div>
                              )}
                              <div className="font-mono text-zinc-500 text-[9px]">
                                Per 100g: {item.usdaMatch.caloriesPer100g} kcal · P:{item.usdaMatch.proteinPer100g}g · C:{item.usdaMatch.carbsPer100g}g · F:{item.usdaMatch.fatPer100g}g
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Right: AI Goal Alignment & Coach Verdict (lg:col-span-5) */}
                {(mobileResultView === 'all' || mobileResultView === 'coach') && (
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/25 via-[#050609] to-[#040507] border border-emerald-900/40 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs">
                          <span className="text-base">{FITNESS_GOAL_DETAILS[activeFitnessGoal].icon}</span>
                          <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold">
                            {FITNESS_GOAL_DETAILS[activeFitnessGoal].label}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {Math.round((currentTotals.totalProtein / targets.dailyProteinGrams) * 100)}% daily protein
                        </span>
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed">
                        {analysis.goalFeedback.summary}
                      </p>

                      {analysis.goalFeedback.highlights && analysis.goalFeedback.highlights.length > 0 && (
                        <div className="space-y-1 pt-1.5 border-t border-zinc-850/60">
                          {analysis.goalFeedback.highlights.map((h, i) => (
                            <div key={i} className="flex items-start space-x-1.5 text-[11px] text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Secondary Save to Diary Button at bottom of column */}
                    <button
                      onClick={handleSaveToDiary}
                      disabled={isSaved}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-95 ${
                        isSaved
                          ? 'bg-zinc-800 text-emerald-400 border border-emerald-800/40'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-950/60'
                      }`}
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
                      <span>{isSaved ? 'Meal Saved in Diary' : 'Save Meal to Food Diary'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: DAILY FOOD DIARY                              */}
      {/* ==================================================== */}
      {activeTab === 'diary' && (
        <div className="space-y-5">
          {/* Day Selector & Daily Macro Summary */}
          <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Daily Nutrition Tracker
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Food Diary
                </h2>
              </div>

              {/* Date Input */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  value={selectedDiaryDate}
                  onChange={(e) => setSelectedDiaryDate(e.target.value)}
                  className="bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Daily Macro Progress Bars vs Targets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Calories */}
              <div className="p-3 rounded-2xl bg-[#050609] border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Calories</span>
                  <span>{Math.round((dayTotalCalories / targets.dailyCalories) * 100)}%</span>
                </div>
                <div className="text-base font-extrabold font-mono text-white">
                  {dayTotalCalories} <span className="text-[10px] text-zinc-500">/ {targets.dailyCalories} kcal</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((dayTotalCalories / targets.dailyCalories) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Protein */}
              <div className="p-3 rounded-2xl bg-[#050609] border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Protein</span>
                  <span>{Math.round((dayTotalProtein / targets.dailyProteinGrams) * 100)}%</span>
                </div>
                <div className="text-base font-extrabold font-mono text-emerald-400">
                  {Math.round(dayTotalProtein)} <span className="text-[10px] text-zinc-500">/ {targets.dailyProteinGrams} g</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((dayTotalProtein / targets.dailyProteinGrams) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div className="p-3 rounded-2xl bg-[#050609] border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Carbs</span>
                  <span>{Math.round((dayTotalCarbs / targets.dailyCarbsGrams) * 100)}%</span>
                </div>
                <div className="text-base font-extrabold font-mono text-cyan-400">
                  {Math.round(dayTotalCarbs)} <span className="text-[10px] text-zinc-500">/ {targets.dailyCarbsGrams} g</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((dayTotalCarbs / targets.dailyCarbsGrams) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Fat */}
              <div className="p-3 rounded-2xl bg-[#050609] border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Fat</span>
                  <span>{Math.round((dayTotalFat / targets.dailyFatGrams) * 100)}%</span>
                </div>
                <div className="text-base font-extrabold font-mono text-amber-400">
                  {Math.round(dayTotalFat)} <span className="text-[10px] text-zinc-500">/ {targets.dailyFatGrams} g</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((dayTotalFat / targets.dailyFatGrams) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Meals Logged Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="font-mono uppercase font-bold text-[10px]">Meals Logged for {selectedDiaryDate}</span>
              <button
                onClick={() => setActiveTab('scanner')}
                className="text-emerald-400 font-bold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Scan New Meal</span>
              </button>
            </div>

            {filteredDiaryEntries.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#08090e] border border-zinc-850 text-center space-y-3">
                <Utensils className="w-8 h-8 text-zinc-600 mx-auto" />
                <h4 className="text-sm font-bold text-zinc-300">No Meals Logged on this Date</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Take a photo of your breakfast, lunch, or post-workout meal to record your macros and fuel your workouts.
                </p>
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                >
                  Scan a Meal Now
                </button>
              </div>
            ) : (
              filteredDiaryEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-3xl bg-[#08090e] border border-zinc-850 shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      {entry.imageThumbnail ? (
                        <img
                          src={entry.imageThumbnail}
                          alt={entry.name}
                          className="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                          <Utensils className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-850 text-emerald-400 font-bold">
                            {entry.mealType.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {entry.hasUsdaVerifiedItems && (
                            <span className="text-[9px] font-mono text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-950/40 border border-emerald-800/30">
                              USDA
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{entry.name}</h4>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteDiaryEntry(entry.id)}
                      className="text-zinc-600 hover:text-rose-400 p-1"
                      title="Delete meal entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Macro Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-[#050609] border border-zinc-800 text-xs font-mono font-bold text-white">
                      {entry.totalCalories} kcal
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#050609] border border-zinc-800 text-xs font-mono text-emerald-400 font-bold">
                      {entry.totalProtein}g Protein
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#050609] border border-zinc-800 text-xs font-mono text-cyan-400 font-bold">
                      {entry.totalCarbs}g Carbs
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#050609] border border-zinc-800 text-xs font-mono text-amber-400 font-bold">
                      {entry.totalFat}g Fat
                    </span>
                  </div>

                  {/* Expandable Ingredients Details */}
                  {entry.items && entry.items.length > 0 && (
                    <div className="pt-1 border-t border-zinc-850/60">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Items logged:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                        {entry.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-[#050609] px-2.5 py-1 rounded-lg border border-zinc-850/80">
                            <span className="truncate pr-2">{it.portionGrams}g {it.name}</span>
                            <span className="font-mono text-[10px] text-zinc-400 shrink-0">{it.calories} kcal</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Supportive Feedback snippet */}
                  {entry.supportiveFeedback && (
                    <p className="text-[11px] text-zinc-400 italic pt-1">
                      "{entry.supportiveFeedback}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: WEEKLY NUTRITION TRENDS & GOAL SETTINGS       */}
      {/* ==================================================== */}
      {activeTab === 'trends' && (
        <div className="space-y-5">
          {/* 7-Day Performance & Macro Overview */}
          <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                7-Day Analytics
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Weekly Nutrition Trends
              </h2>
            </div>

            {/* Weekly KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#050609] border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">7-Day Avg Calories</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-white mt-0.5 block">
                  {weeklyAvgCalories} <span className="text-xs text-zinc-500">kcal/d</span>
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Target: {targets.dailyCalories} kcal
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#050609] border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">7-Day Avg Protein</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400 mt-0.5 block">
                  {weeklyAvgProtein} <span className="text-xs text-zinc-500">g/d</span>
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Target: {targets.dailyProteinGrams} g
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#050609] border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Total Meals Scanned</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-teal-300 mt-0.5 block">
                  {diaryEntries.length}
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Consistent logging habit
                </span>
              </div>
            </div>

            {/* 7-Day Calorie Intake Bar Graph */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-zinc-400 uppercase text-[10px] font-bold">Daily Calorie Intake (Last 7 Days)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Goal: {targets.dailyCalories} kcal</span>
              </div>

              <div className="h-32 bg-[#050609] border border-zinc-850 rounded-2xl p-3 flex items-end justify-between gap-2">
                {last7Days.map((d, i) => {
                  const pct = Math.min(100, Math.round((d.calories / targets.dailyCalories) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="relative w-full flex justify-center">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[9px] font-mono text-white bg-zinc-900 px-1 rounded transition-opacity">
                          {d.calories}k
                        </span>
                      </div>
                      <div 
                        className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                          d.calories >= targets.dailyCalories * 0.85
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                            : d.calories > 0
                              ? 'bg-zinc-700'
                              : 'bg-zinc-900'
                        }`}
                        style={{ height: `${Math.max(8, pct)}%` }}
                      />
                      <span className="text-[10px] font-mono text-zinc-500 mt-1.5">{d.dayLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7-Day Protein Intake Bar Graph */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-zinc-400 uppercase text-[10px] font-bold">Daily Protein Intake (Last 7 Days)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Goal: {targets.dailyProteinGrams} g</span>
              </div>

              <div className="h-28 bg-[#050609] border border-zinc-850 rounded-2xl p-3 flex items-end justify-between gap-2">
                {last7Days.map((d, i) => {
                  const pct = Math.min(100, Math.round((d.protein / targets.dailyProteinGrams) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div 
                        className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                          d.protein >= targets.dailyProteinGrams * 0.85
                            ? 'bg-emerald-500'
                            : d.protein > 0
                              ? 'bg-emerald-900/60'
                              : 'bg-zinc-900'
                        }`}
                        style={{ height: `${Math.max(8, pct)}%` }}
                      />
                      <span className="text-[10px] font-mono text-zinc-500 mt-1.5">{d.dayLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fitness Goal & Macro Targets Customizer */}
          <div className="bg-[#08090e] border border-zinc-850 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Personalized Blueprint
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Fitness Goals & Nutrition Targets
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Saved targets adjust AI scanner feedback, daily benchmarks, and goal analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(FITNESS_GOAL_DETAILS).map(([key, details]) => {
                const isSelected = activeFitnessGoal === key;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      const newGoal = key as FitnessGoal;
                      setActiveFitnessGoal(newGoal);
                      onUpdateProfile({ ...profile, fitnessGoal: newGoal });
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-950/20 border-emerald-500/80 shadow-md shadow-emerald-950/40'
                        : 'bg-[#050609] border-zinc-850 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{details.icon}</span>
                        <span className="text-xs font-bold text-white">{details.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                      {details.description}
                    </p>
                    <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                      {details.targetNote}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Custom Daily Macro Budget Inputs */}
            <div className="pt-2 border-t border-zinc-850/60 space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
                Daily Macronutrient Targets
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={targets.dailyCalories}
                    onChange={(e) => {
                      const updatedTargets = { ...targets, dailyCalories: parseInt(e.target.value) || 2000 };
                      onUpdateProfile({ ...profile, nutritionTargets: updatedTargets });
                    }}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={targets.dailyProteinGrams}
                    onChange={(e) => {
                      const updatedTargets = { ...targets, dailyProteinGrams: parseInt(e.target.value) || 150 };
                      onUpdateProfile({ ...profile, nutritionTargets: updatedTargets });
                    }}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={targets.dailyCarbsGrams}
                    onChange={(e) => {
                      const updatedTargets = { ...targets, dailyCarbsGrams: parseInt(e.target.value) || 200 };
                      onUpdateProfile({ ...profile, nutritionTargets: updatedTargets });
                    }}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={targets.dailyFatGrams}
                    onChange={(e) => {
                      const updatedTargets = { ...targets, dailyFatGrams: parseInt(e.target.value) || 70 };
                      onUpdateProfile({ ...profile, nutritionTargets: updatedTargets });
                    }}
                    className="w-full bg-[#050609] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* USDA FOODDATA CENTRAL SEARCH MODAL                   */}
      {/* ==================================================== */}
      {isUsdaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#090b12] border border-zinc-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-zinc-850 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>USDA FoodData Central Database</span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Search official USDA nutrition records for accurate macro matching.
                </p>
              </div>
              <button
                onClick={() => setIsUsdaModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Input */}
            <div className="p-4 border-b border-zinc-850 bg-[#06070a]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  performUsdaSearch(usdaQuery);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="e.g. Chicken breast, brown rice, olive oil, salmon..."
                  value={usdaQuery}
                  onChange={(e) => setUsdaQuery(e.target.value)}
                  className="flex-1 bg-[#050609] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!usdaQuery.trim() || usdaLoading}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1 shrink-0 active:scale-95 disabled:opacity-40"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {usdaLoading ? (
                <div className="py-12 text-center text-xs text-zinc-400 animate-pulse">
                  Querying USDA FoodData Central...
                </div>
              ) : usdaResults.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  Type an ingredient above to find verified USDA nutrient records.
                </div>
              ) : (
                usdaResults.map((item: any) => (
                  <div
                    key={item.fdcId}
                    onClick={() => handleApplyUsdaMatch(item)}
                    className="p-3 rounded-2xl bg-[#050609] border border-zinc-850 hover:border-emerald-800/60 cursor-pointer active:scale-98 transition-all space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-white block">{item.description}</span>
                        <div className="flex items-center space-x-2 text-[10px] text-zinc-500 mt-0.5">
                          <span>FDC #{item.fdcId}</span>
                          <span>·</span>
                          <span className="text-emerald-400">{item.dataType}</span>
                          {item.brandName && (
                            <>
                              <span>·</span>
                              <span className="text-zinc-400 truncate max-w-[120px]">{item.brandName}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/30 shrink-0">
                        Select
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-850/60">
                      <span>Per 100g: <strong className="text-white">{item.caloriesPer100g} kcal</strong></span>
                      <span>P: <strong className="text-emerald-400">{item.proteinPer100g}g</strong></span>
                      <span>C: <strong className="text-cyan-400">{item.carbsPer100g}g</strong></span>
                      <span>F: <strong className="text-amber-400">{item.fatPer100g}g</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
