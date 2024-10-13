import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

// This is the Activities screen that displays the list of activities
const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  // This hook is used to set the header button that navigates to the AddActivity screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Text style={commonStyles.headerButton}>Add</Text>
        </TouchableOpacity>
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


