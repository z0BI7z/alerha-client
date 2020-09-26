import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div
      style={{
        margin: "1rem auto",
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      Home
      <button onClick={() => history.push("/account")}>Account</button>
    </div>
  );
}

export default Home;
