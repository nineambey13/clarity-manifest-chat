'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface VisionQuestionsProps {
  onComplete: (answers: {
    idealLife: string;
    desires: string;
    struggles: string;
  }) => void;
}

export function VisionQuestions({ onComplete }: VisionQuestionsProps) {
  const [answers, setAnswers] = useState({
    idealLife: '',
    desires: '',
    struggles: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

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
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id as keyof typeof answers];
  const canProceed = currentAnswer.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <span className="text-sm text-gray-500">Step 2 of 2</span>
      </div>

      {/* Question Progress */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === currentQuestion 
                  ? "bg-blue-500" 
                  : index < currentQuestion 
                    ? "bg-green-500" 
                    : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-center">
            {currentQuestionData.title}
          </h2>
          <p className="text-sm text-gray-600 text-center">
            {currentQuestionData.description}
          </p>
        </div>

        <Textarea
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
          placeholder={currentQuestionData.placeholder}
          className="min-h-[120px] resize-none"
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
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
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </Card>

      {/* Helper Text */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Take your time to reflect on each question. Your answers will help create a personalized life blueprint.
        </p>
      </div>
    </div>
  );
}
