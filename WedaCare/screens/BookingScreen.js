import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const BookingScreen = ({ navigation }) => {
  const handleSelectService = (serviceType) => {
    navigation.navigate("DateTimeSelection", { serviceType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Service Type</Text>
      <TouchableOpacity style={styles.btn} onPress={() => handleSelectService("Medical Reports")}>
        <Text style={styles.btnText}>Medical Reports</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleSelectService("Blood Samples")}>
        <Text style={styles.btnText}>Blood Samples</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleSelectService("Physiotherapy")}>
        <Text style={styles.btnText}>Physiotherapy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#E2443B",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    color: "#FFF",
  },
});
