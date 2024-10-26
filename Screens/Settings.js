import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles} from '../Helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import PressableButton from '../Components/PressableButton';

// This is the Settings screen that allows the user to toggle the theme
const SettingsScreen = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  // This component displays a button that toggles the theme
  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <View style={styles.buttonContainer}>
      <PressableButton
        onPress={toggleTheme}
        buttonStyle={[styles.button, { backgroundColor: theme.itemBg }]}
        pressedStyle={commonStyles.pressedStyle}
        //androidRippleColor={theme.textColor}
      >
        <Text style={[styles.buttonText, { color: theme.textColor }]}>Toggle Theme</Text>
      </PressableButton>
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
  button: {
    width: 150,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
