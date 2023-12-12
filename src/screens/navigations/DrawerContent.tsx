import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/CustomText';

import {imageRessource, paletteColor} from '../../utils/Constantes';

const DrawerContent = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '5%',
        }}
        onPress={() => navigation.navigate('AccueilGerant' as never)}>
        <Image source={imageRessource.logo} style={{width: 55, height: 55}} />
        <CustomText fontSize={25} fontWeight="bold">
          Restaurant
        </CustomText>
      </TouchableOpacity>
      <View style={styles.elementDrawer}>
        <DrawerItem
          label={params => <CustomText>Utilisateur</CustomText>}
          onPress={() => navigation.navigate('StackUser' as never)}
          activeBackgroundColor={paletteColor.red}
        />

        <DrawerItem
          label={() => <CustomText>Catégories des plats</CustomText>}
          onPress={() => navigation.navigate('StackCategoriePlat' as never)}
        />
        <DrawerItem
          label={() => <CustomText>Sous-catégories</CustomText>}
          onPress={() => navigation.navigate('StacSousCategoriePlat' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Boissons</CustomText>}
          onPress={() => navigation.navigate('StackBoissons' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Tables</CustomText>}
          onPress={() => navigation.navigate('StackTables' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Plats</CustomText>}
          onPress={() => navigation.navigate('StackPlats' as never)}
        />
        <DrawerItem
          label={() => <CustomText>Avis clients</CustomText>}
          onPress={() => navigation.navigate('AvisClients' as never)}
        />
        <DrawerItem
          label={() => <CustomText>Commande journalieres</CustomText>}
          onPress={() => navigation.navigate('CommandeJours' as never)}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  elementDrawer: {},
});
