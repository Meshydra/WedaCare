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
import { login } from "../api";

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      console.log("🚀 Login button clicked");
      const response = await login(mobile, password);
      console.log("✅ Login success:", response);
      navigation.navigate("Home");
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.response ? err.response.data.error : "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../images/image.jpg")} style={styles.image} /> */}
      <Text style={styles.title}>Welcome to WedaCare</Text>
      <Text style={styles.subtitle}>
        We offer the best health care services at your dootstep 
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="phone-pad"
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.newUserText}>New User</Text>
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
