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
  getExtension,
  imageRessource,
  paletteColor,
  showToast,
  uuidCustome,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {
  createSousCategorie,
  updateSousCategorie,
} from '../../../../reducers/gerant/reducerSousCategorie';
import {useNavigation} from '@react-navigation/native';

interface AjouterCategoriePlatsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierSousCategoriePlats = ({
  bottomVisible,
  setBottomVisible,
  item,
}: AjouterCategoriePlatsProps) => {
  const [filePicture, setFilePicture] = useState({
    uri: item?.image_link,
    type: `image/${getExtension(item?.image_link)}`,
    name: uuidCustome.slice(0, 11) + '.' + getExtension(item?.image_link),
  }) as any;

  const [name, setName] = useState(item?.name);
  const [catPlat, setCatPlat] = useState('');
  const [platCatData, setPlatCatData] = useState([]) as any;
  const formData = new FormData();
  const {dataCatPlat} = useAppSelector(state => state.catPlaGerant);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const picture = {
      uri: filePicture?.uri,
      type: filePicture?.type,
      name: filePicture?.name,
    };

    formData.append('name', name);
    formData.append('image', picture);
    formData.append('cat', catPlat);

    if (!handleError()) {
      dispatch(updateSousCategorie(item?.id, formData, navigation));
    }

    setBottomVisible(false);
  };

  const handleError = () => {
    if (!name || !filePicture.uri || !catPlat) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const data = dataCatPlat.map((item: any) => {
      return {
        key: item.designation,
        value: item.designation,
      };
    });
    setPlatCatData(data);
  }, [dataCatPlat]);

  return (
    <BottomSheetComponent
      title="Modifier une sous  categorie"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Modifier">
      <TextInput
        placeholder="NOM:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setName(e)}
        defaultValue={name}
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
          key: item?.cat,
          value: item?.cat,
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

export default ModifierSousCategoriePlats;

const styles = StyleSheet.create({});
