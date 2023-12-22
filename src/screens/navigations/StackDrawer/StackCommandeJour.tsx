import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Boissons from '../../pages/gerants/boissons/Boissons';
import DetailsBoissons from '../../pages/gerants/boissons/DetailsBoissons';
import CommandeJours from '../../pages/gerants/commande_jours/CommandeJours';
import RecapitulatifCommandeGerant from '../../pages/gerants/commande_jours/RecapitulatifCommandeGerant';

const Stack = createStackNavigator();

const StackCommandeJour = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CommandeJours" component={CommandeJours} />

      <Stack.Screen
        name="RecapitulatifCommandeGerant"
        component={RecapitulatifCommandeGerant}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackCommandeJour;
