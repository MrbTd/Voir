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
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import ModalComponent from '../../../../components/ModalComponent';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModifierTables from './ModifierTables';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {deleteTable} from '../../../../reducers/gerant/reducerTable';

const DetailsTables = ({route}: any) => {
  const item = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTable(item?.id, navigation));

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
          label="Détails table"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          disabled={true}
          borderRadius={0}
        />
        <DisplayDetailsComponent
          title="numero de table"
          value={item.numero_table}
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
              label="Supprimer la table"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </ScrollView>

      <ModalComponent
        title="SUPPRESSION DE LA TABLE"
        subtitle="Attention, vous êtes sur le point de supprimer une table. Etes vous sûr de vouloir conntinuer ?"
        modalVisible={modalVisible}
        onContinue={handleDelete}
        onCancel={() => setModalVisible(false)}
      />

      {/*   <BottomSheetComponent
        title="Modifier la table"
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
      <ModifierTables
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
        item={item}
      />
    </View>
  );
};

export default DetailsTables;

const styles = StyleSheet.create({});
