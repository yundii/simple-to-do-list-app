export const colors = {
    background: '#D8BFD8',
    headerBackground:'purple',
    headerTint: 'white',
    itemBackground: '#333',
    textPrimary: '#fff',
    textSecondary: '#ff0',
    padding: 20,
    borderRadius: 8,
  };
  
  //reusable styles
  export const commonStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: colors.padding,
    },
    itemContainer: {
      backgroundColor: colors.itemBackground,
      padding: 15,
      marginVertical: 10,
      borderRadius: colors.borderRadius,
    },
    itemName: {
      fontSize: 18,
      color: colors.textPrimary,
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    itemDate: {
      color: colors.textSecondary,
    },
    itemValue: {
      color: colors.textPrimary,
    },
  };

// Define a common screen header style
export const commonHeaderOptions = {
  headerStyle: { backgroundColor: colors.headerBackground },
  headerTintColor: colors.headerTint,
};

  