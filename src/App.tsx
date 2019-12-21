import React, { useState, Component } from 'react';
import Styled from 'styled-components/native';
import { StatusBar} from 'react-native';
import TodoListContainer from './Component/TodoListContainer';

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
  const [newTodo, setTodo] = useState<string>('');
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text>Kawaii To Do</Text>
      <Card>
        <TextInput
          placeholder={"New To Do"} 
          onChangeText={text => setTodo(text)}
          value={newTodo} 
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <ScrollView>
          <TodoListContainer />
        </ScrollView>
      </Card>
    </Container>
  );
};

export default App;