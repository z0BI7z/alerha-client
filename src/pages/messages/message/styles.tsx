import styled from "styled-components";

export const MessageContainer = styled.div`
  margin: 4px;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1),
    -1px -4px 6px rgba(255, 255, 255, 0.8);
  display: inline-block;
  align-self: flex-start;
`;

export const MessageText = styled.p`
  margin: 0;
  margin-bottom: 4px;
`;

export const MessageDate = styled.p`
  font-size: 0.8rem;
  color: #757575;
  margin: 0;
`;
