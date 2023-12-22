import {
  ColorValue,
  DimensionValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../utils/Constantes';
interface PropsTextInput {
  height?: DimensionValue | undefined;
  borderColor?: ColorValue;
  borderWidth?: number | undefined;
  borderRadius?: number | undefined;
  paddingHorizontal?: string | number | undefined;
  placeholder?: string;
  title?: string;
  subTitle?: string;
  verifIcon?: boolean;
  secureTextEntry?: boolean;
  onPress?: (params: any) => any;
  onPressText?: (params: any) => any;
  backgroundColor?: ColorValue;
  elevation?: number | undefined;
  nameIcon?: string;
  marginTop?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  value?: string | undefined;
  editable?: boolean;
  colorIcon?: ColorValue;
  multiline?: boolean | undefined;
  disabled?: boolean | null | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  defaultValue?: string | undefined;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  colorTitle?: ColorValue | undefined;
}

const CustomTextInput = ({
  height,
  borderColor = paletteColor.white,
  borderWidth = 0.5,
  borderRadius = 10,
  placeholder,
  title,
  colorTitle,
  verifIcon = false,
  onPress,
  secureTextEntry,
  backgroundColor = paletteColor.white,
  nameIcon = 'eye',
  marginTop,
  marginBottom,
  value,
  editable = true,
  colorIcon = paletteColor.white,
  multiline,
  onChangeText,
  defaultValue,
  onFocus,
  onBlur,
  keyboardType,
  onPressText,
}: PropsTextInput) => {
  return (
    <View>
      <CustomText color={colorTitle}>{title}</CustomText>

      <View
        style={{
          backgroundColor,
          marginBottom,
          marginTop,
          borderRadius,
          borderWidth,
          borderColor,
          height,
        }}>
        <TextInput
          keyboardType={keyboardType}
          onBlur={onBlur}
          onFocus={onFocus}
          style={{color: paletteColor.black}}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor="rgba(000,000,000,0.5)"
          secureTextEntry={secureTextEntry}
          value={value}
          editable={editable}
        />
        {verifIcon == true && (
          <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons
              color={colorIcon}
              name={secureTextEntry ? 'eye-off' : nameIcon}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
