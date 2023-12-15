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
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {createSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
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
  const [filePicture, setFilePicture] = useState(item?.image) as any;
  const [designation, setDesignation] = useState(item?.name);
  const [description, setDescription] = useState(item?.description);
  const [prix, setPrix] = useState(item?.prix);
  const [sousCatPlat, setSousCatPlat] = useState(item?.category_name);
  const [platSousCatData, setPlatSousCatData] = useState([]) as any;
  const formData = new FormData();
  const {dataSousCat} = useAppSelector(state => state.sousCatGerant);
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
    formData.append('category_name', sousCatPlat);

    if (!handleError()) {
      dispatch(updatePlat(item?.id, formData, navigation));
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
    if (!designation || !filePicture || !description || !prix || !sousCatPlat) {
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
    setPlatSousCatData(data);
  }, []);

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
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDesignation(e)}
        defaultValue={designation}
      />
      <TextInput
        placeholder="DESCRIPTION:"
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDescription(e)}
        defaultValue={description}
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
          key: item.name,
          value: item.name,
        }}
        inputStyles={{
          left: -15,
          color: sousCatPlat ? paletteColor.black : paletteColor.marron,
        }}
        dropdownStyles={{
          backgroundColor: 'white',
        }}
      />

      <TextInput
        placeholder="PRIX:"
        style={{borderBottomWidth: 0.5}}
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
