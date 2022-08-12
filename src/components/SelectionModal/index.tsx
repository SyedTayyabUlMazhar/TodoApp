import React, { useImperativeHandle, useRef, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Modal from "react-native-modal";
import { Status, StatusType } from "../../containers/Home/TodoItem";
import styles from './styles';

export type Props = {
  ref: any,
  callback: (id: number, status: StatusType) => void,
};

export type SelectionModalHandle = {
  show: (todoId: number) => void,
  hide: () => void,
}
const SelectionModal: React.FC<Props> = React.forwardRef((props, forwardRef) =>
{
  const todoIdRef = useRef<number>();

  const [isVisible, setIsVisible] = useState(false);

  const hide = () => setIsVisible(false);

  useImperativeHandle(forwardRef, (): SelectionModalHandle => ({
    show: (todoId: number) => 
    {
      todoIdRef.current = todoId;
      setIsVisible(true);
    },
    hide,
  }));


  const renderItems = () =>
  {
    return Object.values(Status).map((status) => (
      <TouchableOpacity key={status.id} style={styles.itemContainer}
        onPress={() =>
        {
          props.callback(todoIdRef.current!, status.id as StatusType);
          hide();
        }}>
        <Text style={styles.itemText}>{status.value}</Text>
      </TouchableOpacity>
    ))
  }
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={hide}
        onBackdropPress={hide}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.container}>
          {renderItems()}
        </View>
      </Modal>
    </View>
  );
})

export default SelectionModal;