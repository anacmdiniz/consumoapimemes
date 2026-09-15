import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😂</Text>
        <Text style={styles.title}>MemeExplorer</Text>
        <Text style={styles.subtitle}>
          Descubra os templates de meme mais populares do momento, pesquise
          por nome e veja detalhes de cada um — tudo consumindo a API pública
          justmeme.wtf.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('List')}
        >
          <Text style={styles.buttonText}>Ver memes em alta</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Dados fornecidos por justmeme.wtf</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121a',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#a0a0b2',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#7c5cff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#5a5a6e',
    fontSize: 12,
    paddingBottom: 16,
  },
});