import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ActivityContext } from '../context/ActivityContext';
import { commonStyles, colors } from '../helpers/styles';

const ItemsList = ({ type }) => {
  const { activities, diets } = useContext(ActivityContext);

  // 根据类型选择数据源
  const data = type === 'activities' ? activities : diets;

  // 渲染每个条目
  const renderItem = ({ item }) => (
    <View style={commonStyles.itemContainer}>
      {type === 'activities' ? (
        <>
          <Text style={commonStyles.itemName}>{item.type}</Text>
          <View style={commonStyles.itemDetails}>
            <Text style={commonStyles.itemValue}>Duration: {item.duration} min</Text>
            <Text style={commonStyles.itemDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
          {item.isSpecial && (
            <Text style={[styles.special, { color: colors.textSecondary }]}>
              Special Activity
            </Text>
          )}
        </>
      ) : (
        <>
          <Text style={commonStyles.itemName}>{item.name}</Text>
          <View style={commonStyles.itemDetails}>
            <Text style={commonStyles.itemValue}>Value: {item.value}</Text>
            <Text style={commonStyles.itemDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: commonStyles.container.padding,
  },
  special: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default ItemsList;

