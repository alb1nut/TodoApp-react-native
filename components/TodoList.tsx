import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Todo } from '../types';
import { fetchTodos, toggleTodo, deleteTodo } from '../todosSlice';



const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoItem}>
        <Text
          style={[styles.todoText, item.completed ? styles.completed : null]}
          onPress={() => handleToggleTodo(item.id)}
        >
          {item.title}
        </Text>
        <Text onPress={() => handleDeleteTodo(item.id)}>Delete</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8
    },
    todoText: {
      flex: 1,
      marginLeft: 8
    },
    completed: {
      textDecorationLine: 'line-through'
    }
  });