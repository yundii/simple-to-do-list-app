import React, { useState } from 'react';
import { View, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../helpers/styles';

const DateInput = ({ value, onChange}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || null);
  const today = new Date();
  
  // Handle date change when a date is selected in the DateTimePicker
  const handleDateChange = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date); // Update the selected date if a date is chosen
      onChange(date); // Trigger the parent component's callback with the new date
    } else {
      setSelectedDate(today); // If no date is selected, default to today's date
    }
    setShow(false); // Hide the DateTimePicker after selection
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
      <TextInput
        value={selectedDate ? selectedDate.toDateString() : ''} // Display the selected date
        editable={false} 
        placeholder="Select a date" // Placeholder text
        onFocus={handleInputFocus} // Show the DateTimePicker when the input is focused
        onPressIn={handleInputFocus} // Show the DateTimePicker when the input is clicked
        style={commonStyles.input}
      />
      {show && (
        <DateTimePicker
          value={selectedDate || today} 
          mode="date"
          display="inline" 
          onChange={handleDateChange} // Handle date change
        />
      )}
    </View>
  );
};

export default DateInput;
