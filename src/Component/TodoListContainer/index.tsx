import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {StyleSheet, TouchableOpacity} from 'react-native';

import EmojiButton from '~/Component/EmojiButton';

const Container = Styled.View`
  width: 95%;
  border-bottom-color: #bbb;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = Styled.Text`
    font-weight: 600;
    font-size: 20px;
    margin: 20px 0;
    color: ${(props: {isCompleted: boolean}) =>
      props.isCompleted ? '#bbb' : '#353839'};
    text-decoration-line: ${(props: {isCompleted: boolean}) =>
      props.isCompleted ? 'line-through' : 'none'};
`;

const Circle = Styled.View`
    width: 30px;
    height: 30px;
    border-color: ${(props: {isCompleted: boolean}) =>
      props.isCompleted ? '#bbb' : '#F23567'};
    border-radius: 15px;
    border-width: 3px;
    margin-right: 20px;
`;

const Column = Styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

const Action = Styled.View`
  flex-direction: row;
`;

const Input = Styled.TextInput`
    margin: 20px 0;
    padding-bottom: 5px;
    background: red;
`;

interface Props {
  id: string;
  text: string;
  isCompleted: boolean;
  deleteToDo: (id: string) => void;
  updateCompleteTodo: (id: string, isCompleted: boolean) => void;
  updateToDo: (id: string, text: string) => void;
}

const TodoListCntainer = ({
  id,
  text,
  isCompleted,
  deleteToDo,
  updateCompleteTodo,
  updateToDo,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toDoValue, setToDoValue] = useState<string>(text);
  const _startEditing = () => {
    setIsEditing(true);
    setToDoValue(text);
  };
  const _finishEditing = () => {
    updateToDo(id, toDoValue);
    setIsEditing(false);
  };
  const _controllInput = (inputText: string) => {
    setToDoValue(inputText);
  };
  const _toggleComlete = () => {
    updateCompleteTodo(id, !isCompleted);
  };
  return (
    <Container>
      <Column>
        <TouchableOpacity onPress={() => _toggleComlete()}>
          <Circle isCompleted={isCompleted} />
        </TouchableOpacity>
        {isEditing ? (
          <Input
            multiline={true}
            onChangeText={inputText => _controllInput(inputText)}
            returnKeyType={'done'}
            onBlur={() => _finishEditing()}>
            <Label isCompleted={isCompleted}>{toDoValue}</Label>
          </Input>
        ) : (
          <Label isCompleted={isCompleted}>{toDoValue}</Label>
        )}
      </Column>
      <Action>
        {isEditing ? (
          <EmojiButton emoji="✅" onPress={() => _finishEditing()} />
        ) : (
          <>
            <EmojiButton emoji="✏️" onPress={() => _startEditing()} />
            <EmojiButton emoji="❌" onPress={() => deleteToDo(id)} />
          </>
        )}
      </Action>
    </Container>
  );
};

export default TodoListCntainer;
