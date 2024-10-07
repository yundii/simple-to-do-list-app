import React from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';

const DietScreen = () => {
  return (
    <View style={commonStyles.container}>
      <ItemsList type="diets" />
    </View>
  );
};

export default DietScreen;
