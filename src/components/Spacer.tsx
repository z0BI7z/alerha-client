import styled from "styled-components";

interface ISpacerProps {
  width?: string;
}

const Spacer = styled.div<ISpacerProps>`
  width: ${(props) => props.width || "1rem"};
`;

export default Spacer;
