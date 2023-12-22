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
import {useNavigation} from '@react-navigation/native';
import {updatePlat} from '../../../../reducers/gerant/reducerPlat';

interface ModifierPlatsPlatsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierPlats = ({
  bottomVisible,
  setBottomVisible,
  item,
}: ModifierPlatsPlatsProps) => {
  const [filePicture, setFilePicture] = useState({
    uri: item?.image_link,
    type: `image/${getExtension(item?.image_link)}`,
    name: uuidCustome.slice(0, 11) + '.' + getExtension(item?.image_link),
  }) as any;

  const [designation, setDesignation] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
  const [prix, setPrix] = useState(item?.prix);
  const [sousCatPlat, setSousCatPlat] = useState(item?.souscat);
  const [catPlat, setCatPlat] = useState(item?.category_name);
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
      dispatch(updatePlat(item?.id, formData, navigation));
    }
    setBottomVisible(false);
  };

  const handleError = () => {
    if (
      !designation ||
      !filePicture?.uri ||
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
    const dataSousCategorie = dataSousCat.map((item: any) => {
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
    setPlatSousCatData(dataSousCategorie);
    setPlatCatData(dataCat);
  }, [dataSousCat, dataCatPlat]);

  return (
    <BottomSheetComponent
      title="Modifier un plats"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Modifier">
      <TextInput
        placeholder="DESIGNATION:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDesignation(e)}
        defaultValue={designation}
      />
      <TextInput
        placeholder="DESCRIPTION:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDescription(e)}
        defaultValue={description}
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
          key: item.category_name,
          value: item.category_name,
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
          key: item.souscat,
          value: item.souscat,
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
        defaultValue={`${prix}`}
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

export default ModifierPlats;

const styles = StyleSheet.create({});
