import React, {useState} from 'react';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {StyleSheet, View, Text, FlexAlignType, ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {paletteColor} from '../utils/Constantes';
import CustomButton from './CustomButton';

interface BottomSheetComponentProps {
  title: string;
  btnTitle?: string;
  isVisible: boolean | undefined;
  onCancel: ((params: any) => any) | undefined;
  onSave: ((params: any) => any) | undefined;
  children: any;
}

const BottomSheetComponent = ({
  title,
  btnTitle = 'Sauvegarder',
  onCancel,
  onSave,
  isVisible,
  children,
}: BottomSheetComponentProps) => {
  return (
    <SafeAreaProvider>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        <View
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: paletteColor.white,
            paddingVertical: '8%',
            paddingHorizontal: '4%',
          }}>
          <ScrollView>
            <CustomButton
              backgroundColor={paletteColor.marron}
              label={title}
              marginTop={10}
              colorText={paletteColor.white}
              fontSize={20}
              fontWeight="bold"
              disabled={true}
              borderRadius={0}
            />
            {children}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <View style={{width: '30%'}}>
                <CustomButton
                  label="Annuler"
                  backgroundColor={paletteColor.white}
                  onPress={onCancel}
                  borderColor={paletteColor.yellow}
                  borderWidth={2}
                  colorText={paletteColor.yellow}
                />
              </View>
              <View style={{width: '45%'}}>
                <CustomButton
                  label={btnTitle}
                  onPress={onSave}
                  backgroundColor={paletteColor.yellow}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
};

export default BottomSheetComponent;
