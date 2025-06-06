import { useEffect, useState } from "react";

interface AIResponse {
  answer: string;
  isValid: boolean;
  reason: string;
  recommendation: string;
}

interface UseAskAIProps {
  prompt: string | (() => Promise<string>);
  trigger: boolean;
  onComplete: () => void;
  postProcessResponse?: (response: string) => string;
}

export function useAskAI({
  prompt,
  trigger,
  onComplete,
  postProcessResponse,
}: UseAskAIProps): AIResponse | null {
  const [response, setResponse] = useState<AIResponse | null>(null);

  useEffect(() => {
    const fetchAIResponse = async () => {
      if (!trigger) return;

      try {
        const finalPrompt =
          typeof prompt === "function" ? await prompt() : prompt;

        const res = await fetch("http://localhost:3002/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: finalPrompt }),
        });

        const data = await res.json();

        let cleaned = data.content.trim();
        cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        try {
          const parsed = JSON.parse(cleaned) as AIResponse;
          parsed.answer = postProcessResponse
            ? postProcessResponse(parsed.answer)
            : parsed.answer;
          setResponse(parsed);
        } catch (err) {
          console.error("Failed to parse AI response:", err);
          setResponse(null);
        }
      } catch (err) {
        console.error("Error during AI request:", err);
        setResponse(null);
      } finally {
        onComplete();
      }
    };

    fetchAIResponse();
  }, [trigger]);

  return response;
}
