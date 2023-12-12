import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DetailsSousCategoriePlat from '../../pages/gerants/sousCategories/DetailsSousCategoriePlat';
import SousCategoriePlat from '../../pages/gerants/sousCategories/SousCategoriePlat';

const Stack = createStackNavigator();

const StacSousCategoriePlat = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SousCategoriePlat" component={SousCategoriePlat} />

      <Stack.Screen
        name="DetailsSousCategoriePlat"
        component={DetailsSousCategoriePlat}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StacSousCategoriePlat;
