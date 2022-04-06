import firestore from '@react-native-firebase/firestore';

export const addDocument = async (collection, document) => {
  try {
    const documentRef = await firestore().collection(collection).add(document);
    return documentRef;
  } catch (err) {
    throw new Error('Error adding document');
  }
};
