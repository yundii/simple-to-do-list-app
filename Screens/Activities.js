import React, { useContext } from 'react';
import {View} from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles, colors } from '../Helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons';
import PressableButton from '../Components/PressableButton';

// This is the Activities screen that displays the list of activities
const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  // This hook is used to set the header button that navigates to the AddActivity screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton 
          onPress={() => navigation.navigate('AddActivity')}
          pressedStyle={commonStyles.pressedStyle}
        >
          <View style={commonStyles.headerButton}>
          <Ionicons name="add" size={24} color={colors.White} />
          <Ionicons name="walk" size={24} color={colors.White} />
          </View>
        </PressableButton>
      ),
    });
  }, [navigation]);
 
  // This component displays the list of activities
  return (
    <View style={[commonStyles.container, { backgroundColor: theme.containerBg }]}>
      <ItemsList type="activities" />
    </View>
  );
};

export default ActivitiesScreen;


