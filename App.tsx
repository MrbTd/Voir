import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Navigation from './src/screens/navigations/Navigation'

const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();

  }, [])

  return (
    <Navigation/>
  )
}

export default App

const styles = StyleSheet.create({})