import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {paletteColor} from '../utils/Constantes';

const LoadingModal = ({visible}: {visible: boolean}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 20,
          paddingHorizontal: '15%',
        }}>
        <ActivityIndicator size="large" color={paletteColor.yellow} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
