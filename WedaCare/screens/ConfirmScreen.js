import React from 'react';
import { View, Text, Button } from 'react-native';

const ConfirmScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Confirmation Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default ConfirmScreen; 
