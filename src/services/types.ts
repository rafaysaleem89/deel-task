interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  created: string;
  name: string;
  episode: string[];
  gender: string;
  image: string;
  location: Location;
  origin: Location;
  species: string;
  type: string;
  url: string;
}

interface Info {
  count: number;
  next: string;
  pages: number;
  prev: string;
}

export interface SearchResult {
  info: Info;
  results: Character[];
}
