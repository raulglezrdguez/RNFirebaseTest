import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {deleteDocument} from '../api/cloudfirestore';
import {colors} from '../theme/colors';

const TeamItem = ({team}) => {
  const [editing, setEditing] = useState(false);

  const deleteTeam = useCallback(async () => {
    try {
      await deleteDocument('Teams', team.id);
    } catch (err) {
      console.log(err);
    }
  }, [team]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{team.name}</Text>
      {editing ? <Text>Editing</Text> : <Text>{team.kind}</Text>}
      <Text>
        {team.technology} - {team.members} members
      </Text>
      <View style={styles.row}>
        <Pressable style={styles.pressable}>
          {editing ? <Text>Update</Text> : <Text>Edit</Text>}
        </Pressable>
        <Pressable style={styles.pressable} onPress={deleteTeam}>
          {editing ? <Text>Cancel</Text> : <Text>Delete</Text>}
        </Pressable>
      </View>
    </View>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,

    margin: 5,
    padding: 5,
  },
  header: {fontWeight: 'bold'},
  pressable: {
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
