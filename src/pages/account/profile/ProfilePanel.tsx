import React from "react";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../../modules/user";
import { ProfilePanelItem } from "./profile-panel/styles";

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
    <div style={{ width: "25%" }}>
      <ProfilePanelItem onClick={() => onSelect("email")}>{`Change Email ${
        currentSection === "email" ? "*" : ""
      }`}</ProfilePanelItem>
      <ProfilePanelItem
        onClick={() => onSelect("password")}
      >{`Change Password ${
        currentSection === "password" ? "*" : ""
      }`}</ProfilePanelItem>
      <ProfilePanelItem onClick={() => onSelect("apiKey")}>{`Api Key ${
        currentSection === "apiKey" ? "*" : ""
      }`}</ProfilePanelItem>
      <ProfilePanelItem onClick={signOut}>Sign Out</ProfilePanelItem>
    </div>
  );
}

export default ProfileNavigation;
