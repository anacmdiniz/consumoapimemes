import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { getTemplateBySlug } from '../../api/api';

export default function DetailsScreen({ route }) {
  const { slug } = route.params;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTemplateBySlug(slug);
        if (mounted) setTemplate(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#7c5cff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Erro: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: template.url }} style={styles.image} />
        <Text style={styles.title}>{template.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>{template.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Slug</Text>
          <Text style={styles.infoValue}>{template.slug}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Categorias</Text>
          <Text style={styles.infoValue}>
            {template.categories && template.categories.length > 0
              ? template.categories.join(', ')
              : 'Nenhuma'}
          </Text>
        </View>

        {template.width && template.height && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dimensões</Text>
            <Text style={styles.infoValue}>
              {template.width} x {template.height}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121a',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 14,
    backgroundColor: '#2a2a3a',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
  },
  infoLabel: {
    color: '#8a8a9e',
    fontSize: 14,
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  center: {
    flex: 1,
    backgroundColor: '#12121a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#ff6b6b',
  },
});