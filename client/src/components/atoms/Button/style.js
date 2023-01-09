import styled from 'styled-components';

const CustomButton = styled.button`
  background-color: ${(props) => props.backgroundColor || '#4caf50'};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

export default CustomButton;
