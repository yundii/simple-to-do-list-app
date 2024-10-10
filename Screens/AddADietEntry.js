import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import DateInput from '../Components/DateInput';
import { ActivityDietContext } from '../context/ActivityDietContext'; 
import { commonStyles } from '../helpers/styles';

const AddDietEntry = ({ navigation }) => {
  const { addDietEntry } = useContext(ActivityDietContext); 
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dietDate, setDietDate] = useState(null); 


  const validateInputs = () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description.');
      return false;
    }
    const caloriesNumber = parseInt(calories, 10);
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter valid calories.');
      return false;
    }
    if (!dietDate || !(dietDate instanceof Date) || isNaN(dietDate)) {
      Alert.alert('Validation Error', 'Please select a valid date.');
      return false;
    }
    return true; // All validations passed
  };

  
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

  
  const handleCancel = () => {
    navigation.goBack();
  };


  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.label}>Description</Text>
      <TextInput
        style={commonStyles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Text style={commonStyles.label}>Calories</Text>
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
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
     
      <View style={commonStyles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="red" />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddDietEntry;
