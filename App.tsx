/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import Navigator from './src/navigate';

const androidConfig = {
  appId: '1:409558079318:android:3463ac856c72c58d3da8f7',
  apiKey: "AIzaSyCFGIpkrpY_rGA4NtgoZbjomuNPBPYQWPY",
  projectId: "tenant-management-ec993",
  storageBucket: "tenant-management-ec993.appspot.com",
}

if (!firebase.apps.length) {

  firebase.initializeApp(androidConfig)
}

const App = () => {

  // useEffect(() => {
  //   SplashScreen?.hide();
  // }, [])

  const func = async () => {
    try {
      await firestore()
        .collection('Devs')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        });
    } catch (error) {
      console.log(error);

    }
  }

  const func1 = async () => {
    try {
      const resp = await firestore()
        .collection('Devs')
        .doc('ABCskd')
        .set({
          name: "Sumedha",
          age: 20
        })
        .then(() => {
          console.log('User added!');
        });
        await func();
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Navigator />
  );
}


export default App;
