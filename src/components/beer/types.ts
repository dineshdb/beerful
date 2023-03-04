export interface Beer {
  id: number;
  name: string;
  genre: string;
  tagline?: string;
  ph?: number;
  brewers_tips?: string;
  description?: string;
  contributed_by?: string;
  ibu?: number;
  first_brewed?: Date;
  image_url?: string;
  ingredients?: Record<string, unknown>;
}
