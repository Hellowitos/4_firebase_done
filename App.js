import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUpForm from './components/SignUpForm';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";
import { Card } from 'react-native-paper';

// Herunder foregår konfiguration til firebase. .
const firebaseConfig = {
  apiKey: "AIzaSyAts5zYxJljKY67teZC8XpxV-JNXNy_pzs",
  authDomain: "oevelse5updated.firebaseapp.com",
  projectId: "oevelse5updated",
  storageBucket: "oevelse5updated.appspot.com",
  messagingSenderId: "215574406693",
  appId: "1:215574406693:web:967941b372d7eee9f041cc",
  measurementId: "G-1QX8B2E9H7"
};

//onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
//Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({loggedIn: true, user: user});
    } else {
      callback({loggedIn: false});
    }
  });
}




function App() {
//Her oprettes bruger state variblen
  const [user, setUser] = useState({ loggedIn: false });


//Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
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

  //Koden sikrer at kun én Firebase initieres under brug af appen.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //useEffect sørger for at vi kan eksekverer sideeffekter i funktionelle konmponenter
  //Sideeffekter kan være initial fetching af data fra et endpoint ved instantiering af en komponent.

  // læs mere om useEffect her: https://reactjs.org/docs/hooks-effect.html

  //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Slutteligt envendes en tenary operator, som ud fra brugerens status viser enten ProfileScreen eller GuestPage
  return user.loggedIn ? <ProfileScreen /> : GuestPage ;

}

//Lokal styling til brug i App.js
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


// eksport af App.js
export default App