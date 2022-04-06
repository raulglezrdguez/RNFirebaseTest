import React, {useContext, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {colors} from '../theme/colors';
import UserContext from '../context/user/userContext';

const Login = () => {
  const {user} = useContext(UserContext);
  const [variables, setVariables] = useState({
    email: '',
    password: '',
  });

  const doRegister = () => {
    console.log('do register');
    auth()
      .createUserWithEmailAndPassword(variables.email, variables.password)
      .then(() => console.log('user registered'))
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const doAnonymousLogin = () => {
    console.log('do login');
    auth()
      .signInAnonymously()
      .then(() => console.log('user signed in'))
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const doLogin = () => {
    console.log('do login');
    auth()
      .signInWithEmailAndPassword(variables.email, variables.password)
      .then(() => console.log('user signed in'))
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const doSignOut = () => {
    console.log('do sign out');
    auth()
      .signOut()
      .then(() => console.log('user signed out'))
      .catch(error => {
        console.error(error);
      });
  };

  const doGoogleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log('idToken');
    console.log(idToken);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Text>Login {user ? user.email : null}</Text>
          <TextInput
            style={styles.textinput}
            placeholder={'email'}
            value={variables.email}
            onChangeText={text => setVariables({...variables, email: text})}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'password'}
            value={variables.password}
            onChangeText={text => setVariables({...variables, password: text})}
            secureTextEntry={true}
          />
          <Pressable
            style={styles.button}
            onPress={doRegister}
            disabled={
              variables.email.trim().length < 4 ||
              variables.password.trim().length < 4
            }>
            <Text style={styles.textbutton}>Register</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={doAnonymousLogin}
            disabled={
              variables.email.trim().length < 4 ||
              variables.password.trim().length < 4
            }>
            <Text style={styles.textbutton}>Anonymous Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={doLogin}
            disabled={
              variables.email.trim().length < 4 ||
              variables.password.trim().length < 4
            }>
            <Text style={styles.textbutton}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() =>
              doGoogleSignIn()
                .then(() => console.log('Signed in with Google!'))
                .catch(err => console.log(err))
            }>
            <Text style={styles.textbutton}>Google Login</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={doSignOut}>
            <Text style={styles.textbutton}>Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: colors.blue,
    borderRadius: 0,
    borderWidth: 2,
    margin: 5,
    padding: 5,
    width: '60%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollview: {
    alignContent: 'center',
    width: '90%',
  },
  textbutton: {
    color: colors.blue,
  },
  textinput: {
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    width: '90%',
  },
});
