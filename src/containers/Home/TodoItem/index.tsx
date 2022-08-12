import React from "react";
import { ScrollView, Text, View, ViewStyle, } from 'react-native';
import styles from "./styles";

export const Status = {
  0 : {id: 0, value: "Pending",},
  1 : {id: 1, value: "Assigned",},
  2 : {id: 2, value: "Completed",},
}
export type TodoType = {
  id: number,
  title: string,
  description: string,
  status:  0|1|2,
};
export type Props = {
  data: TodoType,
  style: ViewStyle,
}

const TodoItem: React.FC<Props> = (props) =>
{
  const { style } = props;
  const { id, title, description, status, } = props.data;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{title} {id}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>{Status[status].value}</Text>
      </View>
    </View>
  );
}

export default TodoItem;