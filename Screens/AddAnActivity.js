// Screens/AddAnActivity.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityContext } from '../context/ActivityContext';
import { commonStyles } from '../helpers/styles';

const AddAnActivity = ({ navigation }) => {
  const { addActivity } = useContext(ActivityContext);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

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

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

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
    if (!date) {
      Alert.alert('Validation Error', 'Please select a date.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateInputs()) {
      const durationNumber = parseInt(duration, 10);
      const isSpecial = (typeValue === 'Running' || typeValue === 'Weights') && durationNumber > 60;

      const newActivity = {
        id: Date.now().toString(),
        type: typeValue,
        duration: durationNumber,
        date: date.toISOString(),
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

      <Text style={commonStyles.label}>Duration (minutes)</Text>
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
      />

      <Text style={commonStyles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={commonStyles.input}
          editable={false}
          value={date.toLocaleDateString()}
          placeholder="Select date"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={onChangeDate}
        />
      )}

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
