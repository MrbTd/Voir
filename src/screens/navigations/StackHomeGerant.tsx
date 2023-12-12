import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../pages/Home';
import ListUtilisateur from '../pages/gerants/users/ListUtilisateur';
import DetailsUtilisateur from '../pages/gerants/users/DetailsUtilisateur';
import CategoriePlat from '../pages/gerants/categories_plats/CategoriePlat';
import DetailsCategoriePlat from '../pages/gerants/categories_plats/DetailsCategoriePlat';
import SousCategoriePlat from '../pages/gerants/sousCategories/SousCategoriePlat';
import DetailsSousCategoriePlat from '../pages/gerants/sousCategories/DetailsSousCategoriePlat';
import Boissons from '../pages/gerants/boissons/Boissons';
import DetailsBoissons from '../pages/gerants/boissons/DetailsBoissons';
import Accompagnement from '../pages/gerants/accompagnements/Accompagnement';
import DetailsAccompagnement from '../pages/gerants/accompagnements/DetailsAccompagnement';
import Sauces from '../pages/gerants/sauces/Sauces';
import DetailsSauces from '../pages/gerants/sauces/DetailsSauces';
import Tables from '../pages/gerants/tables/Tables';
import DetailsTables from '../pages/gerants/tables/DetailsTables';
import Plats from '../pages/gerants/plats/Plats';
import DetailsPlats from '../pages/gerants/plats/DetailsPlats';
import CommandeJours from '../pages/gerants/commande_jours/CommandeJours';
import AccueilGerant from '../pages/gerants/accueil_gerant/AccueilGerant';
import AvisClients from '../pages/gerants/avis_clients/AvisClients';

const Stack = createStackNavigator();

const StackHomeGerant = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccueilGerant" component={AccueilGerant} />
      <Stack.Screen name="ListUtilisateur" component={ListUtilisateur} />

      <Stack.Screen
        name="DetailsUtilisateur"
        component={DetailsUtilisateur}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen name="CategoriePlat" component={CategoriePlat} />

      <Stack.Screen
        name="DetailsCategoriePlat"
        component={DetailsCategoriePlat}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen name="SousCategoriePlat" component={SousCategoriePlat} />

      <Stack.Screen
        name="DetailsSousCategoriePlat"
        component={DetailsSousCategoriePlat}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen name="Boissons" component={Boissons} />

      <Stack.Screen
        name="DetailsBoissons"
        component={DetailsBoissons}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen name="Accompagnement" component={Accompagnement} />

      <Stack.Screen
        name="DetailsAccompagnement"
        component={DetailsAccompagnement}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name="Sauces" component={Sauces} />

      <Stack.Screen
        name="DetailsSauces"
        component={DetailsSauces}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name="Tables" component={Tables} />

      <Stack.Screen
        name="DetailsTables"
        component={DetailsTables}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen name="Plats" component={Plats} />

      <Stack.Screen
        name="DetailsPlats"
        component={DetailsPlats}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name="AvisClients" component={AvisClients} />
      <Stack.Screen name="CommandeJours" component={CommandeJours} />
    </Stack.Navigator>
  );
};

export default StackHomeGerant;
