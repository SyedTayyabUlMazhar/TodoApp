import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, SelectionModal } from '../../components';
import { SelectionModalHandle } from '../../components/SelectionModal';
import { Status, StatusType, TodoType } from '../Home/TodoItem';
import styles from './styles';
import { NavigationService } from '../../config';
import { CommonUtils } from '../../config/utils';
import { AddTodoActions } from '../../store/actions/AppAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TodoSelectors } from '../../store/selectors';

export type Props = {
  route: any,
};

const AddTodo: React.FC<Props> = (props) =>
{
  const [title, setTitle] = useState<string>('Title');
  const [description, setDescription] = useState<string>('Description');
  const [todoStatus, setTodoStatus] = useState<StatusType>(0);

  const pickerRef = useRef<SelectionModalHandle>();
  const todosLength = useSelector(TodoSelectors.selectTodosLength);

  const dispatch = useDispatch();

  const onStatusPress = () =>
  {
    pickerRef.current?.show(0);
  };

  const onStatusSelectedInModal = (_: number, statusId: StatusType) =>
  {
    setTodoStatus(statusId);
  }

  const onSubmit = () =>
  {
    const createdAt = CommonUtils.utcTimeNow();
    const todo: TodoType = { id: todosLength + 1, description, status: todoStatus, title, createdAt, updatedAt: createdAt };
    dispatch(AddTodoActions.Default(todo, () => NavigationService.goBack()));
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
      />
      <Text onPress={onStatusPress}>{Status[todoStatus].value}</Text>
      <SelectionModal ref={pickerRef} callback={onStatusSelectedInModal} />
      <Button.Standard containerStyle={styles.submitBtn} text="Confirm" onPress={onSubmit} />
    </View>
  );
};

export default AddTodo;
