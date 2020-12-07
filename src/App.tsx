import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/ErrorBoundary";
import MainNavBar from "./components/MainNavBar";
import RefreshLogin from "./components/RefreshLogin";
import { persistor, store } from "./modules/store";
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
              <BrowserRouter>
                <MainNavBar />
                <Switch>
                  <Route path="/account" component={Account} />
                  <Route path="/message" component={Messages} />
                  <Route exact path="/" component={Home} />
                </Switch>
              </BrowserRouter>
            </RefreshLogin>
            <ToastContainer />
          </Suspense>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
