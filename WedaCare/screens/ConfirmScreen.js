import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";  

const API_URL = 'http://192.168.1.8:5001/api/auth'; 

const ConfirmScreen = ({ route, navigation }) => {
  const { serviceType, selectedDate } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.1.8:5001/api/user-details'); 
        console.log("✅ User data fetched:", response.data); 
        setUserData(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E2443B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Confirmation</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData?.name || "N/A"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{userData?.mobile || "N/A"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Service Type:</Text>
        <Text style={styles.value}>{serviceType}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.value}>{new Date(selectedDate).toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;

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
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    color: "#AAA",
  },
  value: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    color: "#FFF",
  },
  btn: {
    backgroundColor: "#E2443B",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#FFF",
  },
});

