import React, { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, ListRenderItemInfo, ScrollView, Text, View, } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Button, SelectionModal } from "../../components";
import { SelectionModalHandle } from "../../components/SelectionModal";
import { NavigationService } from "../../config";
import styles from "./styles";
import TodoItem, { StatusType, TodoType } from "./TodoItem";
import { TodoSelectors } from "../../store/selectors";
import { FetchAllTodoActions, UpdateTodoActions } from "../../store/actions/AppAction";
import { CommonUtils } from "../../config/utils";

export type Props = {
}

const Home: React.FC<Props> = (props) =>
{
  const pickerRef = useRef<SelectionModalHandle>();
  const todoData = useSelector(TodoSelectors.selectTodos);

  const dispatch = useDispatch();

  useEffect(()=>
  {
    dispatch(FetchAllTodoActions.Default({}));
  },[])

  const renderList = () =>
  {

    const renderItem: ListRenderItem<TodoType> = ({ item }: ListRenderItemInfo<TodoType>) =>
    {
      const onItemPress = () =>
      {
        pickerRef.current?.show(item.id);
      }

      return <TodoItem data={item} style={styles.item} onStatusPress={onItemPress} />
    }
    return (
      <FlatList
        data={todoData}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    )
  }

  const updateTodoStatus = (todoId: number, status: StatusType) =>
  {
    const updates:Partial<TodoType> = {status, updatedAt:CommonUtils.utcTimeNow()};
    const payload = {id: todoId, updates};
    CommonUtils.offlineActionDispatcher(UpdateTodoActions, payload);
  }

  return (
    <View style={styles.container}>
      {renderList()}
      <Button.FloatingButton onPress={() => NavigationService.navigate("AddTodo")} />
      <SelectionModal ref={pickerRef} callback={updateTodoStatus} />
    </View>
  );
}

export default Home;