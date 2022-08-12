import { StyleSheet } from "react-native";
import { Colors } from "../../config";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.Background,
  },
  list: {
  },
  listContainer:{
    paddingVertical: 16,
    flexGrow:1,
  },
  itemSeparator:{
    height: 2,
    marginHorizontal: 16,
    backgroundColor: 'transparent'
  },
  item: {
    marginHorizontal: 20,
  }
  
});