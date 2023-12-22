import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import CustomButton from '../../../../components/CustomButton';
import {useAuth} from '../../../../hooks/AuthProvider';
import {
  actionReducer,
  actionTypeReducer,
} from '../../../../contexts/reducers/actionReducer';
import {asyncRemoveGetToken} from '../../../../services/asyncStorage';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {initializeSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
import {initializeCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';
import {initializeBoisson} from '../../../../reducers/gerant/reducerBoisson';
import {initializePlat} from '../../../../reducers/gerant/reducerPlat';
import {initializeTable} from '../../../../reducers/gerant/reducerTable';
import {initializeUtilisateur} from '../../../../reducers/gerant/reducerUtilisateur';
import {getUserConnect} from '../../../../services/apiService';
import LoadingModal from '../../../../components/LoadingModal';

const AccueilGerant = () => {
  const navigation = useNavigation();
  const {auhtContext, dispatchAuhtContext} = useAuth();
  const [dataUser, setDataUser] = useState({}) as any;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getData = () => {
    setIsLoading(true);
    getUserConnect(auhtContext.data?.idUser)
      .then(res => {
        setIsLoading(false);

        setDataUser(res?.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    getData();
    // dispatch(initializeSousCategorie());-----
    // dispatch(initializeCategoriePlat());----
    // dispatch(initializeBoisson());----
    // dispatch(initializePlat());-----
    // dispatch(initializeTable());------
    // dispatch(initializeUtilisateur());----
    return unsubscribe;
  }, []);

  return (
    <View style={{height: Dimensions.get('screen').height}}>
      <View>
        <LinearGradient
          colors={[
            paletteColor.marron,
            paletteColor.yellow,
            paletteColor.white,
          ]}
          style={{
            height: Dimensions.get('screen').height,
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
              YamBouffe
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
                    {dataUser?.utilisateur?.type}
                  </CustomText>
                </View>
              </View>
              <View style={styles.imgBackground}>
                <Image
                  source={{uri: dataUser?.chemin_image_profil}}
                  style={styles.imgProfil}
                />
                <CustomText fontWeight="bold" fontSize={18} marginTop={10}>
                  {dataUser?.utilisateur?.name}
                </CustomText>
                <CustomText> {dataUser?.utilisateur?.email}</CustomText>
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
                onPress={() =>
                  navigation.navigate({
                    name: 'UpdateProfilUser',
                    params: {
                      ...dataUser?.utilisateur,
                      image_link: dataUser?.chemin_image_profil,
                    },
                  } as never)
                }
              />
            </View>
            <View style={{width: '45%'}}>
              <CustomButton
                label="Deconnexion"
                onPress={() => {
                  dispatchAuhtContext(
                    actionReducer(actionTypeReducer.SIGN_OUT),
                  );
                  asyncRemoveGetToken();
                }}
              />
            </View>
          </View>
          <View />
        </LinearGradient>
      </View>
      <LoadingModal visible={isLoading} />
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
