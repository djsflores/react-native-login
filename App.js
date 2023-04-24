import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button } from './src/components/Button';

export default function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  const onAuth = () =>{
    signInWithRedirect(auth, provider);
  }

  const createAuthWithEmailAndPassword = () => {
    createUserWithEmailAndPassword(auth, 'djsflores@outlook.com', 'dave1234')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const loginAuthWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, 'djsflores@outlook.com', 'dave1234')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSignInData = () => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result?.user;
        console.log(token, user)
      }).catch((error) => {
        console.log(error);
      });
  }

  const createDataCollection = async () =>{
    const infoUser = {
      name: 'David',
      lastName: 'Flores',
      career: 'dev'
    }
    try{
      const data = await addDoc(collection(db, "data"), infoUser);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCollectionData = async () => {
    const users = await getDocs(collection(db, "data"));
    // console.log(users)
    // users.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
    // users.forEach((doc) => {
    //   console.log(doc.data());
    // });
    const usersMapped = users.docs.map(user => user.data());
    console.log(usersMapped)
  }

  const setCollectionData = async () => {
    const userSelected = doc(db, "data", "R93F0sy5myiSid8swPMI");
    // console.log(userSelected);
    try{
      await updateDoc(userSelected, {
        lastName: 'Flower'
      });
    } catch (error){
      console.log(error);
    }
  }

  const deleteCollectionData = async () => {
    try{
      await deleteDoc(doc(db, "data", "R93F0sy5myiSid8swPMI"));
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    getSignInData();
  }, [])
  

  console.log(auth);
  console.log(provider);
  

  return (
    <View style={styles.container}>
      <Button title="Sign-in with Google" onPress={onAuth} />
      <Button title="Create user" onPress={createAuthWithEmailAndPassword} />
      <Button title="Login user" onPress={loginAuthWithEmailAndPassword} />
      <Button title="Create Data Collection" onPress={createDataCollection} />
      <Button title="Get User Collection" onPress={getCollectionData} />
      <Button title="Set User Collection" onPress={setCollectionData} />
      <Button title="Delete User Collection" onPress={deleteCollectionData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'gray',
  },
});
