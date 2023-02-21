import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Todo } from '../models/Todo';
import { completeTodo } from '../redux/todo.slice';
// import { Todo } from '../models/todo';

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(completeTodo({ id: todo.id }));
  };

  return (
    <TouchableOpacity onPress={handleComplete}>
      <View style={styles.container}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.completed}>{todo.completed ? 'Completed' : 'Pending'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  completed: {
    color: '#888',
    fontWeight: 'bold',
  },
});

export default TodoItem;
