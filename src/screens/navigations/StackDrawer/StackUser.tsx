import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import DetailsUtilisateur from '../../pages/gerants/users/DetailsUtilisateur';
import ListUtilisateur from '../../pages/gerants/users/ListUtilisateur';

const Stack = createStackNavigator();

const StackUser = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ListUtilisateur" component={ListUtilisateur} />

      <Stack.Screen
        name="DetailsUtilisateur"
        component={DetailsUtilisateur}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default StackUser;
