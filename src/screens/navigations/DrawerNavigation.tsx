import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListUtilisateur from '../pages/gerants/users/ListUtilisateur';
import DetailsUtilisateur from '../pages/gerants/users/DetailsUtilisateur';
import StackHomeGerant from './StackHomeGerant';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown:false,
      
  }}
    drawerContent={(props)=><DrawerContent {...props}/>}
    >
        <Drawer.Screen name="StackHomeGerant" component={StackHomeGerant} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
