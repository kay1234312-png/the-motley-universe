import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { characterService } from '../services/characterService';
import { Character } from '../types/character';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface CharactersScreenProps {
  onCharacterSelected: (character: Character) => void;
}

export const CharactersScreen: React.FC<CharactersScreenProps> = ({ onCharacterSelected }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const characters = characterService.getAllCharacters();

  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) {
      return characters;
    }
    return characterService.searchCharacters(searchQuery);
  }, [searchQuery, characters]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#1a1a1a', '#0a0a0a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>CHARACTERS</Text>
          <Text style={styles.subtitle}>Meet the people of The Motley Universe</Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <View style={styles.gridContainer}>
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onPress={() => onCharacterSelected(character)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>NO CHARACTERS AVAILABLE YET</Text>
          <Text style={styles.emptyStateSubtext}>
            Character profiles will appear here when they are published.
          </Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.85 : 1,
          transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
        },
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#2a1a1a', '#1a0a0a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Image Placeholder */}
        <View style={styles.imagePlaceholder}>
          {character.image ? (
            <Image source={{ uri: character.image }} style={styles.characterImage} />
          ) : (
            <>
              <LinearGradient
                colors={['#3a2a2a', '#1a0a0a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.placeholderGradient}
              />
              <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>🎭</Text>
              </View>
            </>
          )}
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.informationText}>Information coming soon</Text>
        </View>

        {/* Accent Line */}
        <LinearGradient
          colors={['#8b3a3a', '#5a0a0a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentLine}
        />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#f5f1e8',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#b8a89a',
    letterSpacing: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#8b3a3a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f5f1e8',
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#1a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  placeholderGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderContent: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  placeholderText: {
    fontSize: 48,
  },
  characterImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f5f1e8',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  informationText: {
    fontSize: 12,
    color: '#8b7a6a',
    letterSpacing: 0.3,
  },
  accentLine: {
    height: 2,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f5f1e8',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8b7a6a',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
