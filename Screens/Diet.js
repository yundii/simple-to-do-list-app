import React, { useContext } from 'react';
import { View,TouchableOpacity, Text } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

// This is the Diet screen that displays the list of diet entries
const DietScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  // This hook is used to set the header button that navigates to the AddDietEntry screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddDietEntry')}>
          <Text style={commonStyles.headerButton}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // This component displays the list of diet entries
  return (
    <View style={[commonStyles.container, { backgroundColor: theme.containerBg }]}>
      <ItemsList type="dietEntries" />
    </View>
  );
};

export default DietScreen;
