import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import { userReducer, IUserState, userSagas } from "./user";

export interface IState {
  user: IUserState;
}

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
middleware.push(sagaMiddleware);

export const store = createStore(
  persistedRootReducer,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store as any);

function* rootSaga() {
  yield all([call(userSagas)]);
}

sagaMiddleware.run(rootSaga);
