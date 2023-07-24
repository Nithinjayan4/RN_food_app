import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';
import 'react-native-url-polyfill/auto';

import { Provider } from 'react-redux'
import { store } from './Store';

export default function App() {
  return (
    <Provider store={store}>
    
    <Navigation/>

    </Provider>
    
  );
}

