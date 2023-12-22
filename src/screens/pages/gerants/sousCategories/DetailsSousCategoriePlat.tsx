import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderYam from '../../../../components/HeaderYam';
import CustomButton from '../../../../components/CustomButton';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import {ScrollView} from 'react-native-gesture-handler';
import ModalComponent from '../../../../components/ModalComponent';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModifierSousCategoriePlats from './ModifierSousCategoriePlats';
import {deleteSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';

const DetailsSousCategoriePlat = ({route}: any) => {
  const item = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteSousCategorie(item?.id, navigation));
    setModalVisible(false);
    console.log('clique');
  };

  return (
    <View style={{height: Dimensions.get('screen').height}}>
      <HeaderYam
        navigate={
          <MaterialIcons
            name="menu"
            size={35}
            color={paletteColor.white}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          />
        }
      />

      <ScrollView
        style={{marginHorizontal: '5%'}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <CustomButton
          backgroundColor={paletteColor.marron}
          label="Détails sous catégorie"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          disabled={true}
          borderRadius={0}
        />
        <DisplayDetailsComponent title="NOM" value={item.name} />
        <DisplayDetailsComponent title="CATEGORIE" value={item.cat} />

        <DisplayDetailsComponent
          title="PHOTO"
          img={true}
          value={
            <View>
              <Image
                source={{uri: item?.image_link}}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
            </View>
          }
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '5%',
          }}>
          <View style={{width: '30%'}}>
            <CustomButton
              label="Modifier"
              backgroundColor={paletteColor.yellow}
              onPress={() => setBottomVisible(!bottomVisible)}
            />
          </View>
          <View style={{width: '45%'}}>
            <CustomButton
              label="Supprimer la sous catégorie"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </ScrollView>

      <ModalComponent
        title="SUPPRESSION DE LA SOUS CATEGORIE"
        subtitle="Attention, vous êtes sur le point de supprimer une sous catégorie. Etes vous sûr de vouloir conntinuer ?"
        modalVisible={modalVisible}
        onContinue={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
      <ModifierSousCategoriePlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
        item={item}
      />
    </View>
  );
};

export default DetailsSousCategoriePlat;

const styles = StyleSheet.create({});
