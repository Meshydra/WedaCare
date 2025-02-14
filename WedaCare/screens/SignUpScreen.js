import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signup } from '../api';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [language, setLanguage] = useState('English');  

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("❌ Passwords do not match", "Please make sure both passwords are identical.");
            return;
        }

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
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile"
                keyboardType="phone-pad"
                onChangeText={setMobile}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={setConfirmPassword}
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '80%', padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }
});

export default SignUpScreen;
