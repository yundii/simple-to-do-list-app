// Screens/AddAnActivity.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityContext } from '../context/ActivityContext';
import { commonStyles } from '../helpers/styles';
import DateInput from '../Components/DateInput';

const AddAnActivity = ({ navigation }) => {
  const { addActivity } = useContext(ActivityContext);
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);

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


  const validateInputs = () => {
    if (!typeValue) {
      Alert.alert('Validation Error', 'Please select an activity type.');
      return false;
    }
    const durationNumber = parseInt(duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration.');
      return false;
    }
    if (!activityDate || !(activityDate instanceof Date) || isNaN(activityDate)) {
        Alert.alert('Invalid Date', 'Please select a valid date.');
        return false;
      }
  
      return true; // All validations passed
};

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

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        keyboardType="numeric"
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

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddAnActivity;
