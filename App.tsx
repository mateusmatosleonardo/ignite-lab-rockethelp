import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/styles/theme';
import { Text, StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn/SignIn';


export default function App() {
  return (
    <>
      <StatusBar barStyle='default' />
      <NativeBaseProvider theme={THEME}>
        <SignIn />
      </NativeBaseProvider>
    </>
  );
}

