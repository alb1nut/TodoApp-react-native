import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// import store from './store';
// import AddTodo from './components/AddTodo';
// import TodoList from './components/TodoList';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const App = () => {
  return (
    // <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* <AddTodo />
        <TodoList /> */}
      </SafeAreaView>
    // </Provider>
  );
};

export default App;
