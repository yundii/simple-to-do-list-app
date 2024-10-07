// Screens/Activities.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../helpers/styles';
import { useNavigation } from '@react-navigation/native';

const ActivitiesScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Ionicons name="add" size={24} color="black" style={{ marginRight: 16 }} />
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


