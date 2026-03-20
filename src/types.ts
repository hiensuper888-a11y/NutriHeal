export interface Food {
  id: string;
  name: string;
  scientificName?: string;
  category: string[];
  benefits: string[];
  conditions: string[]; // Diseases/conditions it helps with
  nutrients: string[];
  description: string;
  howToUse: string;
  image: string;
  caution?: string;
  sources?: { title: string; url: string }[];
  translations?: {
    [key: string]: {
      name?: string;
      benefits?: string[];
      conditions?: string[];
      nutrients?: string[];
      description?: string;
      howToUse?: string;
      caution?: string;
    };
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  translations?: {
    [key: string]: {
      name?: string;
      description?: string;
    };
  };
}
