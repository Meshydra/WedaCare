import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { ActivityIndicator } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const LocationSelectionScreen = ({ navigation, route }) => {
  const { serviceType, selectedDate } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    (async () => {
      // Step 1: Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to select a location.");
        setLoading(false); // Stop loading if permission is denied
        return;
      }

      // Step 2: Fetch the device's current location
      try {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        Alert.alert("Error", "Failed to fetch your current location.");
        console.error("Location fetch error:", error);
      } finally {
        setLoading(false); // Stop loading after fetching location
      }
    })();
  }, []);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleConfirmLocation = async () => {
    if (!selectedLocation) {
      Alert.alert("No Location Selected", "Please tap on the map to select a location.");
      return;
    }

    try {
        const storedMobile = await AsyncStorage.getItem('userMobile'); 

        if (!storedMobile) {
            Alert.alert("Error", "Mobile number not found. Please login again.");
            return; // Or navigate back to login
        }

        const payload = {
            mobile: storedMobile, // Add mobile to the payload
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
        };

    console.log("Sending location data (JSON):", JSON.stringify(payload, null, 2)); // The crucial line

    const response = await axios.post("http://192.168.1.8:5001/api/save-location", payload);

      // Navigate to ConfirmScreen with the selected location
      navigation.navigate("Confirm", { serviceType, selectedDate, location: selectedLocation });
    } catch (error) {
      Alert.alert("Error", "Failed to save location. Please try again.");
      console.error("Location save error:", error);
    }
  };

  // Show a loading indicator while fetching location
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E2443B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Location</Text>
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
          <Marker coordinate={userLocation} pinColor="blue" title="Your Location" />
        </MapView>
      ) : (
        <Text style={styles.noLocation}>Unable to fetch your current location.</Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleConfirmLocation}>
        <Text style={styles.btnText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "70%",
  },
  btn: {
    backgroundColor: "#E2443B",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    width: "80%",
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
  noLocation: {
    fontSize: 16,
    color: "#BBB",
    marginTop: 20,
  },
});