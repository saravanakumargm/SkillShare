"use client";

import { useState } from 'react';
import { FindMatchForm } from '@/components/find-match-form';
import { MatchResults } from '@/components/match-results';
import type { MatchSkillRequestInput, MatchSkillRequestOutput } from '@/ai/flows/match-skill-request';

export default function Home() {
  const [matches, setMatches] = useState<MatchSkillRequestOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchInput, setLastSearchInput] = useState<MatchSkillRequestInput | null>(null);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find Your Perfect Skill Swap</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Let our AI help you find the best partner to learn a new skill from. Just tell us what you want to learn and what you can offer in return.
          </p>
        </header>

        <main>
          <FindMatchForm
            onSearchStart={() => {
              setIsLoading(true);
              setError(null);
              setMatches(null);
              setLastSearchInput(null);
            }}
            onSearchEnd={(result, input) => {
              setIsLoading(false);
              if (result) {
                setMatches(result);
              }
              setLastSearchInput(input);
            }}
            onSearchError={(e) => {
              setIsLoading(false);
              setError(e);
            }}
          />
          <MatchResults 
            isLoading={isLoading} 
            error={error} 
            results={matches}
            searchInput={lastSearchInput} 
          />
        </main>
      </div>
    </div>
  );
}
