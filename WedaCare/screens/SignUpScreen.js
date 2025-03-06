import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Alert, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { signup } from '../api';

const SignUpScreen = ({ navigation }) => {
    // State variables for user input fields
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [language, setLanguage] = useState('English');
    const [loading, setLoading] = useState(false);  // Loading state for API request

    // Function to validate mobile number format
    const isValidMobile = (mobile) => {
        const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit mobile number
        return phoneRegex.test(mobile);
    };

    // Function to validate password strength
    const isValidPassword = (password) => {
        return password.length >= 6; // Ensuring minimum password length
    };

    const handleSignup = async () => {
        // Validate user inputs
        if (!name || !mobile || !password || !confirmPassword) {
            Alert.alert("❌ Missing Fields", "All fields are required.");
            return;
        }

        if (!isValidMobile(mobile)) {
            Alert.alert("❌ Invalid Mobile Number", "Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!isValidPassword(password)) {
            Alert.alert("❌ Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("❌ Passwords do not match", "Please make sure both passwords are identical.");
            return;
        }

        const userData = { name, mobile, password, language };

        console.log("📤 Sending signup request:", userData);
        setLoading(true); // Show loading indicator

        try {
            const response = await signup(name, mobile, password, language); 
            console.log("✅ Signup successful:", response);
            Alert.alert("✅ Success", "User registered successfully!");
            navigation.navigate('Home'); // Navigate to Home screen after successful signup
        } catch (error) {
            console.error("❌ Signup failed:", error);
            Alert.alert("❌ Signup failed", error?.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false); // Hide loading indicator after request completes
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Save the world</Text>
                    <Text style={styles.subtitle}>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                    </Text>

                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <AntDesign name="user" color="#00716F" size={24} />
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor="#00716F"
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                        />
                    </View>

                    {/* Mobile Input */}
                    <View style={styles.inputContainer}>
                        <AntDesign name="phone" color="#00716F" size={24} />
                        <TextInput
                            placeholder="Mobile"
                            placeholderTextColor="#00716F"
                            keyboardType="phone-pad"
                            style={styles.input}
                            onChangeText={setMobile}
                            value={mobile}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <AntDesign name="lock" color="#00716F" size={24} />
                        <TextInput
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor="#00716F"
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <AntDesign name="lock" color="#00716F" size={24} />
                        <TextInput
                            secureTextEntry
                            placeholder="Confirm Password"
                            placeholderTextColor="#00716F"
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                    </View>

                    {/* Signup Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Register</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
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
