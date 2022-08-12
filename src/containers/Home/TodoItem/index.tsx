import React from "react";
import { Text, View, ViewStyle, } from 'react-native';
import styles from "./styles";
import { TouchableOpacity } from 'react-native';

export const Status = {
  0 : {id: 0, value: "Pending",},
  1 : {id: 1, value: "Assigned",},
  2 : {id: 2, value: "Completed",},
}

export type StatusType = 0 | 1 | 2;

export type TodoType = {
  id: number,
  title: string,
  description: string,
  status:  StatusType,
};
export type Props = {
  data: TodoType,
  style: ViewStyle,
  onStatusPress: Function,
}

const TodoItem: React.FC<Props> = (props) =>
{
  const { style, onStatusPress } = props;
  const { id, title, description, status, } = props.data;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{title} {id}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.statusContainer} onPress={()=>onStatusPress()}>
        <Text style={styles.status}>{Status[status].value}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TodoItem;