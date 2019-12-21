import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Label = Styled.Text`
    font-size: 24px;
`;

const App = () => {
  return (
    <Container>
      <Label>Hello world!</Label>
    </Container>
  );
};

export default App;