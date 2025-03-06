import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { login } from "../api";

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login process
  const handleLogin = async () => {
    try {
      console.log("🚀 Login button clicked");

      const response = await login(mobile, password);

      if (response.message === "Login successful") {
        await AsyncStorage.setItem('userMobile', mobile); // Store mobile number for future use
        
        // ⚠️ Issue: You are navigating to both "Confirm" and "Home"
        // navigation.navigate('Confirm', { /* other params */ }); 

        console.log("✅ Login success:", response);
        navigation.navigate("Home"); // Ensure only one navigation call is used
      }
    } catch (err) {
      console.error("❌ Login failed:", err);

      // Safer error handling to avoid undefined properties
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* ⚠️ Image is commented out. If required, make sure the path is correct */}
      {/* <Image source={require("../images/image.jpg")} style={styles.image} /> */}

      <Text style={styles.title}>Welcome to WedaCare</Text>
      <Text style={styles.subtitle}>
        We offer the best health care services at your <Text style={{ fontWeight: 'bold' }}>doorstep</Text> {/* Fixed spelling mistake */}
      </Text>

      {/* Mobile Number Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="phone-pad"
          onChangeText={setMobile}
          value={mobile} // Controlled input
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none" // Prevents unwanted capitalization
          autoCorrect={false} // Avoids autocorrect issues
          onChangeText={setPassword}
          value={password} // Controlled input
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Display error message if login fails */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Navigate to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.newUserText}>Don't have an account? Sign Up</Text> {/* Improved clarity */}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "43%",
  },
  title: {
    fontSize: 30,
    fontFamily: "SemiBold",
    alignSelf: "center",
  },
  subtitle: {
    fontFamily: "SemiBold",
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
    width: "80%",
  },
  input: {
    paddingHorizontal: 10,
    flex: 1,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontFamily: "SemiBold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  newUserText: {
    alignSelf: "center",
    color: "#00716F",
    fontFamily: "SemiBold",
    paddingVertical: 30,
  },
});
