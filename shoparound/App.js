import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './src/screens/MainMenu.js';
import ShopsListScreen from './src/screens/ShopsMenu.js';
import StoreLocationScreen from './src/screens/StoreLocation.js';
import CreateShoppingListScreen from './src/screens/ShoppingList.js';
import FindProductScreen from './src/screens/FindElement.js';
import ShoppingListScreen from './src/screens/FinalShoppingList.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainMenu'>
        <Stack.Screen name='ShopAround' component={MenuScreen} />
        <Stack.Screen name='Shops List' component={ShopsListScreen} />
        <Stack.Screen name='Shops Location' component={StoreLocationScreen} />
        <Stack.Screen
          name='Create Shopping List'
          component={CreateShoppingListScreen}
        />
        <Stack.Screen name='Find Product' component={FindProductScreen} />
        <Stack.Screen name='Shopping List' component={ShoppingListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
