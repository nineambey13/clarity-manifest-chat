'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, Target } from 'lucide-react';
import { useLifeBlueprint } from './life-blueprint-context';
import { LIFE_CATEGORIES } from './category-selector';

export function LifeBlueprintGreeting() {
  const { state } = useLifeBlueprint();

  const selectedCategoryNames = state.selectedCategories.map(categoryId => {
    const category = LIFE_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 space-y-8">
      <div className="text-center space-y-4 max-w-2xl">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Your Life Blueprint
        </h1>
        
        <p className="text-lg text-gray-600">
          Your personalized journey to creating the life you've always dreamed of begins now.
        </p>
      </div>

      <Card className="p-6 w-full max-w-2xl">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Your Selected Life Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedCategoryNames.map((categoryName, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  {categoryName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="text-center space-y-4 max-w-2xl">
        <h3 className="text-xl font-semibold">Ready to Begin?</h3>
        <p className="text-gray-600">
          Start with Chapter 1: Health & Vitality, or choose any chapter from the sidebar to begin crafting your life blueprint.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Heart className="w-4 h-4 mr-2" />
            Start with Health & Vitality
          </Button>
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Choose a Different Chapter
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 max-w-xl">
        <p>
          Your vision answers have been saved and will guide our conversation as we work together to create actionable steps for each area of your life.
        </p>
      </div>
    </div>
  );
}
