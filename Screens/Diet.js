import React from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { commonStyles } from '../helpers/styles';

export default function DietScreen({ data }) {
  return (
    <View style={commonStyles.container}>
      <ItemsList data={data} />
    </View>
  );
}
