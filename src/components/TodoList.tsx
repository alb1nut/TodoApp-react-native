import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, deleteTodo, getTodos, toggleTodo } from '../store/todo/todoSlice';
// import { RootState } from '../store/rootReducer';
import { Todo } from '../models/Todo';
import TodoItem from './TodoItem';
import { RootState } from '../redux/store';
import { addTodo, deleteTodo, toggleTodo } from '../reducers/todoReducer';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todos = useSelector((state: RootState) => state.todo.todos);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const error = useSelector((state: RootState) => state.todo.error);

  const [todoText, setTodoText] = React.useState('');

  const handleSubmit = () => {
    if (todoText.trim() === '') return;

    const newTodo: Todo = {
      id: Math.floor(Math.random() * 100000),
    //   userId: 1,
      title: todoText,
      completed: false,
    };

    dispatch(addTodo(newTodo));
    setTodoText('');
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <FlatList
     data={todos}
     renderItem={({ item }) => <TodoItem todo={item} />}
     keyExtractor={item => item.id.toString()}
    //  contentContainerStyle={styles.list}
     ListEmptyComponent={<Text>No todos found.</Text>}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default TodoList;
function getTodos(): any {
    throw new Error('Function not implemented.');
}

