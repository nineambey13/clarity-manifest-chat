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



  return (
    <Chat
      id={id}
      initialMessages={initialMessages}
      initialChatModel={initialChatModel}
      initialVisibilityType={initialVisibilityType}
      isReadonly={isReadonly}
      session={session}
      autoResume={autoResume}
    />
  );
}
