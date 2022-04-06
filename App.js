import React from 'react';
import {LogBox} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

console.log('google signin configure');
GoogleSignin.configure({
  webClientId:
    '46164297571-0tdho9849g3bcs5a0keeqsooa5dpc9j7.apps.googleusercontent.com',
});

// context
import UserState from './src/context/user/userState';

import Main from './src/Main';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <UserState>
      <Main />
    </UserState>
  );
}
