import React, { useState } from 'react';
import { View, TextInput, Platform, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../helpers/styles';

const DateInput = ({ value, onChange}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ||null);
  const today = new Date();
  
  // Handle date change when a date is selected in the DateTimePicker
  const handleDateChange = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date); // Update the selected date if a date is chosen
      onChange(date); // Trigger the parent component's callback with the new date
      setShow(false); // Hide the DateTimePicker after selection
      // Hide the DateTimePicker immediately for Android
      if (Platform.OS === 'android') {
        setShow(false);
      }
    } else if (event.type === 'dismissed') {
      setShow(false); // Hide the DateTimePicker when dismissed
    }
  };

  // Show DateTimePicker when input is focused and set default date
  const handleInputFocus = () => {
    if (!selectedDate) {
      setSelectedDate(today); // If no date was previously selected, default to today
      onChange(today); // Pass today's date to parent
    }
    setShow(!show); // Toggle DatePicker visibility
  };

  return (
    <View>
      <Pressable onPress={handleInputFocus}>
        <View pointerEvents="none">
          <TextInput
            value={selectedDate ? selectedDate.toDateString() : ''}
            editable={false}
            placeholder="Select a date"
            style={commonStyles.input}
          />
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          value={selectedDate || today}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
          // onTouchCancel={() => setShow(false)} // Ensure it dismisses on cancel
        />
      )}
    </View>
  );
};

export default DateInput;
