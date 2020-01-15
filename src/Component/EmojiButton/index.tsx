import React from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

const ActionContainer = Styled.View`
  margin: 10px;
`;
const Emoji = Styled.Text`
`;

interface Props {
  emoji: string;
  onPress: () => void;
}

const EmojiButton = ({emoji, onPress}: Props) => {
  return (
    <TouchableOpacity onPressOut={onPress}>
      <ActionContainer>
        <Emoji>{emoji}</Emoji>
      </ActionContainer>
    </TouchableOpacity>
  );
};

export default EmojiButton;
