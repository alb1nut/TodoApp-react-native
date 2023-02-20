import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../todosSlice';

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8
  }
});

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo({
        title: text,
        completed: false,
        id: 0
    }));
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new to-do item"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
};

export default AddTodo;
