'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Heart, Brain, Briefcase, User, Sparkles, HeartHandshake, Users, Globe, Zap } from 'lucide-react';
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

interface OnboardingMessageProps {
  step: 'categories' | 'vision';
  onComplete: (data: {
    selectedCategories: string[];
    visionAnswers: {
      idealLife: string;
      desires: string;
      struggles: string;
    };
  }) => void;
}

export function OnboardingMessage({ step, onComplete }: OnboardingMessageProps) {
  const { state, setSelectedCategories } = useLifeBlueprint();
  const [selectedCategories, setSelectedCategoriesLocal] = useState<string[]>(['health']);
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [currentStep, setCurrentStep] = useState<'categories' | 'vision'>('categories');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visionAnswers, setVisionAnswers] = useState({
    idealLife: '',
    desires: '',
    struggles: ''
  });

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'health') return; // Health is pre-selected and locked
    
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategoriesLocal(newSelected);
    setSelectedCategories(newSelected);
    
    // Progressive reveal logic
    const additionalSelected = newSelected.filter(id => id !== 'health').length;
    if (additionalSelected === 1) {
      setVisibleCategories(8); // Show 2 more categories
    } else if (additionalSelected === 2) {
      setVisibleCategories(9); // Show all categories
    }
  };

  const handleCategoriesSave = () => {
    setSelectedCategories(selectedCategories);
    setCurrentStep('vision');
  };

  const handleVisionComplete = (answers: {
    idealLife: string;
    desires: string;
    struggles: string;
  }) => {
    onComplete({
      selectedCategories,
      visionAnswers: answers
    });
  };

  const questions = [
    {
      id: 'idealLife',
      title: 'What does your ideal life look like?',
      placeholder: 'Describe your vision of an ideal life - what would make you truly happy and fulfilled?',
      description: 'Think about all aspects: health, relationships, career, personal growth, and lifestyle.'
    },
    {
      id: 'desires',
      title: 'If you could have it any way, what would you ask for?',
      placeholder: 'What are your deepest desires and dreams? What would you wish for if there were no limitations?',
      description: 'Be bold and honest - this is your chance to dream without constraints.'
    },
    {
      id: 'struggles',
      title: 'Is there anything you\'re currently struggling with or want to focus on first?',
      placeholder: 'What challenges are you facing right now? What area of life needs the most attention?',
      description: 'This helps us prioritize and create a focused action plan.'
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setVisionAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleVisionComplete(visionAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = visionAnswers[currentQuestionData.id as keyof typeof visionAnswers];
  const canProceed = currentAnswer.trim().length > 0;

  const isHealthSelected = selectedCategories.includes('health');
  const additionalSelected = selectedCategories.filter(id => id !== 'health').length;
  const canProceedCategories = isHealthSelected && additionalSelected >= 0;

  if (currentStep === 'categories') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Choose each area of life you'd like to create a blueprint for:
        </div>
        
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

        <div className="text-sm text-gray-600">
          Health & Vitality is your foundation. {additionalSelected === 0 
            ? "Add other areas or continue with Health alone." 
            : `You've selected ${additionalSelected + 1} area${additionalSelected > 0 ? 's' : ''}.`
          }
        </div>

        <Button
          onClick={handleCategoriesSave}
          disabled={!canProceedCategories}
          className={cn(
            "px-4 py-2",
            canProceedCategories 
              ? "bg-blue-500 hover:bg-blue-600" 
              : "bg-gray-300 cursor-not-allowed"
          )}
        >
          Continue
        </Button>
      </div>
    );
  }

  if (currentStep === 'vision') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Now let's understand your vision better. Please answer this question:
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">{currentQuestionData.title}</h3>
          <p className="text-sm text-gray-600">{currentQuestionData.description}</p>
          
          <Textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
            placeholder={currentQuestionData.placeholder}
            className="min-h-[100px] resize-none"
          />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              size="sm"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className={cn(
                canProceed 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-gray-300 cursor-not-allowed"
              )}
              size="sm"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
