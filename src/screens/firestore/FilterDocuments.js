import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TeamItem from '../../components/TeamItem';
import UserContext from '../../context/user/userContext';

const FilterDocuments = () => {
  const {user} = useContext(UserContext);
  const [teams, setTeams] = useState([]);

  const onResult = querySnapshot => {
    console.log(querySnapshot.size);
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

  console.log(teams);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Documents {user.email}</Text>
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
  );
};

export default FilterDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    marginBottom: 60,
  },
  header: {fontWeight: 'bold', marginTop: 60, marginBottom: 20},
});
