import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importando as três telas principais da nossa aplicação
import HomeScreen from './src/screens/Home/HomeScreen';
import ListScreen from './src/screens/List/ListScreen';
import DetailsScreen from './src/screens/Details/DetailsScreen';

// criando a pilha de navegação nativa do react navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // o safeareaprovider garante que o app respeite os recortes da tela e barras do celular
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {/* o navigationcontainer gerencia o histórico e o estado de navegação de toda a aplicação */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#FAF6EE' },
            headerShadowVisible: false,
            headerTintColor: '#231F18',
            headerTitleStyle: { fontWeight: '800', letterSpacing: -0.2 },
            contentStyle: { backgroundColor: '#FAF6EE' },
          }}
        >
          {/* tela de boas-vindas (sem cabeçalho para ter visual de landing page) */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          {/* tela de listagem de memes em alta */}
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{ title: 'Memes em alta' }}
          />
          {/* tela com detalhes adicionais de um meme selecionado */}
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Detalhes do meme' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}