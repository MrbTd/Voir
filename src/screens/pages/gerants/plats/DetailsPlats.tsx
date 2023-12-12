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
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {deletePlat} from '../../../../reducers/gerant/reducerPlat';
import ModifierPlats from './ModifierPlats';

const DetailsPlats = ({route}: any) => {
  const item = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deletePlat(item?.id, navigation));
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
          label="Détails plat"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          disabled={true}
          borderRadius={0}
        />
        <DisplayDetailsComponent title="DESIGNATION" value={item.name} />
        <DisplayDetailsComponent title="DESCRIPTION" value={item.description} />
        <DisplayDetailsComponent title="CATEGORIE" value={item.category_name} />
        <DisplayDetailsComponent
          title="PRIX MOYEN"
          value={`${item.prix} FCFA`}
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
              label="Supprimer le plats"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </ScrollView>

      <ModalComponent
        title="SUPPRESSION DU Plats"
        subtitle="Attention, vous êtes sur le point de supprimer un Plats. Etes vous sûr de vouloir conntinuer ?"
        modalVisible={modalVisible}
        onContinue={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
      {/* 
      <BottomSheetComponent
        title="Modifier le plats"
        isVisible={bottomVisible}
        onCancel={() => setBottomVisible(false)}
        onSave={() => {
          setBottomVisible(false);
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

      <ModifierPlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
        item={item}
      />
    </View>
  );
};

export default DetailsPlats;

const styles = StyleSheet.create({});
