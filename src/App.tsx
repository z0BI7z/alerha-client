import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store, persistor } from "./modules/store";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Messages from "./pages/Messages";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <div
          style={{
            margin: "1rem auto",
            maxWidth: "36rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <a href="/message">Messages</a>
          <a href="/account">Account</a>
        </div>
        <BrowserRouter>
          <Switch>
            <Route path="/account" component={Account} />
            <Route path="/message" component={Messages} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
