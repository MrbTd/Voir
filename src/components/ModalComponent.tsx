import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {paletteColor} from '../utils/Constantes';
import CustomButton from './CustomButton';

interface ModalComponentProps {
  title: string;
  subtitle: string;
  modalVisible: boolean | undefined;
  onContinue: ((params: any) => any) | undefined;
  onCancel: ((params: any) => any) | undefined;
}

const ModalComponent = ({
  title,
  subtitle,
  modalVisible,
  onContinue,
  onCancel,
}: ModalComponentProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 20,
        }}>
        <View>
          <View style={{backgroundColor: paletteColor.marron, padding: '3%'}}>
            <CustomText
              textAlign="center"
              color={paletteColor.white}
              fontWeight="bold">
              {title}
            </CustomText>
          </View>
          <View style={{backgroundColor: paletteColor.white, padding: '4%'}}>
            <CustomText fontSize={18} color={paletteColor.black}>
              {subtitle}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <View style={{width: '45%'}}>
              <CustomButton
                label="ANNULER"
                backgroundColor={paletteColor.white}
                colorText={paletteColor.marron}
                onPress={onCancel}
              />
            </View>
            <View style={{width: '45%'}}>
              <CustomButton label="CONTINUER" onPress={onContinue} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({});
