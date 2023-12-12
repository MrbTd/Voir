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
import {useAppDispatch} from '../../../../hooks/dispatchSelector';
import {useNavigation} from '@react-navigation/native';
import {createBoisson} from '../../../../reducers/gerant/reducerBoisson';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AjouterBoissonsProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AjouterBoissons = ({
  bottomVisible,
  setBottomVisible,
}: AjouterBoissonsProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formData = new FormData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [filePicture, setFilePicture] = useState(null) as any;

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
      dispatch(createBoisson(formData, navigation));
    }
    resetState();
    setBottomVisible(false);
  };
  const resetState = () => {
    setName('');
    setDescription('');
    setPrix('');
    setFilePicture(null);
  };
  const handleError = () => {
    if (!name || !description || !prix || !filePicture) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BottomSheetComponent
      title="Ajouter une boisson"
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
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setName(e)}
      />
      <TextInput
        placeholder="DESCRIPTION:"
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setDescription(e)}
      />

      <TextInput
        placeholder="PRIX:"
        style={{borderBottomWidth: 0.5}}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setPrix(e)}
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

export default AjouterBoissons;

const styles = StyleSheet.create({});
