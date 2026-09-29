import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTrending, searchTemplates } from '../../api/api';

export default function ListScreen({ navigation }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrending();
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  async function handleSearch(text) {
    setQuery(text);
    if (!text.trim()) {
      setSearching(false);
      loadTrending();
      return;
    }
    setSearching(true);
    setLoading(true);
    setError(null);
    try {
      const results = await searchTemplates(text.trim());
      setTemplates(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('Details', { slug: item.slug })}
      >
        <Image source={{ uri: item.url }} style={styles.thumb} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardId} numberOfLines={1}>
            #{item.id}
          </Text>
          {item.categories && item.categories.length > 0 ? (
            <View style={styles.cardChipRow}>
              {item.categories.slice(0, 2).map((cat) => (
                <View key={cat} style={styles.cardChip}>
                  <Text style={styles.cardChipText} numberOfLines={1}>
                    {cat}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.cardCategories}>Sem categoria</Text>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        {searching ? 'Resultados da busca' : 'Memes em alta'}
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar template (ex: drake)"
        placeholderTextColor="#A79D89"
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#D9542B" />
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.error}>Erro: {error}</Text>
          <Pressable onPress={loadTrending} style={styles.retryButton}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={templates}
          keyExtractor={(item) => item.id || item.slug}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum template encontrado.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6EE',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#231F18',
    marginTop: 12,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  search: {
    backgroundColor: '#FFFFFF',
    color: '#231F18',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E7DFCE',
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7DFCE',
  },
  cardPressed: {
    opacity: 0.7,
  },
  thumb: {
    width: 84,
    height: 84,
    backgroundColor: '#F3ECDC',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  cardTitle: {
    color: '#231F18',
    fontSize: 16,
    fontWeight: '700',
  },
  cardId: {
    color: '#A79D89',
    fontSize: 11,
    marginTop: 2,
  },
  cardCategories: {
    color: '#726B5C',
    fontSize: 12,
    marginTop: 6,
  },
  cardChipRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  cardChip: {
    backgroundColor: '#F2D9C8',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 9,
    marginRight: 6,
  },
  cardChipText: {
    color: '#D9542B',
    fontSize: 10,
    fontWeight: '700',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#B23B2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#231F18',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retryText: {
    color: '#FAF6EE',
    fontWeight: '700',
  },
  empty: {
    color: '#A79D89',
    textAlign: 'center',
    marginTop: 40,
  },
});
