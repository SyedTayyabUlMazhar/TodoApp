import React, { useRef, useState } from "react";
import { FlatList, ListRenderItem, ListRenderItemInfo, ScrollView, Text, View, } from 'react-native';
import { Button, SelectionModal } from "../../components";
import { SelectionModalHandle } from "../../components/SelectionModal";
import styles from "./styles";
import TodoItem, { StatusType, TodoType } from "./TodoItem";

function rand() { return Math.round(Math.random()*100)%3 as unknown as 0|1|2}
const TODO_DATA: TodoType[] = [
  {
    id: 1, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 2, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 3, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 4, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 5, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 6, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 7, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 8, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 9, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 10, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 11, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 12, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 13, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
  {
    id: 14, title: "Todo", status: rand(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim mi aliquet, pharetra arcu nec, posuere tellus. Ut faucibus tortor massa, a auctor nisl ultricies eget. Integer vel justo felis.",
  },
]
export type Props = {
}

const Home: React.FC<Props> = (props) =>
{
  const pickerRef = useRef<SelectionModalHandle>();
  const [todoData, setTodoData] = useState(TODO_DATA);

  const renderList = () =>
  {

    const renderItem: ListRenderItem<TodoType> = ({ item }: ListRenderItemInfo<TodoType>) => {
      const onItemPress = () =>
      {
        pickerRef.current?.show(item.id);
      }
      return <TodoItem data={item} style={styles.item} onStatusPress={onItemPress}/>
    }
    return (
      <FlatList
        data={todoData}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={styles.itemSeparator}/>}
      />
    )
  }

  const itemSelectionCallback = (todoId:number, status:StatusType) =>
  {
    const data = [...todoData];
    const todoIndex:number = data.findIndex((todo)=>todo.id===todoId);
    data[todoIndex] = {...data[todoIndex], status};

    setTodoData(data);
  }
  return (
    <View style={styles.container}>
      {renderList()}
      <Button.FloatingButton/>
      <SelectionModal ref={pickerRef} callback={itemSelectionCallback}/>
    </View>
  );
}

export default Home;