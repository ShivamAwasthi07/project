/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import firebase from '@react-native-firebase/app';
import Navigator from './src/navigate';

const androidConfig = {
  appId: '1:409558079318:android:3463ac856c72c58d3da8f7',
  apiKey: 'AIzaSyCFGIpkrpY_rGA4NtgoZbjomuNPBPYQWPY',
  projectId: 'tenant-management-ec993',
  storageBucket: 'tenant-management-ec993.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(androidConfig);
}

const App = () => {
  return <Navigator />;
};

export default App;
