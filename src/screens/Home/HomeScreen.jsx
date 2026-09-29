import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>😂 MEME EXPLORER</Text>
        </View>

        <Text style={styles.title}>
          os melhores{'\n'}templates, num{'\n'}só lugar.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.subtitle}>
          descubra aqui os templates de memes internacionais mais populares do momento, pesquise
          por nome e veja o contexto de cada um — direto da API pública
          justmeme.wtf.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('List')}
        >
          <Text style={styles.buttonText}>ver memes em alta</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>dados fornecidos por justmeme.wtf</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaee',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2e5c8',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  badgeText: {
    color: '#D9542B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#231F18',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  divider: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9542B',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#726B5C',
    lineHeight: 22,
    marginBottom: 36,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#231F18',
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FAF6EE',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonArrow: {
    color: '#D9542B',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    color: '#B3A98F',
    fontSize: 12,
    paddingBottom: 16,
  },
});
