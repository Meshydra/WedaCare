import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Select Your Language</Text>
      <Button title="English" onPress={() => navigation.navigate('Login')} />
      <Button title="සිංහල" onPress={() => navigation.navigate('Login')} />
      <Button title="தமிழ்" onPress={() => navigation.navigate('Login')} />
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

export default LanguageScreen;
