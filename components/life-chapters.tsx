'use client';

import { useParams, useRouter } from 'next/navigation';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LIFE_CATEGORIES, type LifeCategory } from './category-selector';

interface LifeChaptersProps {
  selectedCategories: string[];
  onChapterSelect: (chapterId: string) => void;
  activeChapter?: string;
}

export function LifeChapters({ 
  selectedCategories, 
  onChapterSelect, 
  activeChapter 
}: LifeChaptersProps) {
  const router = useRouter();
  const { id } = useParams();

  // Generate chapters based on selected categories
  const chapters = selectedCategories.map((categoryId, index) => {
    const category = LIFE_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return null;

    return {
      id: `chapter-${index + 1}-${categoryId}`,
      number: index + 1,
      title: category.name,
      categoryId,
      icon: category.icon
    };
  }).filter(Boolean);

  // Set the first chapter as active if no chapter is currently active
  if (chapters.length > 0 && !activeChapter) {
    onChapterSelect(chapters[0].id);
  }

  if (chapters.length === 0) {
    return (
      <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
        Select categories to generate your life blueprint chapters
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chapters.map((chapter) => {
        if (!chapter) return null;
        
        const Icon = chapter.icon;
        const isActive = activeChapter === chapter.id;

        return (
          <Button
            key={chapter.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-auto p-3 text-left",
              isActive 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/50"
            )}
            onClick={() => onChapterSelect(chapter.id)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Icon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-muted-foreground">
                  Chapter {chapter.number}
                </div>
                <div className="text-sm font-medium truncate">
                  {chapter.title}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </Button>
        );
      })}
    </div>
  );
}
