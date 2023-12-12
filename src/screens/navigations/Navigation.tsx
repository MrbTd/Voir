import {StatusBar, View} from 'react-native';
import React from 'react';
import ContainNavigation from './ContainNavigation';

const Navigation = () => {
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" /> */}
      <ContainNavigation />
    </View>
  );
};

export default Navigation;
