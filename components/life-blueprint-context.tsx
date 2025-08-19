'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LifeBlueprintState {
  selectedCategories: string[];
  onboardingComplete: boolean;
  activeChapter: string;
  visionAnswers: {
    idealLife: string;
    desires: string;
    struggles: string;
  };
}

interface LifeBlueprintContextType {
  state: LifeBlueprintState;
  setSelectedCategories: (categories: string[]) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setActiveChapter: (chapter: string) => void;
  setVisionAnswers: (answers: {
    idealLife: string;
    desires: string;
    struggles: string;
  }) => void;
  resetState: () => void;
}

const defaultState: LifeBlueprintState = {
  selectedCategories: ['health'],
  onboardingComplete: false,
  activeChapter: '',
  visionAnswers: {
    idealLife: '',
    desires: '',
    struggles: ''
  }
};

const LifeBlueprintContext = createContext<LifeBlueprintContextType | undefined>(undefined);

export function LifeBlueprintProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LifeBlueprintState>(defaultState);

  const setSelectedCategories = (categories: string[]) => {
    setState(prev => ({ ...prev, selectedCategories: categories }));
  };

  const setOnboardingComplete = (complete: boolean) => {
    setState(prev => ({ ...prev, onboardingComplete: complete }));
  };

  const setActiveChapter = (chapter: string) => {
    setState(prev => ({ ...prev, activeChapter: chapter }));
  };

  const setVisionAnswers = (answers: {
    idealLife: string;
    desires: string;
    struggles: string;
  }) => {
    setState(prev => ({ ...prev, visionAnswers: answers }));
  };

  const resetState = () => {
    setState(defaultState);
  };

  return (
    <LifeBlueprintContext.Provider
      value={{
        state,
        setSelectedCategories,
        setOnboardingComplete,
        setActiveChapter,
        setVisionAnswers,
        resetState
      }}
    >
      {children}
    </LifeBlueprintContext.Provider>
  );
}

export function useLifeBlueprint() {
  const context = useContext(LifeBlueprintContext);
  if (context === undefined) {
    throw new Error('useLifeBlueprint must be used within a LifeBlueprintProvider');
  }
  return context;
}
