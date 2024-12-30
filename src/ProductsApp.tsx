// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient()

export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const bgColor = colorScheme === 'dark' ? theme['color-basic-800'] : theme['color-basic-100'];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark: colorScheme === 'dark',
          colors: {
            primary: theme['color-primary-500'],
            background: bgColor,
            card: theme['color-basic-100'],
            text: theme['text-basic-color'],
            border: theme['color-basic-800'],
            notification: theme['color-primary-500']
          },
        } as any}>

          <AuthProvider>
           <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
      </QueryClientProvider>

  )
}
