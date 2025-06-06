import { useEffect, useState } from "react";

interface UseAIAnalyzeProps<TData, TResult> {
  dataItems: TData[] | null;
  customPromptBuilder?: (data: TData[]) => string;
  trigger: boolean;
  onComplete: () => void;
  apiUrl: string;
  requestBodyKey?: string;
}

export function useAIAnalyze<TData, TResult>({
  dataItems,
  customPromptBuilder,
  trigger,
  onComplete,
  apiUrl,
  requestBodyKey = "prompt",
}: UseAIAnalyzeProps<TData, TResult>): TResult | null {
  const [parsedResponse, setParsedResponse] = useState<TResult | null>(null);

  useEffect(() => {
    const fetchAIResponse = async () => {
      if (!trigger || !dataItems || dataItems.length === 0) return;

      try {
        const prompt = customPromptBuilder
          ? customPromptBuilder(dataItems)
          : "Analyze the following data.";

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [requestBodyKey]: prompt }),
        });

        const data = await res.json();

        let cleaned = data.content.trim();

        // Try to quote all keys (e.g., answer: -> "answer":)
        cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        // Try to quote all keys (e.g., answer: -> "answer":)

        const result = JSON.parse(cleaned) as TResult;
        setParsedResponse(result);
      } catch (err) {
        console.error("AI request or parsing failed:", err);
        setParsedResponse(null);
      } finally {
        onComplete();
      }
    };

    fetchAIResponse();
  }, [trigger, dataItems]);

  return parsedResponse;
}
