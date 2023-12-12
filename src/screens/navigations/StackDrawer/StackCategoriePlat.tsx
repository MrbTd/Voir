import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import CategoriePlat from '../../pages/gerants/categories_plats/CategoriePlat';
import DetailsCategoriePlat from '../../pages/gerants/categories_plats/DetailsCategoriePlat';

const Stack = createStackNavigator();

const StackCategoriePlat = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CategoriePlat" component={CategoriePlat} />

      <Stack.Screen
        name="DetailsCategoriePlat"
        component={DetailsCategoriePlat}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackCategoriePlat;
