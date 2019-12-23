import React, { useState } from 'react';
import Styled from 'styled-components/native';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const Container = Styled.View`
  width: 95%;
  border-bottom-color: #bbb;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  flex-direction: row;
  align-items: center;
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
    border-radius: 15px
    border-width: 3px
    margin-right: 20px;
`;

const TodoListCntainer = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  return (
        <Container>
          <TouchableOpacity 
            onPress={() => setIsCompleted(!isCompleted)}>
            <Circle isCompleted={isCompleted} />
          </TouchableOpacity>
          <Label isCompleted={isCompleted}>Todo</Label>
        </Container>
    );
};


export default TodoListCntainer;