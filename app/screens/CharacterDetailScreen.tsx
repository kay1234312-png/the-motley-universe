import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Character } from '../types/character';
import { characterService } from '../services/characterService';
import { bookService } from '../services/bookService';
import { Book } from '../types/book';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CharacterDetailScreenProps {
  character: Character;
  onClose: () => void;
  onBookSelected: (book: Book) => void;
}

export const CharacterDetailScreen: React.FC<CharacterDetailScreenProps> = ({
  character,
  onClose,
  onBookSelected,
}) => {
  const relatedBooks = character.relatedBookIds.length > 0
    ? bookService.getBooksByIds(character.relatedBookIds)
    : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onClose}
        >
          <Text style={styles.backButtonText}>← BACK</Text>
        </Pressable>
      </View>

      {/* Character Image */}
      <View style={styles.imageContainer}>
        {character.image ? (
          <Image source={{ uri: character.image }} style={styles.characterImage} />
        ) : (
          <LinearGradient
            colors={['#3a2a2a', '#1a0a0a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.imagePlaceholder}
          >
            <Text style={styles.imagePlaceholderText}>🎭</Text>
          </LinearGradient>
        )}
      </View>

      {/* Character Name */}
      <View style={styles.nameSection}>
        <Text style={styles.characterName}>{character.name}</Text>
        <LinearGradient
          colors={['#8b3a3a', '#5a0a0a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />
      </View>

      {/* Role */}
      {character.role && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ROLE</Text>
          <Text style={styles.sectionContent}>{character.role}</Text>
        </View>
      )}

      {/* Description */}
      {character.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.sectionContent}>{character.description}</Text>
        </View>
      )}

      {/* Story Information */}
      {character.storyInformation && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STORY INFORMATION</Text>
          <Text style={styles.sectionContent}>{character.storyInformation}</Text>
        </View>
      )}

      {/* Quotes */}
      {character.quotes && character.quotes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUOTES</Text>
          {character.quotes.map((quote, index) => (
            <View key={index} style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"{quote}"</Text>
              <LinearGradient
                colors={['#8b3a3a', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.quoteAccent}
              />
            </View>
          ))}
        </View>
      )}

      {/* Audio Player Placeholder */}
      {character.audio && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHARACTER AUDIO</Text>
          <LinearGradient
            colors={['#2a1a1a', '#1a0a0a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.audioPlayer}
          >
            <Text style={styles.audioIcon}>🎙️</Text>
            <Text style={styles.audioText}>Audio Player</Text>
            <Pressable style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </Pressable>
          </LinearGradient>
        </View>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RELATED BOOKS</Text>
          {relatedBooks.map((book) => (
            <Pressable
              key={book.id}
              style={({ pressed }) => [
                styles.relatedBookCard,
                { opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={() => onBookSelected(book)}
            >
              <LinearGradient
                colors={['#2a1a1a', '#1a0a0a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.relatedBookGradient}
              >
                {book.coverImage ? (
                  <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
                ) : (
                  <View style={styles.bookCoverPlaceholder}>
                    <Text style={styles.bookIcon}>📚</Text>
                  </View>
                )}
                <View style={styles.relatedBookContent}>
                  <Text style={styles.relatedBookTitle}>{book.title}</Text>
                  <Text style={styles.relatedBookAuthor}>{book.author}</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8b3a3a',
    letterSpacing: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 400,
    backgroundColor: '#1a0a0a',
  },
  characterImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 80,
  },
  nameSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  characterName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f5f1e8',
    marginBottom: 12,
    letterSpacing: 1,
  },
  divider: {
    height: 2,
    width: 60,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8b3a3a',
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  sectionContent: {
    fontSize: 15,
    color: '#d4c5b8',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  quoteContainer: {
    marginBottom: 16,
    paddingVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#8b3a3a',
    paddingLeft: 12,
  },
  quoteText: {
    fontSize: 15,
    color: '#c9a68a',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 6,
  },
  quoteAccent: {
    height: 1,
    width: 30,
  },
  audioPlayer: {
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a2a2a',
  },
  audioIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  audioText: {
    flex: 1,
    fontSize: 14,
    color: '#d4c5b8',
    fontWeight: '500',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8b3a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#f5f1e8',
    fontSize: 18,
  },
  relatedBookCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  relatedBookGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a2a2a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookCover: {
    width: 80,
    height: 120,
  },
  bookCoverPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: '#1a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookIcon: {
    fontSize: 32,
  },
  relatedBookContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  relatedBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f5f1e8',
    marginBottom: 4,
  },
  relatedBookAuthor: {
    fontSize: 12,
    color: '#8b7a6a',
  },
});
