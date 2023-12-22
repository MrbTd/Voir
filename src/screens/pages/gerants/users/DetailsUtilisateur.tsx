import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderYam from '../../../../components/HeaderYam';
import CustomButton from '../../../../components/CustomButton';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import ModalComponent from '../../../../components/ModalComponent';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deleteUtilisateur} from '../../../../reducers/gerant/reducerUtilisateur';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import ModifierUtilisateur from './ModifierUtilisateur';

const DetailsUtilisateur = ({route}: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const item = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUtilisateur(item?.id, navigation));
    setModalVisible(false);
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
          label="Détails de l'utilisateur"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          disabled={true}
          borderRadius={0}
        />
        <DisplayDetailsComponent title="NOM" value={item.name} />
        <DisplayDetailsComponent title="EMAIL" value={item.email} />
        <DisplayDetailsComponent title="TYPE D'UTILISATEUR" value={item.type} />
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
              label="Supprimer l'utilisateur"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        title="SUPPRESSION D'UTILISATEUR"
        subtitle="Attention, vous êtes sur le point de supprimer un utilisateur. Etes vous sûr de vouloir conntinuer ?"
        modalVisible={modalVisible}
        onContinue={handleDelete}
        onCancel={() => setModalVisible(false)}
      />

      <ModifierUtilisateur
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
        item={item}
      />
    </View>
  );
};

export default DetailsUtilisateur;

const styles = StyleSheet.create({});
