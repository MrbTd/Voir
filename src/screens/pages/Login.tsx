import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { imageRessource, paletteColor } from '../../utils/Constantes'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../../components/CustomText'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { ScrollView } from 'react-native-gesture-handler'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigation } from '@react-navigation/native'
type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email('L\'adresse e-mail n\'est pas valide').required('L\'adresse e-mail est requise'),
    password: yup.string().required('Le mot de passe est requis'),
  })
  .required()


const Login = () => {
  const screenWidth = Dimensions.get("window").width;
  const navigation=useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors,isValid  },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode:"onTouched"

  })
  const onSubmit = (data:Inputs) => navigation.navigate("StackHome"as never)

  return (
    <ScrollView style={{  height:Dimensions.get('screen').height}}
    scrollEnabled={false}

    >
      <View style={{ height:Dimensions.get('screen').height,justifyContent:'flex-end'}}>
      <View style={{ height:Dimensions.get('screen').height/1.25 }}>
        <LinearGradient colors={[paletteColor.yellow, paletteColor.marron]} style={{ borderTopLeftRadius: 100, borderTopRightRadius: 100, flex: 3, position: 'relative' }}>
          <Image source={imageRessource.logo} style={{ width: 100, height: 100, position: 'absolute', zIndex: 100, left: (screenWidth - 100) / 2, top: -50 }} />
          <View style={{marginTop:Dimensions.get('window').height/7,paddingHorizontal:30}}>
            
          <CustomText textAlign='center' marginBottom={30} color={paletteColor.white} fontSize={30} fontWeight='bold'>Connexion</CustomText>
          
          <Controller
              control={control}
              rules={{
              }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                title='Email'
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
             {errors.email && <CustomText color={paletteColor.red}>{errors.email.message}</CustomText>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                title='Mot de passe'
                marginTop={15}
                marginBottom={20}
                colorTitle={paletteColor.white}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
           />  
           {errors.password && <CustomText  color={paletteColor.red}>{errors.password.message}</CustomText>}

            <CustomButton
            backgroundColor={!isValid?paletteColor.grey_light:paletteColor.white}
            label='CONNEXION'
            marginTop={10}
            colorText={!isValid?paletteColor.grey:paletteColor.marron}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            fontWeight="bold"
            />
            <CustomText textAlign='center' marginTop={10} marginBottom={5} color={paletteColor.white}>Mot de passe oublié ?</CustomText>

          </View>
        </LinearGradient>
      </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({})
