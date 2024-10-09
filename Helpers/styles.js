export const colors = {
    background: '#D8BFD8',
    White: 'white',
    Purple: 'purple',
    Yellow: 'yellow',
  };
  
  //reusable styles
  export const commonStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: colors.padding,
    },
    itemContainer: {
      backgroundColor: colors.Purple,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      width: '90%',
      borderRadius: colors.borderRadius,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemName: {
      fontSize: 18,
      color: colors.White,
    },
    itemDetails: {
      color: colors.textPrimary,
      backgroundColor: colors.White,
      padding: 8,
      borderRadius: 4,
      marginHorizontal: 2,
    },
  };

// Define a common screen header style
export const commonHeaderOptions = {
  headerStyle: { backgroundColor: colors.Purple },
  headerTintColor: colors.White,
  headersize: 25,
};

  