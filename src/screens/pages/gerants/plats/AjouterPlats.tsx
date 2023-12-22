import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSheetComponent from '../../../../components/BottomSheetComponent';
import {
  imageRessource,
  paletteColor,
  showToast,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import {createPlat} from '../../../../reducers/gerant/reducerPlat';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AjouterPlatsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AjouterPlats = ({bottomVisible, setBottomVisible}: AjouterPlatsProps) => {
  const [filePicture, setFilePicture] = useState(null) as any;
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [sousCatPlat, setSousCatPlat] = useState('');
  const [catPlat, setCatPlat] = useState('');
  const [platSousCatData, setPlatSousCatData] = useState([]) as any;
  const [platCatData, setPlatCatData] = useState([]) as any;
  const formData = new FormData();
  const {dataSousCat} = useAppSelector(state => state.sousCatGerant);
  const {dataCatPlat} = useAppSelector(state => state.catPlaGerant);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const picture = {
      uri: filePicture?.uri,
      type: filePicture?.type,
      name: filePicture?.name,
    };

    formData.append('name', designation);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('image', picture);
    formData.append('category_name', catPlat);
    formData.append('souscat', sousCatPlat);

    if (!handleError()) {
      dispatch(createPlat(formData, navigation));
    }
    resetState();
    setBottomVisible(false);
  };

  const resetState = () => {
    setDesignation('');
    setDescription('');
    setPrix('');
    setSousCatPlat('');
    setFilePicture(null);
  };

  const handleError = () => {
    if (
      !designation ||
      !filePicture ||
      !description ||
      !prix ||
      !sousCatPlat ||
      !catPlat
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const data = dataSousCat.map((item: any) => {
      return {
        key: item.name,
        value: item.name,
      };
    });

    const dataCat = dataCatPlat.map((item: any) => {
      return {
        key: item.designation,
        value: item.designation,
      };
    });

    setPlatSousCatData(data);
    setPlatCatData(dataCat);
  }, [dataSousCat, dataCatPlat]);
  return (
    <BottomSheetComponent
      title="Ajouter un plats"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Ajouter">
      <TextInput
        placeholder="DESIGNATION:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDesignation(e)}
      />
      <TextInput
        placeholder="DESCRIPTION:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDescription(e)}
      />

      <SelectList
        setSelected={(val: React.SetStateAction<string>) => {
          setCatPlat(val);
        }}
        data={platCatData}
        save="key"
        search={false}
        boxStyles={{
          borderWidth: 0,
          borderBottomWidth: 0.5,
          borderRadius: 0,
          borderBottomColor: paletteColor.red,
        }}
        defaultOption={{
          key: 0,
          value: 'CATEGORIE',
        }}
        inputStyles={{
          left: -15,
          color: catPlat ? paletteColor.black : paletteColor.marron,
        }}
        dropdownStyles={{
          backgroundColor: 'white',
        }}
        dropdownTextStyles={{
          color: 'black',
        }}
      />

      <SelectList
        setSelected={(val: React.SetStateAction<string>) => {
          setSousCatPlat(val);
        }}
        data={platSousCatData}
        save="key"
        search={false}
        boxStyles={{
          borderWidth: 0,
          borderBottomWidth: 0.5,
          borderRadius: 0,
          borderBottomColor: paletteColor.red,
        }}
        defaultOption={{
          key: 0,
          value: 'SOUS-CATEGORIE',
        }}
        inputStyles={{
          left: -15,
          color: sousCatPlat ? paletteColor.black : paletteColor.marron,
        }}
        dropdownStyles={{
          backgroundColor: 'white',
        }}
        dropdownTextStyles={{
          color: 'black',
        }}
      />

      <TextInput
        placeholder="PRIX:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setPrix(e)}
        keyboardType="numeric"
      />
      <View style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
        <CustomText fontSize={14} color={paletteColor.marron}>
          PHOTO :{' '}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            })
              .then(res => setFilePicture(res[0]))
              .catch(() => console.log('error DocumentPicker bon'));
          }}>
          {filePicture ? (
            <MaterialIcons name="check" color={paletteColor.green} size={30} />
          ) : (
            <Image
              source={imageRessource.upload}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'cover',
                borderRadius: 8,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </BottomSheetComponent>
  );
};

export default AjouterPlats;

const styles = StyleSheet.create({});
