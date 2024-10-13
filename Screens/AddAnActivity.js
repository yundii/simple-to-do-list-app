import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityDietContext } from '../context/ActivityDietContext';
import { commonStyles } from '../helpers/styles';
import DateInput from '../Components/DateInput';
import { ThemeContext } from '../context/ThemeContext';

// This is the AddAnActivity screen that allows users to add an activity
const AddAnActivity = ({ navigation }) => {
  const { addActivity } = useContext(ActivityDietContext);
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);

  // Activity Type
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [typeItems, setTypeItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  // This function validates the inputs entered by the user
  const validateInputs = () => {
    if (!typeValue) {
      Alert.alert('Validation Error', 'Please select an activity type.');
      return false;
    }
    const isNumeric = /^\d+$/.test(duration);  // This checks if duration contains only digits
    const durationNumber = parseInt(duration, 10);
    // This checks if duration is a number and greater than 0
    if ( !isNumeric || isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration.');
      return false;
    }
    // This checks if activityDate is a valid date
    if (!activityDate || !(activityDate instanceof Date) || isNaN(activityDate)) {
        Alert.alert('Invalid Date', 'Please select a valid date.');
        return false;
      }
  
      return true; // All validations passed
};

  // This function is called when the user presses the Save button
  const handleSave = () => {
    if (validateInputs()) {
      const durationNumber = parseInt(duration, 10);
      const isSpecial = (typeValue === 'Running' || typeValue === 'Weights') && durationNumber > 60;

      const newActivity = {
        id: Date.now().toString(),
        type: typeValue,
        duration: durationNumber,
        date: activityDate.toISOString(),
        isSpecial,
      };

      addActivity(newActivity);
      Alert.alert('Success', 'Activity added successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  // This function is called when the user presses the Cancel button
  const handleCancel = () => {
    navigation.goBack();
  };

  // This component displays the input fields for the user to enter the activity details
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.containerBg }]}>
      {/* Activity Type Input */}
      <Text style={commonStyles.label}>Activity Type</Text>
      <DropDownPicker
        open={typeOpen}
        value={typeValue}
        items={typeItems}
        setOpen={setTypeOpen}
        setValue={setTypeValue}
        setItems={setTypeItems}
        placeholder="Select activity type"
        containerStyle={{ marginBottom: 16 }}
      />

    {/* Duration Input */}
      <Text style={commonStyles.label}>Duration (minutes)</Text>
      <TextInput
        style={commonStyles.input}
        //keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      {/* Date Input */}
      <Text style={commonStyles.label}>Date</Text>
      <DateInput
        value={activityDate}
        onChange={setActivityDate}
      />

      {/* Save and Cancel buttons */}
      <View style={commonStyles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="red" style = {commonStyles.button}/>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddAnActivity;
