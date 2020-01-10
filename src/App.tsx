import React, { useState } from 'react';
import Styled from 'styled-components/native';
import { StatusBar} from 'react-native';
import TodoListContainer from './Component/TodoListContainer';
import uuidv1 from 'uuid/v1';

const Container = Styled.View`
    flex: 1;
    background-color: #F23657;
    align-items: center;
`;

const Text = Styled.Text`
    color: white;
    font-size: 30px;
    margin-top: 50px;
    font-weight: 200;
    margin-bottom: 30px;
`;

const Card = Styled.View`
  flex: 1;
  background-color: white;
  width: 90%;
  border-radius: 5;
  shadow-color: rgb(50, 50,50);
  shadow-opacity: 0.8;
  shadow-radius: 5;
  shadow-offset: {
    width: -1, height: 0
  };
`;

const TextInput = Styled.TextInput`
  padding: 20px;
  border-bottom-color: #bbb;
  border-bottom-width: 1;
  font-size: 25;
`;

const ScrollView = Styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))``;

const App = () => {
  const [newToDo, setToDo] = useState<string>('');
  const [toDos, setTodos] = useState<{}>({});
  const _AddTodo = () => {
    if (newToDo !== "") {
      setToDo("");
      const ID = uuidv1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now()
        }
      };
      let newToDos = {...toDos, ...newToDoObject};
      setTodos(newToDos);
    }
  };
  const _deleteToDo = (id: string): void => {
    var _toDos = {...toDos};
    delete _toDos[id];
    setTodos(_toDos);
  };
  const _uncompleteToDo = (id: string) => {
    const newToDos = {
      ...toDos,
      [id]: { ...toDos[id], isCompleted: false }
    };
    setTodos(newToDos);
  };
  const _completeToDo = (id: string) => {
    const newToDos = {
      ...toDos,
      [id]: { ...toDos[id], isCompleted: true }
    };
    setTodos(newToDos);
  };
  const _updateToDo = (id: string, text: string) => {
    const newToDos = {
      ...toDos,
      [id]: { ...toDos[id], text: text }
    };
    setTodos(newToDos);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text>Kawaii To Do</Text>
      <Card>
        <TextInput
          placeholder={"New To Do"} 
          onChangeText={text => setToDo(text)}
          value={newToDo} 
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
          onSubmitEditing={() => _AddTodo()}
        />
        <ScrollView>
          {Object.values(toDos).map(toDo => (
            <TodoListContainer 
              id={toDo.id} 
              text={toDo.text} 
              isCompleted={toDo.isCompleted} 
              deleteToDo={_deleteToDo}
              uncompleteToDo={_uncompleteToDo}
              completeToDo={_completeToDo}
              updateToDo={_updateToDo}
            />
          ))}
        </ScrollView>
      </Card>
    </Container>
  );
};

export default App;