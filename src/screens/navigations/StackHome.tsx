import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../pages/Home';
import ListMenu from '../pages/ListMenu';
import DetailsCommande from '../pages/DetailsCommande';
import ListCommande from '../pages/ListCommande';
import ListMesCommande from '../pages/ListeMesCommande';
import {useAuth} from '../../hooks/AuthProvider';
import {userRole} from '../../utils/data';
import RecapitulatifCommande from '../pages/RecapitulatifCommande';

const Stack = createStackNavigator();

const StackHome = () => {
  const {auhtContext} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        auhtContext.data.role === userRole.CUISINIER ? 'ListCommande' : 'Home'
      }>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="ListMenu"
        component={ListMenu}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="DetailsCommande"
        component={DetailsCommande}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="RecapitulatifCommande"
        component={RecapitulatifCommande}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="ListCommande"
        component={ListCommande}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="ListMesCommande"
        component={ListMesCommande}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
