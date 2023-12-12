import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/screens/navigations/Navigation';
import AuthProvider from './src/hooks/AuthProvider';
import {Provider} from 'react-redux';
import {store} from './src/services/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
