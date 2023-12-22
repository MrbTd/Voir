import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import HeaderYam from '../../../../components/HeaderYam';
import {
  getExtension,
  imageRessource,
  paletteColor,
  showToast,
  uuidCustome,
} from '../../../../utils/Constantes';
import CustomButton from '../../../../components/CustomButton';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {SelectList} from 'react-native-dropdown-select-list';
import {dataRole} from '../../../../utils/data';
import CustomText from '../../../../components/CustomText';
import DocumentPicker from 'react-native-document-picker';
import {updateUtilisateur} from '../../../../reducers/gerant/reducerUtilisateur';
import LoadingModal from '../../../../components/LoadingModal';

const UpdateProfilUser = ({route}: any) => {
  const item = route?.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
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

  const {isLoadingUser} = useAppSelector(state => state.usersGerant);

  const handleError = () => {
    if (!name || !email || !typeRole || !filePicture.uri) {
      return true;
    } else {
      return false;
    }
  };

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
        updateUtilisateur(item?.id, formData, navigation, 'AccueilGerant'),
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
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
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            bottom: -20,
            width: '80%',
            left: '10%',
          }}>
          <CustomButton
            backgroundColor={paletteColor.marron}
            label="Modifier le profile"
            marginTop={10}
            colorText={paletteColor.white}
            fontSize={20}
            fontWeight="bold"
            disabled={true}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '8%',
        }}>
        <View>
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
          />

          <View
            style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
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
                <MaterialIcons
                  name="check"
                  color={paletteColor.green}
                  size={30}
                />
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
        </View>
        <CustomButton
          backgroundColor={paletteColor.yellow}
          label="Modifier"
          marginTop={10}
          colorText={paletteColor.white}
          fontSize={20}
          fontWeight="bold"
          onPress={
            handleError()
              ? () => showToast('veuillez remplir tous les champs svp !')
              : handleSubmit
          }
        />
        {/*  */}
      </View>
      <LoadingModal visible={isLoadingUser} />
    </View>
  );
};

export default UpdateProfilUser;

const styles = StyleSheet.create({});
