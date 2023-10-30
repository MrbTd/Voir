import {
    ColorValue,
    DimensionValue,
    FlexAlignType,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
import { paletteColor } from '../utils/Constantes';
import CustomText from './CustomText';

  
  interface PropsButton {
    onPress?: (params: any) => any;
    backgroundColor?: ColorValue | undefined;
    alignItems?: FlexAlignType | undefined;
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | undefined;
    flexDirection?:
      | 'row'
      | 'column'
      | 'row-reverse'
      | 'column-reverse'
      | undefined;
    height?: DimensionValue | undefined;
    borderRadius?: number | undefined;
    colorText?: ColorValue;
    label: string;
    borderWidth?: number | undefined;
    borderColor?: ColorValue | undefined;
    disabled?: boolean | undefined;
    marginTop?: DimensionValue | undefined;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    fontSize?: number | undefined;
    marginBottom?: DimensionValue | undefined
  }
  
  const CustomButton = ({
    onPress,
    backgroundColor = paletteColor.marron,
    alignItems = 'center',
    justifyContent = 'center',
    flexDirection = 'row',
    height = 55,
    borderRadius = 10,
    marginTop,
    marginBottom,
    borderWidth,
    colorText = paletteColor.white,
    borderColor,
    label,
    disabled,
    fontWeight="bold",
    fontSize
  }: PropsButton) => {
    return (
      <View>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={{
            backgroundColor:backgroundColor,
            alignItems,
            justifyContent,
            flexDirection,
            height,
            borderRadius,
            borderWidth,
            borderColor,
            marginTop
          }}>
       
          <CustomText color= {colorText} fontWeight={fontWeight} fontSize={fontSize}>{label}</CustomText>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default CustomButton;
  