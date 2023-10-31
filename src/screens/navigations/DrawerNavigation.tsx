import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListUtilisateur from '../pages/gerants/users/ListUtilisateur';
import DetailsUtilisateur from '../pages/gerants/users/DetailsUtilisateur';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="ListUtilisateur" component={ListUtilisateur} />
        <Drawer.Screen name="DetailsUtilisateur" component={DetailsUtilisateur} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
