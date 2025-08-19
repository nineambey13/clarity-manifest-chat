'use client';

import { useState } from 'react';
import { CategorySelector } from './category-selector';
import { VisionQuestions } from './vision-questions';

interface OnboardingData {
  selectedCategories: string[];
  visionAnswers: {
    idealLife: string;
    desires: string;
    struggles: string;
  };
}

interface LifeBlueprintOnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export function LifeBlueprintOnboarding({ onComplete }: LifeBlueprintOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<'categories' | 'vision'>('categories');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['health']);
  const [visionAnswers, setVisionAnswers] = useState({
    idealLife: '',
    desires: '',
    struggles: ''
  });

  const handleCategoriesSave = () => {
    setCurrentStep('vision');
  };

  const handleVisionComplete = (answers: {
    idealLife: string;
    desires: string;
    struggles: string;
  }) => {
    setVisionAnswers(answers);
    onComplete({
      selectedCategories,
      visionAnswers: answers
    });
  };

  return (
    <>
      {currentStep === 'categories' && (
        <CategorySelector
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          onSave={handleCategoriesSave}
        />
      )}
      
      {currentStep === 'vision' && (
        <VisionQuestions
          onComplete={handleVisionComplete}
        />
      )}
    </>
  );
}
