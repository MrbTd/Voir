import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Plats from '../../pages/gerants/plats/Plats';
import DetailsPlats from '../../pages/gerants/plats/DetailsPlats';
const Stack = createStackNavigator();

const StackPlats = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Plats" component={Plats} />

      <Stack.Screen name="DetailsPlats" component={DetailsPlats} options={{}} />
    </Stack.Navigator>
  );
};

export default StackPlats;
