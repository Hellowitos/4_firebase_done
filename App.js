import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUpForm from './components/SignUpForm';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyAts5zYxJljKY67teZC8XpxV-JNXNy_pzs",
  authDomain: "oevelse5updated.firebaseapp.com",
  projectId: "oevelse5updated",
  storageBucket: "oevelse5updated.appspot.com",
  messagingSenderId: "215574406693",
  appId: "1:215574406693:web:967941b372d7eee9f041cc",
  measurementId: "G-1QX8B2E9H7"
};

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({loggedIn: true, user: user});
    } else {
      callback({loggedIn: false});
    }
  });
}

const GuestPage =
    <View style={styles.container}>
  <Text style={styles.paragraph}>
    Opret eller Login med din firebase Email
  </Text>
  <Card>
    <SignUpForm />
  </Card>
  <Card>
    <LoginForm />
  </Card>
</View>;


function App() {

  const [user, setUser] = useState({ loggedIn: false });
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return user.loggedIn ? <ProfileScreen /> : GuestPage ;

}



export default App