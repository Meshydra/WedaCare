import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Confirm Your Booking</Text>
      <Button title="Confirm" onPress={() => navigation.navigate('Home')} />
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

export default ConfirmScreen;