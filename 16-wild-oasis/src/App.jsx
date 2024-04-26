import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: purple;
  color: white;
`;
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

function App() {
  return (
    <StyledApp>
      <H1>Hello</H1>
      <Button>Click Me</Button>
    </StyledApp>
  );
}

export default App;
