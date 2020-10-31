import styled from "styled-components";

export const ProfilePanelContainer = styled.div`
  flex-shrink: 0;
  width: 25%;
  @media (max-width: 360px) {
    width: 35%;
  }
`;

export const ProfilePanelItem = styled.p`
  &:hover {
    cursor: pointer;
    color: #1890ff;
  }
`;
