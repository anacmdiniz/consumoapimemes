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
  SafeAreaView,
} from 'react-native';
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
            ID: {item.id}
          </Text>
          <Text style={styles.cardCategories} numberOfLines={1}>
            {item.categories && item.categories.length > 0
              ? item.categories.join(', ')
              : 'Sem categoria'}
          </Text>
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
        placeholderTextColor="#7a7a8c"
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#7c5cff" />
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
    backgroundColor: '#12121a',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 12,
  },
  search: {
    backgroundColor: '#1e1e2a',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e2a',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.7,
  },
  thumb: {
    width: 80,
    height: 80,
    backgroundColor: '#2a2a3a',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardId: {
    color: '#8a8a9e',
    fontSize: 12,
    marginTop: 2,
  },
  cardCategories: {
    color: '#7c5cff',
    fontSize: 12,
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#7c5cff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  empty: {
    color: '#7a7a8c',
    textAlign: 'center',
    marginTop: 40,
  },
});