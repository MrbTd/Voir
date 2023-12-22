import {ColorValue, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {paletteColor} from '../utils/Constantes';

interface DisplayDetailsComponentProps {
  title: string;
  value: any;
  img?: boolean;
  color?: ColorValue | undefined;
  border?: number | undefined;
}

const DisplayDetailsComponent = ({
  title,
  value,
  img,
  color = paletteColor.marron,
  border = 1,
}: DisplayDetailsComponentProps) => {
  return (
    <View style={{borderBottomWidth: border, paddingVertical: 2}}>
      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('screen').width / 2,
        }}>
        <CustomText
          fontSize={14}
          fontWeight="900"
          color={color}
          textTransform="uppercase">
          {title} :
        </CustomText>
        {img === true ? (
          value
        ) : (
          <View style={{width: '80%'}}>
            <CustomText fontSize={16}> {value}</CustomText>
          </View>
        )}
      </View>
    </View>
  );
};
export default DisplayDetailsComponent;

const styles = StyleSheet.create({});
