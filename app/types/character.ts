export interface Character {
  id: string;
  name: string;
  image?: string; // URI to character image, undefined until owner uploads
  role?: string;
  description?: string;
  storyInformation?: string;
  quotes?: string[]; // Array of character quotes
  audio?: string; // URI to audio file
  relatedBookIds: string[];
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
