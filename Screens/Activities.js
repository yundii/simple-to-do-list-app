import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';
import { useNavigation } from '@react-navigation/native';

const ActivitiesScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Text style={commonStyles.headerButton}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <ItemsList type="activities" />
    </View>
  );
};

export default ActivitiesScreen;


