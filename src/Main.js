import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import UserContext from './context/user/userContext';

import Login from './screens/Login';
import Storage from './screens/Storage';
import Firestore from './Firestore';

import LoginIcon from './components/LoginIcon';
import FirestoreIcon from './components/FirestoreIcon';
import StorageIcon from './components/StorageIcon';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

  const createScreenOptions = ({route}) => ({
    headerShown: false,
    tabBarLabelShowLabel: false,
    tabBarIcon: ({color, size}) => {
      if (route.name === 'Login') {
        return <LoginIcon width={size} height={size} stroke={color} />;
      }
      if (route.name === 'Storage') {
        return <StorageIcon width={size} height={size} stroke={color} />;
      }
      if (route.name === 'Firestore') {
        return <FirestoreIcon width={size} height={size} stroke={color} />;
      }
      return null;
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Storage" component={Storage} />
        <Tab.Screen name="Firestore" component={Firestore} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
