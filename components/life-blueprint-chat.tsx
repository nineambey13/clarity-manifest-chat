'use client';

import { Chat } from './chat';
import { LifeBlueprintOnboarding } from './life-blueprint-onboarding';
import type { Session } from 'next-auth';
import type { ChatMessage } from '@/lib/types';
import type { VisibilityType } from './visibility-selector';
import { useLifeBlueprint } from './life-blueprint-context';

interface LifeBlueprintChatProps {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}

export function LifeBlueprintChat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: LifeBlueprintChatProps) {
  const { state, setSelectedCategories, setOnboardingComplete, setVisionAnswers } = useLifeBlueprint();

  const handleOnboardingComplete = (data: {
    selectedCategories: string[];
    visionAnswers: {
      idealLife: string;
      desires: string;
      struggles: string;
    };
  }) => {
    setSelectedCategories(data.selectedCategories);
    setVisionAnswers(data.visionAnswers);
    setOnboardingComplete(true);
  };

  // Create initial onboarding messages when not complete
  const onboardingMessages = !state.onboardingComplete ? [
    {
      id: 'onboarding-welcome',
      role: 'assistant' as const,
      parts: [{ type: 'text' as const, text: 'Welcome! I\'m here to help you create your Life Blueprint. Let\'s start by choosing the areas of life you\'d like to focus on.' }],
      createdAt: new Date(),
    }
  ] : [];

  // Combine onboarding messages with regular messages
  const allMessages = [...onboardingMessages, ...initialMessages];

  return (
    <Chat
      id={id}
      initialMessages={allMessages}
      initialChatModel={initialChatModel}
      initialVisibilityType={initialVisibilityType}
      isReadonly={isReadonly}
      session={session}
      autoResume={autoResume}
    />
  );
}
