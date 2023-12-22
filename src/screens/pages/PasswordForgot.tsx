import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {imageRessource, paletteColor, showToast} from '../../utils/Constantes';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {loginAuth} from '../../services/apiService';
import {asyncStorageType, statusCode} from '../../utils/data';
import {
  actionReducer,
  actionTypeReducer,
} from '../../contexts/reducers/actionReducer';
import {useAuth} from '../../hooks/AuthProvider';
import {asyncPostToken} from '../../services/asyncStorage';
import LoadingModal from '../../components/LoadingModal';
type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("L'adresse e-mail n'est pas valide")
      .required("L'adresse e-mail est requise"),
    password: yup.string().required('Le mot de passe est requis'),
  })
  .required();

const PasswordForgot = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {dispatchAuhtContext} = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const res = await loginAuth(data);
      if (res.status_code == statusCode.SUCESS) {
        setIsLoading(false);
      } else {
        console.log(res);
        setIsLoading(false);
        showToast(res?.message);
      }
    } catch (error: any) {
      console.log('error', error);
      setIsLoading(false);
      showToast('Erreur de réseau');
    }
  };

  return (
    <ScrollView
      style={{height: Dimensions.get('screen').height}}
      scrollEnabled={false}>
      <View
        style={{
          height: Dimensions.get('screen').height,
          justifyContent: 'flex-end',
        }}>
        <View style={{height: Dimensions.get('screen').height / 1.4}}>
          <LinearGradient
            colors={[paletteColor.yellow, paletteColor.marron]}
            style={{
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              flex: 3,
              position: 'relative',
            }}>
            <Image
              source={imageRessource.logo}
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
                zIndex: 100,
                left: (screenWidth - 100) / 2,
                top: '-10%',
              }}
            />
            <View
              style={{
                marginTop: '20%',
                paddingHorizontal: 30,
              }}>
              <CustomText
                textAlign="center"
                marginBottom={30}
                color={paletteColor.white}
                fontSize={30}
                fontWeight="bold">
                Mot de passe oublié
              </CustomText>

              <Controller
                control={control}
                rules={{}}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomTextInput
                    title="Email"
                    marginTop={15}
                    marginBottom={20}
                    colorTitle={paletteColor.white}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <CustomText color={paletteColor.red}>
                  {errors.email.message}
                </CustomText>
              )}

              <CustomButton
                backgroundColor={
                  !isValid ? paletteColor.grey_light : paletteColor.white
                }
                label="CONNEXION"
                marginTop={10}
                colorText={!isValid ? paletteColor.grey : paletteColor.marron}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                fontWeight="bold"
              />
            </View>
          </LinearGradient>
        </View>
      </View>
      <LoadingModal visible={isLoading} />
    </ScrollView>
  );
};

export default PasswordForgot;

const styles = StyleSheet.create({});
