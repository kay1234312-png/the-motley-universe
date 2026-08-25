import { Character } from '../types/character';

const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-1',
    name: 'Evan',
    image: undefined,
    role: undefined,
    description: undefined,
    storyInformation: undefined,
    quotes: [],
    audio: undefined,
    relatedBookIds: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'char-2',
    name: 'Mara',
    image: undefined,
    role: undefined,
    description: undefined,
    storyInformation: undefined,
    quotes: [],
    audio: undefined,
    relatedBookIds: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'char-3',
    name: 'The Jester',
    image: undefined,
    role: undefined,
    description: undefined,
    storyInformation: undefined,
    quotes: [],
    audio: undefined,
    relatedBookIds: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'char-4',
    name: 'The Director',
    image: undefined,
    role: undefined,
    description: undefined,
    storyInformation: undefined,
    quotes: [],
    audio: undefined,
    relatedBookIds: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'char-5',
    name: 'The Playwright',
    image: undefined,
    role: undefined,
    description: undefined,
    storyInformation: undefined,
    quotes: [],
    audio: undefined,
    relatedBookIds: [],
    published: false,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock character service - to be replaced with database/API later
class CharacterService {
  private characters: Character[] = INITIAL_CHARACTERS;

  getAllCharacters(): Character[] {
    return this.characters.filter(char => char.published);
  }

  getAllCharactersIncludingUnpublished(): Character[] {
    return this.characters;
  }

  getCharacterById(id: string): Character | undefined {
    return this.characters.find(char => char.id === id);
  }

  searchCharacters(query: string): Character[] {
    const lowerQuery = query.toLowerCase();
    return this.characters
      .filter(char => char.published)
      .filter(
        char =>
          char.name.toLowerCase().includes(lowerQuery) ||
          char.role?.toLowerCase().includes(lowerQuery) ||
          char.description?.toLowerCase().includes(lowerQuery) ||
          char.storyInformation?.toLowerCase().includes(lowerQuery)
      );
  }

  // Placeholder for future admin functionality
  updateCharacter(id: string, updates: Partial<Character>): Character | undefined {
    const index = this.characters.findIndex(char => char.id === id);
    if (index === -1) return undefined;

    this.characters[index] = {
      ...this.characters[index],
      ...updates,
      updatedAt: new Date(),
    };

    return this.characters[index];
  }

  addCharacter(name: string): Character {
    const newCharacter: Character = {
      id: `char-${Date.now()}`,
      name,
      image: undefined,
      role: undefined,
      description: undefined,
      storyInformation: undefined,
      quotes: [],
      audio: undefined,
      relatedBookIds: [],
      published: false,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.characters.push(newCharacter);
    return newCharacter;
  }

  getCharactersByIds(ids: string[]): Character[] {
    return this.characters.filter(char => ids.includes(char.id) && char.published);
  }
}

export const characterService = new CharacterService();
