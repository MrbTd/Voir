import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../components/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import CustomButton from '../../../../components/CustomButton';

const AccueilGerant = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[paletteColor.marron, paletteColor.yellow, paletteColor.white]}
        style={{
          flex: 1,
          position: 'relative',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '5%',
            backgroundColor: paletteColor.marron,
            padding: '2%',
            borderRadius: 8,
            marginVertical: '10%',
            alignItems: 'center',
          }}>
          <Image
            source={imageRessource.logo}
            style={{width: 50, height: 50, borderRadius: 100}}
          />
          <CustomText color={paletteColor.white} fontSize={18}>
            Toure Ben Daouda
          </CustomText>
          <MaterialIcons
            name="menu"
            size={35}
            color={paletteColor.white}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          />
        </View>
        <View style={{marginHorizontal: '5%'}}>
          <View style={styles.cardNotif}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View
                style={{
                  backgroundColor: paletteColor.yellow,
                  width: 100,
                  padding: 5,
                  borderTopRightRadius: 13,
                  borderBottomLeftRadius: 13,
                }}>
                <CustomText textAlign="center" color={paletteColor.white}>
                  Gerant
                </CustomText>
              </View>
            </View>
            <View style={styles.imgBackground}>
              <Image source={imageRessource.user} style={styles.imgProfil} />
              <CustomText fontWeight="bold" fontSize={18} marginTop={10}>
                Toure Ben Daouda
              </CustomText>
              <CustomText>mrbtd@gmail.com</CustomText>
              <CustomText marginTop={5} marginBottom={5}>
                +2250103493070
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '5%',
            marginHorizontal: '5%',
          }}>
          <View style={{width: '30%'}}>
            <CustomButton
              label="Modifier"
              backgroundColor={paletteColor.yellow}
              borderColor={paletteColor.yellow}
              colorText={paletteColor.white}
            />
          </View>
          <View style={{width: '45%'}}>
            <CustomButton label="Deconnexion" />
          </View>
        </View>
        <View />
      </LinearGradient>
    </View>
  );
};

export default AccueilGerant;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
  },

  cardNotif: {
    marginTop: 20,
    backgroundColor: paletteColor.white,
    borderRadius: 13,
    elevation: 1,
  },
  imgBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  imgProfil: {
    resizeMode: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: '4%',
  },
  lngImg: {width: 25, height: 25, marginRight: 15, borderWidth: 2},
});
