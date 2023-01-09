import styled from "styled-components";
import Spinner from "../img/spinner.svg";
const CustomSpinner = styled.div`
  width: 100%;
  height: ${(props) => props.height || "100vh"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingSpinner = ({ height = "100vh" }) => {
  return (
    <CustomSpinner height={height}>
      <img alt="loading spinner" src={Spinner} />
    </CustomSpinner>
  );
};

export default LoadingSpinner;
