import React from "react";
import { Text, View, ViewStyle, } from 'react-native';
import styles from "./styles";
import { TouchableOpacity } from 'react-native';
import { CommonUtils } from "../../../config/utils";
import { useDispatch } from 'react-redux';
import { UpdateTodoActions } from "../../../store/actions/AppAction";

export const Status = {
  0: { id: 0, value: "Pending", },
  1: { id: 1, value: "Assigned", },
  2: { id: 2, value: "Completed", },
}

export type StatusType = 0 | 1 | 2;

export type TodoType = {
  id: number,
  title: string,
  description: string,
  status: StatusType,
  createdAt: number,
  updatedAt: number,
  deletedAt?: number,
};
export type Props = {
  data: TodoType,
  style: ViewStyle,
  onStatusPress: Function,
}

const TodoItem: React.FC<Props> = (props) =>
{
  const { style, onStatusPress, } = props;
  const { id, title, description, status, createdAt, updatedAt, deletedAt, } = props.data;

  const dispatch = useDispatch();

  const onDeletePress = () =>
  {
    const updates:Partial<TodoType> = {deletedAt:CommonUtils.utcTimeNow()};
    const payload = { id, updates};
    const action = UpdateTodoActions.Default(payload);
    dispatch(action);
  }

  const createdAndUpdatedTimeString: string = `Created at: ${CommonUtils.msToHourMin(createdAt)} \
  Update at: ${CommonUtils.msToHourMin(updatedAt)}`;

  const deletedStyle = deletedAt == undefined ? undefined : { borderWidth: 1, borderColor: 'red', };
  return (
    <View style={[styles.container, style, deletedStyle,]}>
      <Text style={styles.deleteText} onPress={onDeletePress}>Delete</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{title} {id} </Text>
        <Text style={styles.description}>{description} {createdAndUpdatedTimeString}</Text>
      </View>
      <TouchableOpacity style={styles.statusContainer} onPress={() => onStatusPress()}>
        <Text style={styles.status}>{Status[status].value}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TodoItem;