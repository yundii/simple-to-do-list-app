import React, { useContext } from 'react';
import { View,TouchableOpacity } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles, colors } from '../Helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons';

// This is the Diet screen that displays the list of diet entries
const DietScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  // This hook is used to set the header button that navigates to the AddDietEntry screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={{ flexDirection: 'row', width: 60 }} 
          onPress={() => navigation.navigate('AddDietEntry')}
        >
          <Ionicons name="add" size={24} color={colors.White} />
          <Ionicons name="fast-food" size={24} color={colors.White} />
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
