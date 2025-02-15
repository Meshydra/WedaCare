import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signup } from '../api';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [language, setLanguage] = useState('English');

    const handleSignup = async () => {
        if (!name || !mobile || !password || !confirmPassword) {
            Alert.alert("❌ Missing Fields", "All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("❌ Passwords do not match", "Please make sure both passwords are identical.");
            return;
        }

        const userData = { 
            name, 
            mobile, 
            password, 
            language 
        };

        console.log("📤 Sending signup request:", userData);

        try {
            const response = await signup(name, mobile, password, language); 
            console.log("✅ Signup successful:", response);
            Alert.alert("✅ Success", "User registered successfully!");
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("❌ Signup failed", error?.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Save the world</Text>
            <Text style={styles.subtitle}>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </Text>

            <View style={styles.inputContainer}>
                <AntDesign name="user" color="#00716F" size={24} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#00716F"
                    style={styles.input}
                    onChangeText={(text) => setName(text)} // FIXED
                    value={name}
                />
            </View>

            <View style={styles.inputContainer}>
                <AntDesign name="phone" color="#00716F" size={24} />
                <TextInput
                    placeholder="Mobile"
                    placeholderTextColor="#00716F"
                    keyboardType="phone-pad"
                    style={styles.input}
                    onChangeText={(text) => setMobile(text)} // FIXED
                    value={mobile}
                />
            </View>

            <View style={styles.inputContainer}>
                <AntDesign name="lock" color="#00716F" size={24} />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#00716F"
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)} // FIXED
                    value={password}
                />
            </View>

            <View style={styles.inputContainer}>
                <AntDesign name="lock" color="#00716F" size={24} />
                <TextInput
                    secureTextEntry
                    placeholder="Confirm Password"
                    placeholderTextColor="#00716F"
                    style={styles.input}
                    onChangeText={(text) => setConfirmPassword(text)} // FIXED
                    value={confirmPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: "100%",
        alignItems: "center",
        paddingTop: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: "SemiBold",
        alignSelf: "center",
        marginTop: 10,
    },
    subtitle: {
        fontFamily: "SemiBold",
        marginHorizontal: 55,
        textAlign: 'center',
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
});

export default SignUpScreen;
