import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TeamItem from '../../components/TeamItem';
import UserContext from '../../context/user/userContext';
import {colors} from '../../theme/colors';
import {filterDocuments} from '../../api/cloudfirestore';

const FilterDocuments = () => {
  const {user} = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [maxMembers, setMaxMembers] = useState('100');

  const onResult = querySnapshot => {
    // console.log(querySnapshot.size);
    const newTeams = [];
    querySnapshot.forEach(documentSnapshot => {
      newTeams.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      });
    });
    setTeams(newTeams);
  };

  const onError = err => {
    console.log(err);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Teams')
      .onSnapshot(onResult, onError);

    return () => subscriber();
  }, []);

  const filterDocs = async () => {
    const mm = parseInt(maxMembers, 10);

    const querySnapshot = await filterDocuments('Teams', 'members', '>', mm);
    onResult(querySnapshot);
  };
  console.log(teams);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.header}>Edit Documents {user.email}</Text>
        <View style={styles.container}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text>More than</Text>
              <TextInput
                style={styles.textinput}
                placeholder={'100'}
                value={maxMembers}
                onChangeText={text => setMaxMembers(text)}
                keyboardType={'numeric'}
              />
              <Text>members</Text>
            </View>
            <Pressable style={styles.button} onPress={filterDocs}>
              <Text style={styles.textbutton}>Filter</Text>
            </Pressable>
          </View>
          <View style={styles.flatlistContainer}>
            <FlatList
              data={teams}
              renderItem={({item, index, separator}) => (
                <TeamItem key={item.id} team={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterDocuments;

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
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 80,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    marginBottom: 20,
  },
  header: {alignSelf: 'center', fontWeight: 'bold', marginVertical: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
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
  },
});
