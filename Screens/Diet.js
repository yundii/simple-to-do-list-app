import React, { useContext } from 'react';
import { View,TouchableOpacity, Text } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';


const DietScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddDietEntry')}>
          <Text style={commonStyles.headerButton}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.containerBg }]}>
      <ItemsList type="dietEntries" />
    </View>
  );
};

export default DietScreen;
