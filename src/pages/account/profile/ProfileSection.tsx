import React from "react";
import Email from "./profile-section/Email";
import Password from "./profile-section/Password";
import ApiKey from "./profile-section/ApiKey";

interface IProfileSectionProps {
  section: string;
}

function ProfileSection({ section }: IProfileSectionProps) {
  switch (section) {
    case "email":
      return <Email />;
    case "password":
      return <Password />;
    case "apiKey":
      return <ApiKey></ApiKey>;
    default:
      return <p>Invalid section.</p>;
  }
}

export default ProfileSection;
