import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Select Your Service Type</Text>
      <Button title="Medical Report" onPress={() => navigation.navigate('Confirm')} />
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

export default BookingScreen;