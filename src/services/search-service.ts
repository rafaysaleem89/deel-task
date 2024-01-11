import { Character, SearchResult } from "./types";
import { BASE_URL } from "../utils/constants";

export const fetchSuggestions = async (
  searchQuery: string
): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_URL}/character?name=${searchQuery}`);
    const data: SearchResult | undefined = await response.json();
    return data?.results ?? [];
  } catch (error) {
    return [];
  }
};
