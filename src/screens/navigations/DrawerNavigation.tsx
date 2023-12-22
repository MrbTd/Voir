import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import CommandeJours from '../pages/gerants/commande_jours/CommandeJours';
import AccueilGerant from '../pages/gerants/accueil_gerant/AccueilGerant';
import AvisClients from '../pages/gerants/avis_clients/AvisClients';
import StackUser from './StackDrawer/StackUser';
import StackCategoriePlat from './StackDrawer/StackCategoriePlat';
import StacSousCategoriePlat from './StackDrawer/StacSousCategoriePlat';
import StackTables from './StackDrawer/StackTables';
import StackPlats from './StackDrawer/StackPlats';
import StackBoissons from './StackDrawer/StackBoissons';
import StackCommandeJour from './StackDrawer/StackCommandeJour';
import StackAccueilGerant from './StackDrawer/StackAccueilGerant';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="StackAccueilGerant" component={StackAccueilGerant} />

      <Drawer.Screen name="StackUser" component={StackUser} />

      <Drawer.Screen name="StackCategoriePlat" component={StackCategoriePlat} />

      <Drawer.Screen
        name="StacSousCategoriePlat"
        component={StacSousCategoriePlat}
      />

      <Drawer.Screen name="StackBoissons" component={StackBoissons} />

      <Drawer.Screen name="StackTables" component={StackTables} />

      <Drawer.Screen name="StackPlats" component={StackPlats} />

      <Drawer.Screen name="AvisClients" component={AvisClients} />

      <Drawer.Screen name="StackCommandeJour" component={StackCommandeJour} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
