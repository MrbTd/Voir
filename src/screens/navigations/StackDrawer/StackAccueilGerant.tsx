import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Boissons from '../../pages/gerants/boissons/Boissons';
import DetailsBoissons from '../../pages/gerants/boissons/DetailsBoissons';
import AccueilGerant from '../../pages/gerants/accueil_gerant/AccueilGerant';
import UpdateProfilUser from '../../pages/gerants/accueil_gerant/UpdateProfilUser';

const Stack = createStackNavigator();

const StackAccueilGerant = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccueilGerant" component={AccueilGerant} />

      <Stack.Screen
        name="UpdateProfilUser"
        component={UpdateProfilUser}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackAccueilGerant;
