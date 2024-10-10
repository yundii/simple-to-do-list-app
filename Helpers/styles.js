export const colors = {
    LightPurple: '#D8BFD8',
    White: 'white',
    Purple: 'purple',
    Yellow: 'yellow',
    Black: 'black',
  };
  
  //reusable styles
  export const commonStyles = {
    container: {
      flex: 1,
      //backgroundColor: colors.LightPurple,
      padding: 16,
    },
    itemContainer: {
      //backgroundColor: colors.Purple,
      padding: 8,
      marginVertical: 10,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    itemName: {
      fontSize: 18,
      color: colors.White,
    },
    itemDetail: {
      backgroundColor: colors.White,
      padding: 8,
      borderRadius: 4,
      // marginHorizontal: 2,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    itemDetails: {
      //backgroundColor: colors.White,
      padding: 8,
      borderRadius: 4,
      marginHorizontal: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerButton: {
      color: colors.White,
      fontSize: 18,
      marginRight: 10,
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.White,
      padding: 10,
      borderRadius: 4,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.Black,
    },
    buttonContainer: {
      position: 'absolute', 
      bottom: '20%',     
      flexDirection: 'row',  
      justifyContent: 'space-between', 
      width: '70%',   
      alignSelf: 'center'      
    },
    button: {
      width: '30%',            
      padding: 10,          
      borderRadius: 4,      
    },
  };

// Define a common screen header style
export const commonHeaderOptions = {
  headerStyle: { backgroundColor: colors.Purple },
  headerTintColor: colors.White,
  headersize: 25,
};

  