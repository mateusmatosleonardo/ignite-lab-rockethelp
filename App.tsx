import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { THEME } from './src/styles/theme';
import { StatusBar } from 'react-native';

import { SignIn } from './src/screens/SignIn/SignIn';
import { Loading } from './src/components/Loading/Loading';
import { Home } from './src/screens/Home/Home';
import { Register } from './src/screens/Register/Register';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <NativeBaseProvider theme={THEME}>
        {fontsLoaded ? <Register /> : <Loading />}
      </NativeBaseProvider>
    </>
  );
}

