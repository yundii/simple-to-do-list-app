import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { ActivityDietContext } from '../context/ActivityDietContext';
import { commonStyles, colors } from '../Helpers/styles';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

// This component displays a list of activities or diet entries
const ItemsList = ({ type }) => {
  // Get the activities and dietEntries arrays from the context
  const { activities, dietEntries} = useContext(ActivityDietContext);
  // Get the theme from the context
  const { theme } = useContext(ThemeContext);
  // Get the navigation object
  const navigation = useNavigation();
 // The data variable will hold either the activities or dietEntries array based on the type prop
  const data = type === 'activities' ? activities : dietEntries;

  // This function renders the date and duration for activities or date and calories for diet entries
  const renderDetails = (item) => (
    <View style={commonStyles.itemDetails}>
    <View style={[commonStyles.itemDetail, {marginRight: 3}]}>
      <Text>{new Date(item.date).toDateString()}</Text>
    </View>
    <View style={commonStyles.itemDetail}>
      <Text>{type === 'activities'  ? `${item.duration} min` : item.calories}</Text>
    </View>
    </View>
  );
  
  // This function renders each item in the list
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('EditActivity', { activity: item })}
      style={[commonStyles.itemContainer, { backgroundColor: theme.itemBg }]}
    >
          <Text style={commonStyles.itemName}>{type === 'activities'? item.type : item.description}</Text>
          {item.isSpecial && (
              <Ionicons
                name="warning" // Icon for warning
                size={28}
                color={colors.Yellow} // Warning icon color
                style={styles.warningIcon} 
              />
            )}
          {renderDetails(item)}
    </Pressable>
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
    backgroundColor: 'purple',
    height: '80%', 
    marginHorizontal: 3,
  },
});

export default ItemsList;

