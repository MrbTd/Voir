import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {imageRessource, paletteColor} from '../utils/Constantes';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: paletteColor.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={imageRessource.logo} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
