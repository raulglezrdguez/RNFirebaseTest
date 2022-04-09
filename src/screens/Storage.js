import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import getPath from '@flyerhq/react-native-android-uri-path';

import {colors} from '../theme/colors';

const Storage = () => {
  const [images, setImages] = useState([{title: 'probando una cadena larga'}]);
  const [imageUri, setImageUri] = useState('');

  const uploadDocument = async () => {
    try {
      console.log('upload document');
      const file = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images,
          //   DocumentPicker.types.pdf,
          //   DocumentPicker.types.zip,
        ],
      });

      const reference = storage().ref(`images/${file.name}`);
      const path = getPath(file.uri);
      await reference.putFile(path);
      console.log(file);
    } catch (err) {
      console.log(err);
    }
  };

  const listFilesAndDirectories = (reference, pageToken) => {
    return reference.list({pageToken}).then(result => {
      const newImagesList = [];
      // Loop over each item
      result.items.forEach(ref => {
        newImagesList.push({title: ref.fullPath});
        console.log(ref);
      });
      setImages(newImagesList);

      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }

      return Promise.resolve();
    });
  };

  const listContent = () => {
    const reference = storage().ref('images');

    listFilesAndDirectories(reference).then(() => {
      console.log('Finished listing');
    });
  };

  const deleteItem = async item => {
    console.log(item);
    await storage().ref(item).delete();
    console.log(`deleted: ${item}`);
    setImageUri('');
  };

  const downloadItem = async item => {
    console.log(item);
    const url = await storage().ref(item).getDownloadURL();
    setImageUri(url);
    console.log(url);
  };

  console.log(images);

  return (
    <View style={styles.content}>
      <ScrollView>
        <View style={styles.content}>
          <Pressable style={styles.pressable} onPress={uploadDocument}>
            <Text>Upload document</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={listContent}>
            <Text>List storage content</Text>
          </Pressable>
          {imageUri !== '' && (
            <Image style={styles.imageContent} source={{uri: `${imageUri}`}} />
          )}
        </View>
      </ScrollView>
      {images.length > 0 && (
        <View style={styles.flatlistContainer}>
          <FlatList
            style={styles.flatlist}
            data={images}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => deleteItem(item.title)}>
                  <Text>Delete</Text>
                </Pressable>
                <Text style={styles.imageTitle}>{item.title}</Text>
                <Pressable
                  style={styles.pressable}
                  onPress={() => downloadItem(item.title)}>
                  <Text>Download</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </View>
  );
};

export default Storage;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  flatlistContainer: {height: '50%'},
  imageContent: {width: 100, height: 100},
  imageTitle: {
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
    margin: 5,
    padding: 5,
  },
  pressable: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
});
