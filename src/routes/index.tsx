import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../screens/SignIn/SignIn';
import { AppRoutes } from './app.routes';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading/Loading';

export function Routes() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response);
        setLoading(false);
      });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? < AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}