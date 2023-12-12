import {ColorValue, DimensionValue, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {paletteColor} from '../utils/Constantes';

interface PropsText {
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  fontSize?: number | undefined;
  children: any;
  marginTop?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  onPress?: (params: any) => any;
  backgroundColor?: ColorValue;
  padding?: string | number | undefined;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  marginLeft?: DimensionValue | undefined;
  numberOfLines?: number | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  color?: ColorValue | undefined;
  marginRight?: DimensionValue | undefined;
}

const CustomText = ({
  ellipsizeMode,
  numberOfLines,
  marginLeft,
  children,
  marginRight,
  textTransform,
  onPress,
  marginTop,
  marginBottom,
  textAlign,
  color = paletteColor.black,
  fontSize,
  fontWeight,
}: PropsText) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={{
        marginLeft,
        marginTop,
        marginBottom,
        textAlign,
        color,
        fontSize,
        fontWeight,
        marginRight,
        textTransform,
      }}>
      {children}
    </Text>
  );
};

export default CustomText;
