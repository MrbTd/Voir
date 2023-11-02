import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {imageRessource} from '../../utils/Constantes';

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
          label={() => <CustomText>Utilisateur</CustomText>}
          onPress={() => navigation.navigate('ListUtilisateur' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Catégories des plats</CustomText>}
          onPress={() => navigation.navigate('CategoriePlat' as never)}
        />
        <DrawerItem
          label={() => <CustomText>Sous-catégories</CustomText>}
          onPress={() => navigation.navigate('SousCategoriePlat' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Garnitures</CustomText>}
          onPress={() => navigation.navigate('Garnitures' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Accompagnements</CustomText>}
          onPress={() => navigation.navigate('Accompagnement' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Sauces</CustomText>}
          onPress={() => navigation.navigate('Sauces' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Tables</CustomText>}
          onPress={() => navigation.navigate('Tables' as never)}
        />

        <DrawerItem
          label={() => <CustomText>Plats</CustomText>}
          onPress={() => navigation.navigate('Plats' as never)}
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
