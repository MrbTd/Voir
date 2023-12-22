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
import {
  formaDate,
  imageRessource,
  paletteColor,
} from '../../../../utils/Constantes';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import ModalComponent from '../../../../components/ModalComponent';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {deleteCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';
import ModifierCategoriePlat from './ModifierCategoriePlat';

const DetailsCategoriePlat = ({route}: any) => {
  const item = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCategoriePlat(item?.id, navigation));

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
        style={{marginHorizontal: '5%', marginTop: '2%'}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <CustomButton
          backgroundColor={paletteColor.marron}
          label="Détails de la catégorie"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          disabled={true}
          borderRadius={0}
        />
        <DisplayDetailsComponent title="NOM" value={item?.designation} />
        <DisplayDetailsComponent
          title="DATE CREATION"
          value={formaDate(item.created_at)}
        />

        {/* <DisplayDetailsComponent title="PRIX MOYEN" value={item.prixm} />
        <DisplayDetailsComponent
          title="ALLERGENES COURANTS"
          value={item.allegerne}
        /> */}
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
              label="Supprimer la catégorie"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        title="SUPPRESSION DE CATEGORIE"
        subtitle="Attention, vous êtes sur le point de supprimer une catégorie. Etes vous sûr de vouloir conntinuer ?"
        modalVisible={modalVisible}
        onContinue={handleDelete}
        onCancel={() => setModalVisible(false)}
      />

      {/*  <BottomSheetComponent
        title="Modifier la catégorie"
        isVisible={bottomVisible}
        onCancel={() => setBottomVisible(false)}
        onSave={() => {
          setBottomVisible(false);
          navigation.navigate('ListUtilisateur' as never);
        }}>
        <DisplayDetailsComponent title="NOM" value={item.categorie} />
        <DisplayDetailsComponent title="DESCRIPTION" value={item.description} />
        <DisplayDetailsComponent
          title="SOUS-CATEGORIE"
          value={item.souscategorie}
        />
        <DisplayDetailsComponent title="PRIX MOYEN" value={item.prixm} />
        <DisplayDetailsComponent
          title="ALLERGENES COURANTS"
          value={item.allegerne}
        />
        <DisplayDetailsComponent
          title="PHOTO"
          img={true}
          value={
            <View>
              <Image
                source={imageRessource.eat}
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
      </BottomSheetComponent> */}

      <ModifierCategoriePlat
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
        item={item}
      />
    </View>
  );
};

export default DetailsCategoriePlat;

const styles = StyleSheet.create({});
