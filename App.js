import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useEffect } from 'react';

export default function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  
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

  useEffect(() => {
    getSignInData();
  }, [])
  

  console.log(auth);
  console.log(provider);
  

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onAuth}>
        <View style={styles.button}>
          <Text>Sign-in with Google</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={createAuthWithEmailAndPassword}>
        <View style={styles.button}>
          <Text>Create user</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={loginAuthWithEmailAndPassword}>
        <View style={styles.button}>
          <Text>Login user</Text>
        </View>
      </TouchableHighlight>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
