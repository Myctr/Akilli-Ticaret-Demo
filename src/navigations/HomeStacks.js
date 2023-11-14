import React from 'react';

import HomeScreen from '../screens/Home';
import ProductsScreen from '../screens/Products';
import CategoriesScreen from '../screens/Categories';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const HomeStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          gestureDirection: 'horizontal-inverted',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStacks;
