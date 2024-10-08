import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchProvider } from './src/providers/SearchContext';
import HomeScreen from './src/screens/HomeScreen';
import SelectedScreen from './src/screens/SelectedScreen';

export type RootStackParamList = {
  Home: undefined;
  SelectedScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SearchProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SelectedScreen" component={SelectedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default App;
