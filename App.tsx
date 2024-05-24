/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Text,
  View
} from 'react-native';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const androidConfig = {
  appId: '1:409558079318:android:3463ac856c72c58d3da8f7', //diff from iOS
  apiKey: "AIzaSyCFGIpkrpY_rGA4NtgoZbjomuNPBPYQWPY", //diff from iOS
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
      console.log("start");
      await firestore()
        .collection('Devs')
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        });

      // console.log(resp);

      console.log("end");
    } catch (error) {
      console.log(error);

    }
  }

  const func1 = async () => {
    try {
      console.log("started");
      
      const resp = await firestore()
        .collection('Devs')
        .doc('ABCskdjsddsf')
        .set({
          name: "Sumedha",
          age: 20
        })
        .then(() => {
          console.log('User added!');
        });
        await func();
        console.log("finished");
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <View>

      <Text style={{ margin: "auto", fontSize: 20, marginBottom: 50, marginTop: 100, backgroundColor: "red" }} onPress={func}>
        shi
      </Text>
      <Text style={{ margin: "auto", fontSize: 20 }} onPress={func1}>
        vam
      </Text>
    </View>
  );
}


export default App;
