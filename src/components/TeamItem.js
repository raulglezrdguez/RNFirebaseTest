import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {deleteDocument, editDocument} from '../api/cloudfirestore';
import {colors} from '../theme/colors';

const TeamItem = ({team}) => {
  const [editing, setEditing] = useState(false);
  const [kind, setKind] = useState(team.kind);

  const cancelDeleteTeam = useCallback(async () => {
    if (editing) {
      setEditing(false);
    } else {
      try {
        await deleteDocument('Teams', team.id);
      } catch (err) {
        console.log(err);
      }
    }
  }, [editing, team]);

  const updateEditTeam = async () => {
    if (editing) {
      try {
        await editDocument('Teams', team.id, {kind});
        console.log('document updated');
      } catch (err) {
        console.log(err);
      }
    } else {
      setEditing(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{team.name}</Text>
      {editing ? (
        <TextInput
          style={styles.textinput}
          placeholder={'kind'}
          value={kind}
          onChangeText={text => setKind(text)}
        />
      ) : (
        <Text>{team.kind}</Text>
      )}
      <Text>
        {team.technology} - {team.members} members
      </Text>
      <View style={styles.row}>
        <Pressable style={styles.pressable} onPress={updateEditTeam}>
          {editing ? <Text>Update</Text> : <Text>Edit</Text>}
        </Pressable>
        <Pressable style={styles.pressable} onPress={cancelDeleteTeam}>
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
  textinput: {
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    width: '90%',
  },
});
