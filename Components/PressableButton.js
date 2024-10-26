import React from 'react';
import { Pressable, View } from 'react-native';

// This component is a Pressable button that changes its style when pressed
const PressableButton = ({ onPress, children, androidRippleColor = 'red', buttonStyle, pressedStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: androidRippleColor,
        borderless: true,
        radius: 25
      }}
      style={({ pressed }) => [
        buttonStyle,
        pressed && pressedStyle,
      ]}
    >
      <View>
        {children}
      </View>
    </Pressable>
  );
};

export default PressableButton;
