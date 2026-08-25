export type BookFormat = 'digital' | 'paperback' | 'hardcover' | 'audiobook';

export interface BookPrice {
  format: BookFormat;
  price?: number; // undefined if not set
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string; // URI to cover image, undefined until owner uploads
  prices: BookPrice[]; // Array of prices per format
  formats: BookFormat[]; // Available formats
  preview?: string; // URI to preview PDF/content
  featured: boolean;
  published: boolean;
  relatedCharacterIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  bookId: string;
  title: string;
  coverImage?: string;
  selectedFormat: BookFormat;
  price?: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
