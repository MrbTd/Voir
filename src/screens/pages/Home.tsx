import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {imageRessource, paletteColor} from '../../utils/Constantes';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {
  actionReducer,
  actionTypeReducer,
} from '../../contexts/reducers/actionReducer';
import {useAuth} from '../../hooks/AuthProvider';
import {asyncRemoveGetToken} from '../../services/asyncStorage';
import {useAppDispatch} from '../../hooks/dispatchSelector';
import {initializePlat} from '../../reducers/gerant/reducerPlat';
import {initializeTable} from '../../reducers/gerant/reducerTable';

const Home = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {dispatchAuhtContext} = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializePlat());
    dispatch(initializeTable());
    // dispatch(initializeSousCategorie());
    // dispatch(initializeCategoriePlat());
    // dispatch(initializeBoisson());
    // dispatch(initializeUtilisateur());
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={{position: 'relative'}}>
          <ImageBackground
            source={imageRessource.pattern}
            style={{height: 200}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
                backgroundColor: paletteColor.white,
                padding: '2%',
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={imageRessource.user}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
                <CustomText marginLeft={5}>Toure Ben Daouda</CustomText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatchAuhtContext(
                    actionReducer(actionTypeReducer.SIGN_OUT),
                  );
                  asyncRemoveGetToken();
                }}>
                <Image
                  source={imageRessource.deconnexion}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Image
            source={imageRessource.logo}
            style={{
              width: 120,
              height: 120,
              position: 'absolute',
              zIndex: 100,
              left: (screenWidth - 100) / 2,
              bottom: '-25%',
            }}
          />
        </View>
        <View style={{marginTop: '20%', marginHorizontal: '5%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: paletteColor.white,
              padding: '2%',
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate('ListMenu' as never)}
            activeOpacity={0.7}>
            <ImageBackground
              source={imageRessource.commande}
              style={{
                height: 120,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'flex-end',
              }}>
              <CustomText
                color={paletteColor.white}
                fontWeight="bold"
                marginBottom="3%"
                fontSize={16}>
                Passer une commande
              </CustomText>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: paletteColor.white,
              padding: '2%',
              borderRadius: 8,
              marginTop: '10%',
            }}
            onPress={() => navigation.navigate('ListCommande' as never)}
            activeOpacity={0.7}>
            <ImageBackground
              source={imageRessource.commandeEnCours}
              style={{
                height: 120,
                alignItems: 'center',
                borderRadius: 8,
                justifyContent: 'flex-end',
              }}>
              <CustomText
                color={paletteColor.white}
                fontWeight="bold"
                marginBottom="3%"
                fontSize={16}>
                Commande en cours
              </CustomText>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
