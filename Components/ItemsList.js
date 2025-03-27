import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { commonStyles, colors } from '../Helpers/styles';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { ThemeContext } from '../context/ThemeContext';
import { onSnapshot, collection } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';
import { useNavigation } from '@react-navigation/native';

// This component displays a list of activities or diet entries
const ItemsList = ({ type }) => {
  // Get the theme from the context
  const { theme } = useContext(ThemeContext);
  // Get the navigation object
  const navigation = useNavigation();
 // The data variable will hold either the activities or dietEntries array based on the type prop
 const [data, setData] = useState([]); 

  // Fetch data from Firestore based on the type
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, type === 'activities' ? 'activities' : 'dietEntries'),
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        console.log("Real-time fetched items:", items); // Check real-time data
      },
      (error) => {
        console.error("Error listening to real-time updates: ", error);
      }
    );
  
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [type]);
  

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
      onPress={() => {
        if (type === 'activities') {
          navigation.navigate('EditActivity', { activity: item });
        } else {
          navigation.navigate('EditDietEntry', { dietEntry: item });
        }
      }}
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

