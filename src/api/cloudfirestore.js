import firestore from '@react-native-firebase/firestore';

export const addDocument = async (collection, document) => {
  try {
    const documentRef = await firestore().collection(collection).add(document);
    return documentRef;
  } catch (err) {
    throw new Error('Error adding document');
  }
};

export const deleteDocument = async (collection, documentID) => {
  try {
    await firestore().collection(collection).doc(documentID).delete();
  } catch (err) {
    throw new Error('Error deleting document');
  }
};

export const editDocument = async (collection, documentID, newDocument) => {
  try {
    await firestore()
      .collection(collection)
      .doc(documentID)
      .update(newDocument);
  } catch (err) {
    throw new Error('Error updating document');
  }
};
