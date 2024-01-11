import { useEffect, useState, useCallback } from "react";
import { fetchSuggestions } from "../services/search-service";
import { Character } from "../services/types";
import { debounce } from "../utils/helpers";

interface SuggestionsHookResult {
  suggestions: Character[];
}

export const useSuggestions = (searchQuery: string): SuggestionsHookResult => {
  const [suggestions, setSuggestions] = useState<Character[]>([]);

  async function getSuggestions(searchQuery: string) {
    if (searchQuery) {
      const data = await fetchSuggestions(searchQuery);
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }

  //Debounce function added to minimize the number of API calls
  const debouncedGetSuggestions = useCallback(
    debounce((query: string) => getSuggestions(query), 300),
    []
  );

  useEffect(() => {
    debouncedGetSuggestions(searchQuery);
  }, [searchQuery]);

  return { suggestions };
};
