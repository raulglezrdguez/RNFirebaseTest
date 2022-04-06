import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import UserContext from './context/user/userContext';

import Login from './screens/Login';

const Stack = createStackNavigator();

const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(UserContext);

  // Handle user state changes
  const onAuthStateChanged = useCallback(usr => {
    setUser(usr);
    setInitializing(false);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  console.log('app user');
  console.log(user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
