import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import DateInput from '../Components/DateInput';
import { ActivityDietContext } from '../context/ActivityDietContext'; 
import { commonStyles } from '../helpers/styles';
import { ThemeContext } from '../context/ThemeContext';

// This is the AddDietEntry screen that allows users to add a diet entry
const AddDietEntry = ({ navigation }) => {
  const { addDietEntry } = useContext(ActivityDietContext); 
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dietDate, setDietDate] = useState(null); 

  // This function validates the inputs entered by the user
  const validateInputs = () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description.');
      return false;
    }
    const isNumeric = /^\d+$/.test(calories);  // This checks if calories contains only digits
    const caloriesNumber = parseInt(calories, 10);
    // This checks if calories is a number and greater than 0
    if (!isNumeric || isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter valid calories.');
      return false;
    }
    // This checks if dietDate is a valid date
    if (!dietDate || !(dietDate instanceof Date) || isNaN(dietDate)) {
      Alert.alert('Validation Error', 'Please select a valid date.');
      return false;
    }
    return true; // All validations passed
  };

  // This function is called when the user presses the Save button
  const handleSave = () => {
    if (validateInputs()) {
      const caloriesNumber = parseInt(calories, 10);
      const isSpecial = caloriesNumber > 800; 

      const newDietEntry = {
        id: Date.now().toString(),
        description: description.trim(),
        calories: caloriesNumber,
        date: dietDate.toISOString(),
        isSpecial,
      };

      addDietEntry(newDietEntry); 
      Alert.alert('Success', 'Diet entry added successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  // This function is called when the user presses the Cancel button
  const handleCancel = () => {
    navigation.goBack();
  };

  // This component displays the input fields for the user to enter the diet entry details
  const { theme } = useContext(ThemeContext);

  
  return (
    <View style={[commonStyles.container, { backgroundColor: theme.containerBg }]}>
      {/* Description Input */}
      <Text style={commonStyles.label}>Description</Text>
      <TextInput
        style={commonStyles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      {/* Calories Input */}
      <Text style={commonStyles.label}>Calories</Text>
      <TextInput
        style={commonStyles.input}
        //keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
      />

      {/* Date Input */}
      <Text style={commonStyles.label}>Date</Text>
      <DateInput
        value={dietDate}
        onChange={setDietDate}
      />
     
      {/* Save and Cancel buttons */}
      <View style={commonStyles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="red" />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddDietEntry;
