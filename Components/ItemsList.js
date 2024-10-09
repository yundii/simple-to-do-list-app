import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ActivityContext } from '../context/ActivityContext';
import { commonStyles, colors } from '../helpers/styles';
import Ionicons from '@expo/vector-icons/Ionicons'; 

const ItemsList = ({ type }) => {
  const { activities, diets } = useContext(ActivityContext);

  const data = type === 'activities' ? activities : diets;

  const renderItem = ({ item }) => (
    <View style={commonStyles.itemContainer}>
      {type === 'activities' ? (
        <>
        
          <Text style={commonStyles.itemName}>{item.type}</Text>
            <View style={styles.itemDetail}>
            {item.isSpecial && (
              <Ionicons
                name="warning-outline" // Icon for warning
                size={28}
                color={colors.Yellow} // Warning icon color
                style={styles.warningIcon} // You can adjust the style
              />
            )}
            <Text style={commonStyles.itemDetails}>
              {new Date(item.date).toDateString()}
            </Text>
            </View>
            <Text style={commonStyles.itemDetails}>{item.duration} min</Text>
         
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
  warningIcon: {
    marginTop: 5,
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
  },
});

export default ItemsList;

