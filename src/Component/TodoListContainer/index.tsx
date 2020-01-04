import React, { useState} from 'react';
import Styled from 'styled-components/native';
import { StyleSheet, TouchableOpacity} from 'react-native';

const Container = Styled.View`
  width: 95%;
  border-bottom-color: #bbb;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  flex-direction: row;
  align-items: center;
  justifyContent: space-between;
`;

const Label = Styled.Text`
    font-weight: 600;
    font-size: 20px;
    margin-vertical: 20px;
    color: ${(props: {isCompleted: boolean;}) => props.isCompleted ? '#bbb' : '#353839'};
    text-decoration-line: ${(props: {isCompleted: boolean;}) => props.isCompleted ? 'line-through' : 'none'};
`;

const Circle = Styled.View`
    width: 30px;
    height: 30px;
    border-color: ${(props: {isCompleted: boolean;}) => props.isCompleted ? '#bbb' : '#F23567'};
    border-radius: 15px;
    border-width: 3px;
    margin-right: 20px;
`;


const Column = Styled.View`
  flexDirection: row;
  alignItems: center;
  // width: 50%;
  justifyContent: space-between;
`;

const Action = Styled.View`
  flexDirection: row;
`;

const ActionContainer = Styled.View`
  margin-vertical: 10px;
  margin-horizontal: 10px;
`;
const Emoji = Styled.Text`
`;

const Input = Styled.TextInput`
    margin-vertical: 20px;
    padding-bottom: 5px;
`;

interface Props {
  text: string;
}


const TodoListCntainer = ({text}: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toDoValue, setToDoValue] = useState<string>("");
  const _startEditing = () => {
    setIsEditing(true);
    setToDoValue(text);
  };
  const _finishEditing = () => {
    setIsEditing(false);
  };
  const _controllInput = () => {
    setToDoValue(text);
  };
  return (
        <Container>
          <Column>
            <TouchableOpacity 
              onPress={() => setIsCompleted(!isCompleted)}>
              <Circle isCompleted={isCompleted} />
            </TouchableOpacity>
            {isEditing ? (
              <Input 
                multiline={true}
                onChangeText={() => _controllInput()}
                returnKeyType={"done"}
                onBlur={() => _finishEditing()}>
                <Label isCompleted={isCompleted}>{toDoValue}</Label>
              </Input>
            ) : (
              <Label isCompleted={isCompleted}>{text}</Label>
            )}
          </Column>
          {isEditing ? (
            <Action>
              <TouchableOpacity
                onPressOut={() => _finishEditing()}>
                <ActionContainer>
                  <Emoji>✅</Emoji>
                </ActionContainer>
              </TouchableOpacity>
            </Action>
          ) : (
            <Action>
              <TouchableOpacity
                onPressOut={() => _startEditing()}>
                <ActionContainer>
                  <Emoji>✏️</Emoji>
                </ActionContainer>
              </TouchableOpacity>
              <TouchableOpacity>
                <ActionContainer>
                  <Emoji>❌</Emoji>
                </ActionContainer>
              </TouchableOpacity>
            </Action>
          )}
        </Container>
    );
};


export default TodoListCntainer;