import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Boissons from '../../pages/gerants/boissons/Boissons';
import DetailsBoissons from '../../pages/gerants/boissons/DetailsBoissons';

const Stack = createStackNavigator();

const StackBoissons = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Boissons" component={Boissons} />

      <Stack.Screen
        name="DetailsBoissons"
        component={DetailsBoissons}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackBoissons;
