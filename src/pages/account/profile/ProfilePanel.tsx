import React from "react";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../../modules/user";
import {
  ProfilePanelContainer,
  ProfilePanelItem,
} from "./profile-panel/styles";

interface IProfileNavigationProps {
  currentSection: string;
  onSelect: (section: string) => void;
}

function ProfileNavigation({
  currentSection,
  onSelect,
}: IProfileNavigationProps) {
  const dispatch = useDispatch();
  const signOut = () => dispatch(signOutStart());

  return (
    <ProfilePanelContainer>
      <ProfilePanelItem onClick={() => onSelect("email")}>{`${
        currentSection === "email" ? "*" : ""
      } Change Email`}</ProfilePanelItem>
      <ProfilePanelItem onClick={() => onSelect("password")}>{`${
        currentSection === "password" ? "*" : ""
      } Change Password`}</ProfilePanelItem>
      <ProfilePanelItem onClick={() => onSelect("apiKey")}>{`${
        currentSection === "apiKey" ? "*" : ""
      } Api Key`}</ProfilePanelItem>
      <ProfilePanelItem onClick={signOut}>Sign Out</ProfilePanelItem>
    </ProfilePanelContainer>
  );
}

export default ProfileNavigation;
