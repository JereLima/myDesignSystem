import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownList from './src/components/DropDownList';

export default function App() {
  return (
    <View style={styles.container}>
     <DropDownList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:35,
    backgroundColor: '#eee',
  },
});
