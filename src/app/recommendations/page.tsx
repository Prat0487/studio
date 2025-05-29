'use client'; // This page needs to be client component due to useState for results

import { useState } from 'react';
import { RecommendationForm } from '@/components/RecommendationForm';
import { RecommendationResults } from '@/components/RecommendationResults';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations'; // From Genkit type

export default function RecommendationsPage() {
  const [recommendationResults, setRecommendationResults] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleResults = (results: PersonalizedRecommendationsOutput | null, errorMsg?: string) => {
    setRecommendationResults(results);
    setError(errorMsg);
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-primary-foreground">Personalized Recommendations</h1>
        <p className="mt-2 text-lg text-primary-foreground/90">Let our AI help you find your next favorite meal!</p>
      </section>
      
      <RecommendationForm onResults={handleResults} />
      
      {(recommendationResults || error) && <RecommendationResults results={recommendationResults} error={error} />}
    </div>
  );
}
