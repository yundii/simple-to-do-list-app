import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles, colors } from '../Helpers/styles';
import Checkbox from 'expo-checkbox';
import DateInput from '../Components/DateInput';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons} from '@expo/vector-icons';
import { addToDB, deleteDocFromDB } from '../Firebase/firestoreHelper';
import PressableButton from '../Components/PressableButton';

// This is the AddAnActivity screen that allows users to add an activity
const AddActivity = ({ navigation, route }) => {
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [removeSpecial, setRemoveSpecial] = useState(false); 

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

  // This useEffect hook is called when the screen is loaded
  useEffect(() => {
    if (route.params?.activity) {
      const { activity } = route.params;
      setTypeValue(activity.type);
      setDuration(activity.duration.toString());
      setActivityDate(activity.date ? new Date(activity.date) : null);
      setIsSpecial(activity.isSpecial);
      setIsEditing(true);

      //console.log("activityDate: ", activity.date);
      if (activity.isSpecial) {
        setRemoveSpecial(false); // Ensure checkbox is unmarked initially
      }
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
      const updatedIsSpecial = removeSpecial ? false :(typeValue === 'Running' || typeValue === 'Weights') && durationNumber > 60;

      const updatedActivity = {
        //id: isEditing ? route.params.activity.id : Date.now().toString(),
        type: typeValue,
        duration: durationNumber,
        date: activityDate.toString(),
        isSpecial: updatedIsSpecial,
      };

      // If editing, update the existing activity in the database
      if (isEditing) {
        
        addToDB('activities', updatedActivity, route.params.activity.id);
        Alert.alert('Important', 'Are you sure you want to save these changes?', [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => {
            Alert.alert('Success', 'Activity updated successfully.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          }},
        ]);
      } else {
        // If adding a new activity, add it to the database
        addToDB('activities', updatedActivity);
        Alert.alert('Success', 'Activity added successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    }
  };
 
  // This function is called when the user presses the Delete button
  const handleDelete = () => {
    Alert.alert('Delete Activity', 'Are you sure you want to delete this activity?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: async () => {
        try {
          console.log('Deleting activity with id: ', route.params.activity.id);
          await deleteDocFromDB('activities', route.params.activity.id);
          Alert.alert('Success', 'Activity deleted successfully.', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        } catch (error) {
          Alert.alert('Error', 'Failed to delete activity. Please try again.');
        }
      }
    },
    ]);
  }

  // This component displays the input fields for the user to enter the activity details
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

      {/* Checkbox for special marking removal */}
      {isEditing && isSpecial && (
        <>
        <View style={commonStyles.checkboxContainer}>
          <Text style={commonStyles.checkbox}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
          <Checkbox
            value={removeSpecial}
            onValueChange={setRemoveSpecial}
          />
        </View>
        </>
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

export default AddActivity;
