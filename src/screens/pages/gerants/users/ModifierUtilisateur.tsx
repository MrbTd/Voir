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
import {
  createUtilisateur,
  updateUtilisateur,
} from '../../../../reducers/gerant/reducerUtilisateur';
import {useNavigation} from '@react-navigation/native';

interface AjouterUtilisateurProps {
  bottomVisible: boolean | undefined;
  setBottomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}

const ModifierUtilisateur = ({
  bottomVisible,
  setBottomVisible,
  item,
}: AjouterUtilisateurProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formData = new FormData();
  const [name, setName] = useState(item?.name);
  const [email, setEmail] = useState(item?.email);
  const [password, setPassword] = useState('');
  const [typeRole, setTypeRole] = useState(item?.type);

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

    formData.append('name', name);
    formData.append('type', typeRole);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', picture);

    if (!handleError()) {
      dispatch(
        updateUtilisateur(item?.id, formData, navigation, 'ListUtilisateur'),
      );
    }
    setBottomVisible(false);
  };

  const handleError = () => {
    if (!name || !email || !typeRole || !filePicture.uri) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BottomSheetComponent
      title="Modifier l'utilisateur"
      isVisible={bottomVisible}
      onCancel={() => setBottomVisible(false)}
      onSave={
        handleError()
          ? () => showToast('veuillez remplir tous les champs svp !')
          : handleSubmit
      }
      btnTitle="Modifier">
      <TextInput
        placeholder="NOM & PRENOM :"
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: paletteColor.grey,
          color: paletteColor.black,
        }}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setName(e)}
        defaultValue={name}
      />

      <TextInput
        placeholder="EMAIL :"
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: paletteColor.grey,
          color: paletteColor.black,
        }}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setEmail(e)}
        defaultValue={email}
      />
      <TextInput
        placeholder="MOT DE PASSE :********"
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: paletteColor.grey,
          color: paletteColor.black,
        }}
        placeholderTextColor={paletteColor.marron}
        onChangeText={e => setPassword(e)}
      />
      <SelectList
        setSelected={(val: React.SetStateAction<string>) => {
          setTypeRole(val);
        }}
        data={dataRole}
        save="key"
        search={false}
        boxStyles={{
          borderWidth: 0,
          borderBottomWidth: 0.5,
          borderRadius: 0,
          borderBottomColor: paletteColor.red,
        }}
        defaultOption={{
          key: typeRole,
          value: typeRole,
        }}
        inputStyles={{
          left: -15,
          color: typeRole ? paletteColor.black : paletteColor.marron,
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

export default ModifierUtilisateur;

const styles = StyleSheet.create({});
