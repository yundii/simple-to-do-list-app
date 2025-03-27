import { setDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup";

// Function to add a document or update an existing document in Firestore
export const addToDB = async (collectionName, entryData, docId = null) => {
    try {
        const generatedDocId = docId || Date.now().toString();
      // Add a new document to the specified collection
      const docRef = doc(database, collectionName, generatedDocId);
        await setDoc(docRef, entryData);
        console.log('Document written with ID:', generatedDocId);
      
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

// Function to delete a document from Firestore
export const deleteDocFromDB = async (collectionName, docId) => {
    try {
      // Get a reference to the document to delete
      const docRef = doc(database, collectionName, docId);
      
      // Delete the document
      await deleteDoc(docRef);
      console.log('Document deleted with ID:', docId);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };