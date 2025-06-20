import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppRegistry, SafeAreaView} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

const Root = () => (
  <SafeAreaView style={{flex: 1}}>
    <App />
  </SafeAreaView>
);

AppRegistry.registerComponent(appName, () => Root);
