import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult } from "@/types/analysis";

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeUrl = async (url: string): Promise<AnalysisResult | null> => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-url', {
        body: { url }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data as AnalysisResult);
      return data as AnalysisResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze URL';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    analyzeUrl,
    isLoading,
    error,
    result,
    reset
  };
}
