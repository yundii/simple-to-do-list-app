// Components/ItemsList.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { commonStyles } from '../helpers/styles';

export default function ItemsList({ data }) {
  const renderItem = ({ item }) => (
    <View style={commonStyles.itemContainer}>
      <Text style={commonStyles.itemName}>{item.name}</Text>
      <View style={commonStyles.itemDetails}>
        <Text style={commonStyles.itemDate}>{item.date}</Text>
        <Text style={commonStyles.itemValue}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
