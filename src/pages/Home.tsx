import React from "react";
import Spacer from "../components/Spacer";

const codeSnippet = `for i = 0 to length(lotsOfFiles) - 1
  doExpensiveCalculation(lotsOfFiles[i])
  if (i mod 10 == 0) 
    sendPostRequest(alerhaApiUrl, "I'm working on file " + string(i)) 
sendPostRequest(alerhaApiUrl, "I'm now finished")`;

function Home() {
  return (
    <div
      style={{
        margin: "1rem auto",
        padding: "1rem",
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Welcome to Alerha!</h2>
      <Spacer height={"2rem"} />
      <div>
        <h4>What is Alerha?</h4>
        <p>
          {`
        Alerha is a dead simple way to send real-time messages to yourself through post requests.
        `}
        </p>
      </div>
      <Spacer height={"1rem"} />
      <div>
        <h4>How do I get started?</h4>
        <ul style={{ listStyle: "none" }}>
          <li>
            1. <a href="/account">Create an account.</a>
          </li>
          <li>
            2. Navigate to the{" "}
            <span style={{ fontStyle: "italic" }}>Api Key</span> section in your{" "}
            <span style={{ fontStyle: "italic" }}>
              <a href="/account">Account</a>
            </span>{" "}
            page and then click on{" "}
            <span style={{ fontStyle: "italic" }}>Generate an api key</span>.
          </li>
          <li>
            3. You can now send POST requests to{" "}
            <span
              style={{ fontStyle: "italic" }}
            >{`https://api.alerha.com/notification/message?apiKey=<YOUR KEY>`}</span>{" "}
            with a JSON body in the format{" "}
            <span
              style={{ fontStyle: "italic" }}
            >{`"{"message": "<YOUR MESSAGE>"}"`}</span>{" "}
            . (Without the carets).
          </li>
          <li>
            4. View your messages in real-time in the{" "}
            <span style={{ fontStyle: "italic" }}>
              <a href="/message">Messages</a>
            </span>{" "}
            page.
          </li>
        </ul>
      </div>
      <Spacer height={"1rem"} />
      <div>
        <h4>Why was Alerha made?</h4>
        <p style={{ marginBottom: "0" }}>
          Coming from a scientific background, computations can take an
          incredibly long time, especially those requiring to process hundreds
          of files or train for thousands of iterations. Alerha allowed me (the
          author) to keep track of where these projects were at and when they
          were finished. For example, I would do something like this:{" "}
        </p>
        <div>
          <pre
            style={{
              borderRadius: "3px",
              padding: ".5rem",
              backgroundColor: "#616161",
              color: "white",
              width: "100%",
              fontSize: ".7rem",
              margin: "1rem auto 1rem auto",
              overflowX: "scroll",
            }}
          >
            {codeSnippet}
          </pre>
        </div>
      </div>
      <Spacer height={"1rem"} />
      <div>
        <h4>What tools and techniques make up Alerha?</h4>
        Front End:
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>Styled Components</li>
          <li>Ant Design</li>
        </ul>
        Back End:
        <ul>
          <li>Node</li>
          <li>Express</li>
          <li>Socket.IO</li>
          <li>MongoDB</li>
          <li>Nginx</li>
          <li>Docker</li>
        </ul>
        Other:
        <ul>
          <li>JWT + refresh tokens</li>
        </ul>
      </div>
      <Spacer height={"1rem"} />
      <div>
        <h4>Source:</h4>
        <ul>
          <li>
            <a
              href="https://github.com/z0BI7z/alerha-client"
              target={"_blank"}
              rel="noreferrer"
            >
              client
            </a>
          </li>
          <li>
            <a
              href="https://github.com/z0BI7z/alerha-server"
              target={"_blank"}
              rel="noreferrer"
            >
              server
            </a>
          </li>
          <li>
            <a
              href="https://github.com/z0BI7z/alerha-deploy"
              target={"_blank"}
              rel="noreferrer"
            >
              deployment
            </a>
          </li>
        </ul>
      </div>
      <Spacer height="5rem" />
    </div>
  );
}

export default Home;
