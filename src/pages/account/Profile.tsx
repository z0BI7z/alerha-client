import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectIsLoggedIn } from "../../modules/user";
import RefreshApiKey from "../../components/RefreshApiKey";
import { ProfileContainer } from "./profile/styles";
import Spacer from "../../components/Spacer";
import ProfilePanel from "./profile/ProfilePanel";
import ProfileSection from "./profile/ProfileSection";

function Profile() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [section, setSection] = useState("apiKey");

  if (!isLoggedIn) {
    return <Redirect to="/account/authenticate" />;
  }

  return (
    <RefreshApiKey>
      <ProfileContainer>
        <Spacer height="3rem" />
        <ProfilePanel currentSection={section} onSelect={setSection} />
        <Spacer width="2rem" />
        <ProfileSection section={section} />
      </ProfileContainer>
    </RefreshApiKey>
  );
}

export default Profile;
