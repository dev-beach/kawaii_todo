import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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

interface ITodos {
  [key: string]: {
    id: string;
    isCompleted: boolean;
    text: string;
    createdAt: Number;
  };
}
const App = () => {
  const [newToDo, setToDo] = useState<string>('');
  const [toDos, setTodos] = useState<ITodos>({});

  const _AddTodo = (): void => {
    if (newToDo !== '') {
      const id = uuidv1();

      setToDo('');
      _saveToDos({
        ...toDos,
        [id]: {
          id,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now(),
        },
      });
    }
  };

  const _deleteToDo = (id: string): void => {
    let _toDos = {...toDos};
    delete _toDos[id];
    _saveToDos(_toDos);
  };

  const _updateCompleteTodo = (id: string, isCompleted: boolean): void => {
    _saveToDos({
      ...toDos,
      [id]: {
        ...toDos[id],
        isCompleted,
      },
    });
  };

  const _updateToDo = (id: string, text: string): void => {
    const newToDos = {
      ...toDos,
      [id]: {...toDos[id], text: text},
    };
    _saveToDos(newToDos);
  };

  const _saveToDos = (newToDos: ITodos): void => {
    setTodos(newToDos);
    AsyncStorage.setItem('toDos', JSON.stringify(newToDos));
  };

  const _loadTodos = async () => {
    try {
      const toDos = await AsyncStorage.getItem('toDos');
      if (toDos) {
        const parsedToDos = JSON.parse(toDos);
        setTodos(parsedToDos);
      } else {
        setTodos({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _loadTodos();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text>Kawaii To Do</Text>
      <Card>
        <TextInput
          placeholder={'New To Do'}
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
              key={toDo.id}
              id={toDo.id}
              text={toDo.text}
              isCompleted={toDo.isCompleted}
              deleteToDo={_deleteToDo}
              updateCompleteTodo={_updateCompleteTodo}
              updateToDo={_updateToDo}
            />
          ))}
        </ScrollView>
      </Card>
    </Container>
  );
};

export default App;
