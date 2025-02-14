import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to WedaCare</Text>
      <Button title="Start" onPress={() => navigation.navigate('Language')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartScreen;

