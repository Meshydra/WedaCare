import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const API_URL = 'http://192.168.1.8:5001/api';

const ConfirmScreen = ({ route, navigation }) => {
  const { serviceType, selectedDate, location } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedMobile = await AsyncStorage.getItem('userMobile');

        if (!storedMobile) {
          Alert.alert("Error", "User not logged in.");
          navigation.navigate('Login');
          return;
        }

        const response = await axios.get(`${API_URL}/user-details/${storedMobile}`);
        console.log("✅ User data fetched:", response.data);
        setUserData(response.data);
      } catch (err) {
        console.error("❌ Error fetching user data:", err?.response?.data || err.message);
        setError("Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E2443B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{String(error)}</Text>
        </View>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.fullContainer}>
        <View style={styles.container}>
          <Text style={styles.errorText}>User data not available.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Appointment Confirmation</Text>

          {/* User Details */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{userData.mobile}</Text>
          </View>

          {/* Service & Date */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Service Type:</Text>
            <Text style={styles.value}>{serviceType}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.value}>{new Date(selectedDate).toLocaleString()}</Text>
          </View>

          {/* Map Displaying Location */}
          {location && location.latitude && location.longitude ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker coordinate={location} title="Selected Location" />
            </MapView>
          ) : (
            <Text style={styles.noLocation}>No location selected</Text>
          )}

          {/* Finish Button */}
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.btnText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  label: {
    fontWeight: "bold",
    color: "#E2443B",
    fontSize: 16,
  },
  value: {
    color: "#FFF",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  noLocation: {
    fontSize: 16,
    color: "#BBB",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#E2443B",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
