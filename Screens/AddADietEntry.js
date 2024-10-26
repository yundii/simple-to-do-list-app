import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import DateInput from '../Components/DateInput';
import { commonStyles, colors } from '../Helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { addToDB, deleteDocFromDB } from '../Firebase/firestoreHelper';
import PressableButton from '../Components/PressableButton';

// This is the AddDietEntry screen that allows users to add a diet entry
const AddDietEntry = ({ navigation, route }) => { 
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dietDate, setDietDate] = useState(null); 
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [removeSpecial, setRemoveSpecial] = useState(false);

  // This useEffect hook is called when the screen is loaded
  useEffect(() => {
    if (route.params?.dietEntry) {
      const { dietEntry } = route.params;
      setDescription(dietEntry.description);
      setCalories(dietEntry.calories.toString());
      setDietDate(dietEntry.date ? new Date(dietEntry.date) : null);
      setIsSpecial(dietEntry.isSpecial);
      setIsEditing(true);

      if (dietEntry.isSpecial) {
        setRemoveSpecial(false); // Checkbox unmarked initially for special diet entries
      }
    }
  }, [route.params]);

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
      const updatedIsSpecial = removeSpecial ? false : caloriesNumber > 800; 

      const updatedDietEntry = {
        description: description.trim(),
        calories: caloriesNumber,
        date: dietDate.toString(),
        isSpecial: updatedIsSpecial,
      };

      if (isEditing) {
        // If editing, update the existing diet entry in Firestore
        addToDB('dietEntries', updatedDietEntry, route.params.dietEntry.id);
        Alert.alert('Important', 'Are you sure you want to save these changes?', [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => {
            Alert.alert('Success', 'Diet entry updated successfully.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          }},
        ]);
      } else {
        // If adding a new entry, add it to Firestore
        addToDB('dietEntries', updatedDietEntry);
        Alert.alert('Success', 'Diet entry added successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    }
  };

  // This function is called when the user presses the Delete button
  const handleDelete = () => {
    Alert.alert('Delete Diet Entry', 'Are you sure you want to delete this diet entry?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: async () => {
        try {
          await deleteDocFromDB('dietEntries', route.params.dietEntry.id);
          Alert.alert('Success', 'Diet entry deleted successfully.', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        } catch (error) {
          Alert.alert('Error', 'Failed to delete diet entry. Please try again.');
        }
      }},
    ]);
  };


  // This component displays the input fields for the user to enter the diet entry details
  const { theme } = useContext(ThemeContext);

  // if is editing, show header button delete with a trash icon
  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerRight: () => (
          <PressableButton 
            onPress={handleDelete}
            pressedStyle={commonStyles.pressedStyle}
          >
            <Ionicons name="trash" size={24} color={colors.White} />
          </PressableButton>
        ),
      });
    }
  }, [navigation, isEditing]);

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
     
     {/* Checkbox for special marking removal */}
     {isEditing && isSpecial && (
        <View style={commonStyles.checkboxContainer}>
          <Text style={commonStyles.checkbox}>This item is marked as special. Select the checkbox to remove special marking.</Text>
          <Checkbox
            value={removeSpecial}
            onValueChange={setRemoveSpecial}
          />
        </View>
      )}

      {/* Save and Cancel buttons */}
      <View style={commonStyles.buttonContainer}>
      <PressableButton 
          onPress={() => navigation.goBack()} 
          buttonStyle={[commonStyles.button, { backgroundColor: colors.Red }]}
          pressedStyle={commonStyles.pressedStyle}
        >
          <Text>Cancel</Text>
        </PressableButton>

        <PressableButton 
          onPress={handleSave} 
          buttonStyle={commonStyles.button} 
          pressedStyle={commonStyles.pressedStyle}
        >
          <Text>Save</Text>
        </PressableButton>
      </View>
    </View>
  );
};

export default AddDietEntry;
