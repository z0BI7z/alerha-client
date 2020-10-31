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
import { messagesReducer, IMessagesState, messagesSagas } from "./messages";
import { lastActionReducer, LastActionState } from "./lastAction";

export interface IState {
  user: IUserState;
  messages: IMessagesState;
  lastAction: LastActionState;
}

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  lastAction: lastActionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["messages"],
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
  yield all([call(userSagas), call(messagesSagas)]);
}

sagaMiddleware.run(rootSaga);
