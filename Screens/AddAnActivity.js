import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityDietContext } from '../context/ActivityDietContext';
import { commonStyles } from '../Helpers/styles';
import DateInput from '../Components/DateInput';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons} from '@expo/vector-icons';

// This is the AddAnActivity screen that allows users to add an activity
const AddActivity = ({ navigation, route }) => {
  const { addActivity, updateActivity, deleteActivity } = useContext(ActivityDietContext);
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (route.params?.activity) {
      const { activity } = route.params;
      setTypeValue(activity.type);
      setDuration(activity.duration.toString());
      setActivityDate(activity.date ? new Date(activity.date) : null);
      setIsSpecial(activity.isSpecial);
      setIsEditing(true);

      console.log("activityDate: ", activity.date);
    }
  }, [route.params]);

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
      // Update isSpecial logic for both add and edit scenarios
      const updatedIsSpecial = (typeValue === 'Running' || typeValue === 'Weights') && durationNumber > 60;

      const updatedActivity = {
        id: isEditing ? route.params.activity.id : Date.now().toString(),
        type: typeValue,
        duration: durationNumber,
        date: activityDate.toISOString(),
        isSpecial: updatedIsSpecial,
      };

      // If isEditing is true, update the activity, show an alert important: are you sure you want to save these changes? yes or no 
      // if yes, show alert success, activity updated successfully, press ok to go back to the previous screen
      if (isEditing) {
        updateActivity(updatedActivity);
        Alert.alert('Important', 'Are you sure you want to save these changes?', [
          { text: 'Yes', onPress: () => {
            Alert.alert('Success', 'Activity updated successfully.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          }},
          { text: 'No', style: 'cancel' },
        ]);
      } else {
        addActivity(updatedActivity);
        Alert.alert('Success', 'Activity added successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    }
  };
 
  const handleDelete = () => {
    Alert.alert('Delete Activity', 'Are you sure you want to delete this activity?', [
      { text: 'Yes', onPress: () => {
        deleteActivity(route.params.activity.id);
        Alert.alert('Success', 'Activity deleted successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }},
      { text: 'No', style: 'cancel' },
    ]);
  }

  // This component displays the input fields for the user to enter the activity details
  const { theme } = useContext(ThemeContext);

  // if is editing, show header button delete with a trash icon
  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isEditing]);

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
        <Button title="Cancel" onPress={() => navigation.goBack()} color="red" style = {commonStyles.button}/>
        <Button title="Save" onPress={handleSave} />
      </View>

      

    </View>
  );
};

export default AddActivity;
