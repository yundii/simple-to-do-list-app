import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ActivityDietContext } from '../context/ActivityDietContext';
import { commonStyles, colors } from '../helpers/styles';
import Ionicons from '@expo/vector-icons/Ionicons'; 

const ItemsList = ({ type }) => {
  const { activities, dietEntries} = useContext(ActivityDietContext);

  const data = type === 'activities' ? activities : dietEntries;

  const renderDetails = (item) => (
    <View style={commonStyles.itemDetails}>
      <Text>{new Date(item.date).toDateString()}</Text>
      <View style={styles.divider} />
      <Text>{type === 'activities'  ? `${item.duration} min` : item.calories}</Text>
    </View>
  );
  
  const renderItem = ({ item }) => (
    <View style={commonStyles.itemContainer}>
          <Text style={commonStyles.itemName}>{type === 'activities'? item.type : item.description}</Text>
          {item.isSpecial && (
              <Ionicons
                name="warning" // Icon for warning
                size={28}
                color={colors.Yellow} // Warning icon color
                style={styles.warningIcon} // You can adjust the style
              />
            )}
          {renderDetails(item)}
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
    padding: 10,
  },
  warningIcon: {
    marginLeft: 40,
    alignSelf: 'center',
  },
  divider: {
    width: 1, 
    backgroundColor: 'black',
    height: '80%', 
    marginHorizontal: 3,
  },
});

export default ItemsList;

