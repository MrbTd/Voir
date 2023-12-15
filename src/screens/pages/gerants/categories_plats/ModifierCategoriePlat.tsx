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
  imageRessource,
  paletteColor,
  showToast,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import DocumentPicker from 'react-native-document-picker';
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {updateCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';

interface ModifierBoissonsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierCategoriePlat = ({
  bottomVisible,
  setBottomVisible,
  item,
}: ModifierBoissonsProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formData = new FormData();
  const [designation, setDesignation] = useState(item?.designation);
  const [filePicture, setFilePicture] = useState(item?.image) as any;

  const handleSubmit = async () => {
    const picture = {
      uri: filePicture?.uri,
      type: filePicture?.type,
      name: filePicture?.name,
    };

    formData.append('designation', designation);
    formData.append('lien', designation);
    formData.append('image', picture);

    if (!handleError()) {
      dispatch(updateCategoriePlat(item?.id, formData, navigation));
    }
    resetState();
    setBottomVisible(false);
  };

  const handleError = () => {
    if (!designation || !filePicture) {
      return true;
    } else {
      return false;
    }
  };

  const resetState = () => {
    setDesignation('');

    setFilePicture(null);
  };

  return (
    <BottomSheetComponent
      title="Modifier une catégorie"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Modifier">
      <TextInput
        placeholder="Designation:"
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDesignation(e)}
        defaultValue={designation}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          alignItems: 'center',
          marginTop: '5%',
        }}>
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

export default ModifierCategoriePlat;

const styles = StyleSheet.create({});
