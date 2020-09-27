import styled from "styled-components";

interface ISpacerProps {
  width?: string;
  height?: string;
}

const Spacer = styled.div<ISpacerProps>`
  width: ${(props) => props.width || "1px"};
  height: ${(props) => props.height || "1px"};
`;

export default Spacer;
