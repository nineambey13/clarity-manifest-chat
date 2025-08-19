# Life Blueprint System

## Overview

The Life Blueprint system transforms the Vercel AI chat into a chapter-based life planning application. Users go through an onboarding process to select life areas and answer vision questions, then work through personalized chapters to create their life blueprint.

## Key Features

### Header Changes
- ✅ Removed "Chat model" dropdown
- ✅ Added "Manifest" title with pen icon in center
- ✅ Replaced "+ New Chat" with "Next" button
- ✅ Kept sidebar toggle button

### Sidebar Modifications
- ✅ Shows "Chapters" as header
- ✅ Displays dynamically generated chapters based on selected categories
- ✅ Chapter format: "Chapter 1 - Health & Vitality", etc.
- ✅ Health & Vitality always appears as Chapter 1

### Category Selection
- ✅ Health & Vitality pre-selected and locked
- ✅ 6 categories initially visible, 3 hidden
- ✅ Progressive reveal based on selections
- ✅ Compact grid layout (3-4 per row, max 40px height)
- ✅ High-quality Lucide React icons

### Onboarding Flow
- ✅ **Screen 1**: Category Selection with progress indicator
- ✅ **Screen 2**: Vision & Focus Questions (3 questions)
- ✅ Progress indicators for both screens
- ✅ Validation and smooth transitions

### Technical Implementation

#### Components Created
1. `CategorySelector` - Handles life area selection with progressive reveal
2. `VisionQuestions` - Multi-step question flow for vision and focus
3. `LifeChapters` - Sidebar component showing generated chapters
4. `LifeBlueprintOnboarding` - Main onboarding flow manager
5. `LifeBlueprintGreeting` - Welcome screen after onboarding
6. `LifeBlueprintChat` - Main chat integration component
7. `LifeBlueprintContext` - State management for the entire system

#### State Management
- Selected categories
- Onboarding completion status
- Active chapter
- Vision answers (ideal life, desires, struggles)

#### Category System
**Initially Visible (6):**
1. Health & Vitality (pre-selected, locked)
2. Mind & Emotional Mastery
3. Work & Financial Life
4. Character, Identity & Purpose
5. Spiritual Growth
6. Love & Relationships

**Initially Hidden (3):**
7. Parenting & Family Legacy
8. Social Life & Influence
9. Lifestyle & Freedom

## Usage Flow

1. **Initial Load**: User sees category selection screen
2. **Category Selection**: User selects life areas (Health is pre-selected)
3. **Progressive Reveal**: Additional categories appear as user selects more
4. **Vision Questions**: User answers 3 questions about their ideal life
5. **Greeting Screen**: Welcome message with selected categories
6. **Chapter Navigation**: User can select chapters from sidebar
7. **Chat Interface**: AI-powered conversation for each life area

## Technical Requirements

- ✅ Lucide React icons (already installed)
- ✅ Context-based state management
- ✅ Responsive design (mobile and desktop)
- ✅ Progressive disclosure UI patterns
- ✅ Integration with existing chat system

## Deployment

The system is ready for cloud deployment. Key environment variables needed:

- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Authentication secret
- `OPENAI_API_KEY` - OpenAI API key for chat functionality

## File Structure

```
components/
├── category-selector.tsx          # Category selection UI
├── vision-questions.tsx           # Vision questions flow
├── life-chapters.tsx              # Sidebar chapters
├── life-blueprint-onboarding.tsx  # Main onboarding flow
├── life-blueprint-greeting.tsx    # Welcome screen
├── life-blueprint-chat.tsx        # Chat integration
├── life-blueprint-context.tsx     # State management
└── chat-header.tsx                # Modified header

app/(chat)/
├── layout.tsx                     # Updated with LifeBlueprintProvider
└── page.tsx                       # Updated to use LifeBlueprintChat
```

## Next Steps

1. Deploy to cloud environment
2. Test onboarding flow
3. Verify chapter navigation
4. Test chat integration with AI
5. Add persistence for user selections
6. Implement chapter-specific prompts
