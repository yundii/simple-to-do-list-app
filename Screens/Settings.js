import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { colors, commonStyles} from '../helpers/styles';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <View style={styles.buttonContainer}>
      <Button title="Toggle Theme" onPress={toggleTheme} color={theme.textColor}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 150,
    marginVertical: 10,
    backgroundColor:colors.Purple,
    borderRadius: 10,
  },
  
});

export default SettingsScreen;
