import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, SelectionModal } from '../../components';
import { SelectionModalHandle } from '../../components/SelectionModal';
import { Status, StatusType, TodoType } from '../Home/TodoItem';
import styles from './styles';
import { NavigationService } from '../../config';
import { CommonUtils } from '../../config/utils';

export type Props = {
  route:any,
};

const AddTodo: React.FC<Props> = (props) =>
{
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [todoStatus, setTodoStatus] = useState<StatusType>(0);

  const pickerRef = useRef<SelectionModalHandle>();

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
    const todo:TodoType = {id:0, description, status:todoStatus, title, createdAt, updatedAt: createdAt};
    props?.route?.params.onAdd(todo);
    NavigationService.goBack();
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
