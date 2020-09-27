import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store, persistor } from "./modules/store";
import RefreshLogin from "./components/RefreshLogin";
import MainNavBar from "./components/MainNavBar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Messages from "./pages/Messages";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <RefreshLogin>
          <MainNavBar />
          <BrowserRouter>
            <Switch>
              <Route path="/account" component={Account} />
              <Route path="/message" component={Messages} />
              <Route exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </RefreshLogin>
      </PersistGate>
    </Provider>
  );
}

export default App;
