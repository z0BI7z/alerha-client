import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store, persistor } from "./modules/store";
import RefreshLogin from "./components/RefreshLogin";
import MainNavBar from "./components/MainNavBar";
const Home = lazy(() => import("./pages/Home"));
const Account = lazy(() => import("./pages/Account"));
const Messages = lazy(() => import("./pages/Messages"));

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Refreshing...</p>} persistor={persistor}>
        <ErrorBoundary>
          <Suspense fallback={<div></div>}>
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
          </Suspense>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
