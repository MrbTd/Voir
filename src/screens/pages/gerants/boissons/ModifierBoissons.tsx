import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {SelectList} from 'react-native-dropdown-select-list';
import {dataRole, userRole} from '../../../../utils/data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createUtilisateur} from '../../../../reducers/gerant/reducerUtilisateur';
import {useNavigation} from '@react-navigation/native';
import {updateBoisson} from '../../../../reducers/gerant/reducerBoisson';

interface ModifierBoissonsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierBoissons = ({
  bottomVisible,
  setBottomVisible,
  item,
}: ModifierBoissonsProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formData = new FormData();
  const [name, setName] = useState(item?.designation);
  const [description, setDescription] = useState(item?.description);
  const [prix, setPrix] = useState(item?.prix);

  const [filePicture, setFilePicture] = useState({
    uri: item?.image_link,
    type: `image/${getExtension(item?.image_link)}`,
    name: uuidCustome.slice(0, 11) + '.' + getExtension(item?.image_link),
  }) as any;

  const handleSubmit = async () => {
    const picture = {
      uri: filePicture?.uri,
      type: filePicture?.type,
      name: filePicture?.name,
    };

    formData.append('designation', name);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('image', picture);

    if (!handleError()) {
      dispatch(updateBoisson(item?.id, formData, navigation));
    }
    setBottomVisible(false);
  };

  const handleError = () => {
    if (!name || !description || !prix || !filePicture?.uri) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BottomSheetComponent
      title="Modifier une boisson"
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
        onChangeText={e => setName(e)}
        defaultValue={name}
      />
      <TextInput
        placeholder="DESCRIPTION:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDescription(e)}
        defaultValue={description}
      />

      <TextInput
        placeholder="PRIX:"
        style={{borderBottomWidth: 0.5, color: paletteColor.black}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setPrix(e)}
        keyboardType="numeric"
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

export default ModifierBoissons;

const styles = StyleSheet.create({});
