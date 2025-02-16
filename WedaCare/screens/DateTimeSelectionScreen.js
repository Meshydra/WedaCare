import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimeSelectionScreen = ({ route, navigation }) => {
  const { serviceType } = route.params;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = () => {
    navigation.navigate("LocationSelection", { 
        serviceType, 
        selectedDate: date.toISOString()  
    });
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date & Time</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setShowPicker(true)}>
        <Text style={styles.btnText}>Pick Date & Time</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.selectedText}>Selected: {date.toLocaleString()}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
        <Text style={styles.btnText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateTimeSelectionScreen;

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
    fontSize: 18,
    color: "#FFF",
  },
  selectedText: {
    fontSize: 18,
    color: "#FFF",
    marginVertical: 10,
  },
});
