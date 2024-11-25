import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChangePasswordScreen from './components/ChangePasswordScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ChangePasswordScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;


