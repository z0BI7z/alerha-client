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
      <MainNavBarItem to="/">Alerha</MainNavBarItem>
      <MainNavBarInnerContainer>
        <MainNavBarItem to="/message">Messages</MainNavBarItem>
        <MainNavBarItem to="/account">
          {isLoggedIn ? "Account" : "Login"}
        </MainNavBarItem>
      </MainNavBarInnerContainer>
    </MainNavBarContainer>
  );
}

export default MainNavBar;
