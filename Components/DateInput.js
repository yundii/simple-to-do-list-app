import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../helpers/styles';

const DateInput = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const validDate = value instanceof Date ? value : new Date();

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
        onChange(selectedDate); // Update date if a date was selected
      }
      setShow(false); 
  };

  return (
    <View>
      <TextInput
        value={validDate.toLocaleDateString()} // Display the selected date
        editable={false} 
        placeholder="Select a date" // Placeholder text
        onFocus={() => setShow(true)} // Show DatePicker on focus
        onPressIn={() => setShow(true)}  // Also show DatePicker on touch
        style={commonStyles.input}
      />
      {show && (
        <DateTimePicker
          value={validDate}
          mode="date"
          display="inline" 
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DateInput;
