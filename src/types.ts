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
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
