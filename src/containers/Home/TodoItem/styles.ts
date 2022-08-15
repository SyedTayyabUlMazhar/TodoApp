import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  subContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  statusContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  status: {
    fontSize: 16,
  },

  description: {
    marginTop: 8,
    fontSize: 12,
  },

  deleteText: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 10,
  }


});