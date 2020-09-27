import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../modules/user";
import {
  MainNavBarContainer,
  MainNavBarInnerContainer,
  MainNavBarItem,
} from "./main-nav-bar/styles";

function MainNavBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <MainNavBarContainer>
      <MainNavBarInnerContainer>
        <MainNavBarItem href="/message">Messages</MainNavBarItem>
        <MainNavBarItem href="/account">
          {isLoggedIn ? "Account" : "Login"}
        </MainNavBarItem>
      </MainNavBarInnerContainer>
    </MainNavBarContainer>
  );
}

export default MainNavBar;
