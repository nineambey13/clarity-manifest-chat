'use client';

import { useState } from 'react';
import { Heart, Brain, Briefcase, User, Sparkles, HeartHandshake, Users, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLifeBlueprint } from './life-blueprint-context';

export interface LifeCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const LIFE_CATEGORIES: LifeCategory[] = [
  {
    id: 'health',
    name: 'Health & Vitality',
    icon: Heart,
    description: 'Physical health, energy, and wellness'
  },
  {
    id: 'mind',
    name: 'Mind & Emotional Mastery',
    icon: Brain,
    description: 'Mental clarity, emotional intelligence, and resilience'
  },
  {
    id: 'work',
    name: 'Work & Financial Life',
    icon: Briefcase,
    description: 'Career, finances, and professional growth'
  },
  {
    id: 'character',
    name: 'Character, Identity & Purpose',
    icon: User,
    description: 'Core values, personal identity, and life purpose'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Growth',
    icon: Sparkles,
    description: 'Spiritual development and inner peace'
  },
  {
    id: 'relationships',
    name: 'Love & Relationships',
    icon: HeartHandshake,
    description: 'Romantic relationships and deep connections'
  },
  {
    id: 'parenting',
    name: 'Parenting & Family Legacy',
    icon: Users,
    description: 'Family relationships and legacy building'
  },
  {
    id: 'social',
    name: 'Social Life & Influence',
    icon: Globe,
    description: 'Social connections and community impact'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Freedom',
    icon: Zap,
    description: 'Daily habits, freedom, and life design'
  }
];

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onSave: () => void;
}

export function CategorySelector({ 
  selectedCategories, 
  onCategoriesChange, 
  onSave 
}: CategorySelectorProps) {
  const [visibleCategories, setVisibleCategories] = useState(6);
  const { setSelectedCategories } = useLifeBlueprint();

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'health') return; // Health is pre-selected and locked
    
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onCategoriesChange(newSelected);
    setSelectedCategories(newSelected);
    
    // Progressive reveal logic
    const additionalSelected = newSelected.filter(id => id !== 'health').length;
    if (additionalSelected === 1) {
      setVisibleCategories(8); // Show 2 more categories
    } else if (additionalSelected === 2) {
      setVisibleCategories(9); // Show all categories
    }
  };

  const isHealthSelected = selectedCategories.includes('health');
  const additionalSelected = selectedCategories.filter(id => id !== 'health').length;
  const canProceed = isHealthSelected && additionalSelected >= 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <span className="text-sm text-gray-500">Step 1 of 2</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To get started, choose each area of life you'd like to create a blueprint for.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {LIFE_CATEGORIES.slice(0, visibleCategories).map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const isHealth = category.id === 'health';
          const Icon = category.icon;

          return (
            <Card
              key={category.id}
              className={cn(
                "p-3 cursor-pointer transition-all duration-200 border-2 hover:border-blue-300",
                isSelected 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                  : "border-gray-200 hover:border-gray-300",
                isHealth && "border-green-500 bg-green-50 dark:bg-green-950/20"
              )}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isSelected 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 text-gray-600",
                  isHealth && "bg-green-500 text-white"
                )}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-xs font-medium truncate",
                    isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-700",
                    isHealth && "text-green-700 dark:text-green-300"
                  )}>
                    {category.name}
                  </div>
                </div>
                {isSelected && (
                  <div className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center text-white text-xs",
                    isHealth ? "bg-green-500" : "bg-blue-500"
                  )}>
                    ✓
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Helper Text */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Health & Vitality is your foundation. {additionalSelected === 0 
            ? "Add other areas or continue with Health alone." 
            : `You've selected ${additionalSelected + 1} area${additionalSelected > 0 ? 's' : ''}.`
          }
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          onClick={onSave}
          disabled={!canProceed}
          className={cn(
            "px-8 py-2",
            canProceed 
              ? "bg-blue-500 hover:bg-blue-600" 
              : "bg-gray-300 cursor-not-allowed"
          )}
        >
          Save Categories
        </Button>
      </div>
    </div>
  );
}
