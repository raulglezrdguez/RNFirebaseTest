import React, {useContext, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {colors} from '../../theme/colors';
import UserContext from '../../context/user/userContext';
import {addDocument} from '../../api/cloudfirestore';

const AddDocuments = () => {
  const {user} = useContext(UserContext);
  const [variables, setVariables] = useState({
    name: 'TeamX',
    technology: 'reactjs',
    kind: 'frontend',
    members: '1',
  });

  const doAddDocument = async () => {
    try {
      await addDocument('Teams', {
        ...variables,
        members: parseInt(variables.members, 10),
      });
      console.log('document added');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Adding docs {user ? user.email : null}
          </Text>
          <TextInput
            style={styles.textinput}
            placeholder={'name'}
            value={variables.name}
            onChangeText={text => setVariables({...variables, name: text})}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'technology'}
            value={variables.technology}
            onChangeText={text =>
              setVariables({...variables, technology: text})
            }
          />
          <TextInput
            style={styles.textinput}
            placeholder={'kind'}
            value={variables.kind}
            onChangeText={text => setVariables({...variables, kind: text})}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'members'}
            value={variables.members}
            onChangeText={text => setVariables({...variables, members: text})}
            keyboardType={'numeric'}
          />
          <Pressable
            style={styles.button}
            onPress={doAddDocument}
            disabled={
              variables.name.trim().length < 4 ||
              variables.kind.trim().length < 3 ||
              variables.technology.trim().length < 4
            }>
            <Text style={styles.textbutton}>Add document</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDocuments;

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
  header: {fontWeight: 'bold', marginVertical: 20},
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
