import {
  takeLatest,
  takeEvery,
  call,
  put,
  select,
  all,
} from "redux-saga/effects";
import { createSelector } from "reselect";
import axios from "axios";
import moment from "moment";
import { IState } from "./store";
import { selectApiKey, selectToken, ensureValidToken } from "./user";
import { API_URL } from "../config";

export interface IMessage {
  _id: string;
  message: string;
  createdAt: string;
  unResolved?: boolean;
}

// --- ACTION TYPES ---

export const CREATE_MESSAGE_START = "CREATE_MESSAGE_START";
export const CREATE_MESSAGE_PENDING = "CREATE_MESSAGE_PENDING";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_FAILURE = "CREATE_MESSAGE_FAILURE";

export const FETCH_MESSAGES_START = "FETCH_MESSAGES_START";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const FETCH_MORE_MESSAGES_START = "FETCH_MORE_MESSAGES_START";
export const FETCH_MORE_MESSAGES_SUCCESS = "FETCH_MORE_MESSAGES_SUCCESS";
export const FETCH_MORE_MESSAGES_FAILURE = "FETCH_MORE_MESSAGES_FAILURE";

export const ADD_MESSAGE_START = "ADD_MESSAGE_START";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";

export const DELETE_MESSAGES_START = "DELETE_MESSAGES_START";
export const DELETE_MESSAGES_SUCCESS = "DELETE_MESSAGES_SUCCESS";
export const DELETE_MESSAGES_FAILURE = "DELETE_MESSAGES_FAILURE";

// --- ACTION CREATORS ---

// Create Message
export function createMessageStart(message: string) {
  return {
    type: CREATE_MESSAGE_START as typeof CREATE_MESSAGE_START,
    payload: message,
  };
}

export function createMessagePending(message: IMessage) {
  return {
    type: CREATE_MESSAGE_PENDING as typeof CREATE_MESSAGE_PENDING,
    payload: message,
  };
}

export function createMessageSuccess() {
  return {
    type: CREATE_MESSAGE_SUCCESS as typeof CREATE_MESSAGE_SUCCESS,
  };
}

export function createMessageFailure({
  error,
  tempId,
}: {
  error: Error;
  tempId?: string;
}) {
  return {
    type: CREATE_MESSAGE_FAILURE as typeof CREATE_MESSAGE_FAILURE,
    payload: {
      error,
      tempId,
    },
  };
}

// Fetch Messages
export function fetchMessagesStart() {
  return {
    type: FETCH_MESSAGES_START as typeof FETCH_MESSAGES_START,
  };
}

export function fetchMessagesSuccess(messages: IMessage[]) {
  return {
    type: FETCH_MESSAGES_SUCCESS as typeof FETCH_MESSAGES_SUCCESS,
    payload: messages,
  };
}

export function fetchMessagesFailure(error: Error) {
  return {
    type: FETCH_MESSAGES_FAILURE as typeof FETCH_MESSAGES_FAILURE,
    payload: error,
  };
}

// Fetch More Messages
export function fetchMoreMessagesStart(skip: number) {
  return {
    type: FETCH_MORE_MESSAGES_START as typeof FETCH_MORE_MESSAGES_START,
    payload: skip,
  };
}

export function fetchMoreMessagesSuccess(messages: IMessage[]) {
  return {
    type: FETCH_MORE_MESSAGES_SUCCESS as typeof FETCH_MORE_MESSAGES_SUCCESS,
    payload: messages,
  };
}

export function fetchMoreMessagesFailure(error: Error) {
  return {
    type: FETCH_MORE_MESSAGES_FAILURE as typeof FETCH_MORE_MESSAGES_FAILURE,
    payload: error,
  };
}

// Add Message
export function addMessageStart({
  message,
  tempId,
}: {
  message: IMessageResponse;
  tempId?: string;
}) {
  return {
    type: ADD_MESSAGE_START as typeof ADD_MESSAGE_START,
    payload: {
      message,
      tempId,
    },
  };
}

export function addMessageSuccess({
  message,
  tempId,
}: {
  message: IMessageResponse;
  tempId?: string;
}) {
  return {
    type: ADD_MESSAGE_SUCCESS as typeof ADD_MESSAGE_SUCCESS,
    payload: {
      message,
      tempId,
    },
  };
}

export function addMessageFailure(error: Error) {
  return {
    type: ADD_MESSAGE_SUCCESS as typeof ADD_MESSAGE_FAILURE,
    payload: error,
  };
}

// Delete Messages
export function deleteMessagesStart(date?: string) {
  return {
    type: DELETE_MESSAGES_START as typeof DELETE_MESSAGES_START,
    payload: date,
  };
}

export function deleteMessagesSuccess() {
  return {
    type: DELETE_MESSAGES_SUCCESS as typeof DELETE_MESSAGES_SUCCESS,
  };
}

export function deleteMessagesFailure() {
  return {
    type: DELETE_MESSAGES_FAILURE as typeof DELETE_MESSAGES_FAILURE,
  };
}

// Action Creator Return Types
type CreateMessageStartAction = ReturnType<typeof createMessageStart>;
type CreateMessagePendingAction = ReturnType<typeof createMessagePending>;
type CreateMessageSuccessAction = ReturnType<typeof createMessageSuccess>;
type CreateMessageFailureAction = ReturnType<typeof createMessageFailure>;
type FetchMessagesStartAction = ReturnType<typeof fetchMessagesStart>;
type FetchMessagesSuccessAction = ReturnType<typeof fetchMessagesSuccess>;
type FetchMessagesFailureAction = ReturnType<typeof fetchMessagesFailure>;
type FetchMoreMessagesStartAction = ReturnType<typeof fetchMoreMessagesStart>;
type FetchMoreMessagesSuccessAction = ReturnType<
  typeof fetchMoreMessagesSuccess
>;
type FetchMoreMessagesFailureAction = ReturnType<
  typeof fetchMoreMessagesFailure
>;
type AddMessageStartAction = ReturnType<typeof addMessageStart>;
type AddMessageSuccessAction = ReturnType<typeof addMessageSuccess>;
type AddMessageFailureAction = ReturnType<typeof addMessageFailure>;
type DeleteMessagesStartAction = ReturnType<typeof deleteMessagesStart>;
type DeleteMessagesSuccessAction = ReturnType<typeof deleteMessagesSuccess>;
type DeleteMessagesFailureAction = ReturnType<typeof deleteMessagesFailure>;

type MessagesActions =
  | CreateMessageStartAction
  | CreateMessagePendingAction
  | CreateMessageSuccessAction
  | CreateMessageFailureAction
  | FetchMessagesStartAction
  | FetchMessagesSuccessAction
  | FetchMessagesFailureAction
  | FetchMoreMessagesStartAction
  | FetchMoreMessagesSuccessAction
  | FetchMoreMessagesFailureAction
  | AddMessageStartAction
  | AddMessageSuccessAction
  | AddMessageFailureAction
  | DeleteMessagesStartAction
  | DeleteMessagesSuccessAction
  | DeleteMessagesFailureAction;

// --- REDUCER ---

export type IMessagesState = IMessage[];

export const MESSAGES_INITIAL_STATE: IMessagesState = [];

export function messagesReducer(
  state = MESSAGES_INITIAL_STATE,
  action: MessagesActions
) {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return action.payload;
    case FETCH_MORE_MESSAGES_SUCCESS:
      return removeDuplicateMessages([...state, ...action.payload]);
    case CREATE_MESSAGE_PENDING:
      return [action.payload, ...state];
    case CREATE_MESSAGE_FAILURE:
      return state;
    case ADD_MESSAGE_SUCCESS:
      if (action.payload.tempId) {
        return resolveMessage(
          action.payload.tempId,
          action.payload.message,
          state
        );
      }
      return [action.payload.message, ...state];
    default:
      return state;
  }
}

// --- SELECTORS ---

export const selectMessages = (state: IState) => state.messages;

export const selectMessagesCount = createSelector(
  [selectMessages],
  (messages) => messages.length
);

// --- SAGAS ---

// Types
export interface IMessageResponse {
  _id: string;
  message: string;
  createdAt: string;
}
export interface ICreateMessageResponse {
  newMessage: IMessageResponse;
}

export interface IFetchMessagesResponse {
  messages: IMessage[];
}

// Create Message
export function* watchCreateMessageSaga() {
  yield takeEvery(CREATE_MESSAGE_START, createMessageSaga);
}

export function* createMessageSaga(action: CreateMessageStartAction) {
  const tempId = moment().toISOString();
  try {
    const pendingMessage: IMessage = {
      _id: tempId,
      message: action.payload,
      createdAt: tempId,
      unResolved: true,
    };
    yield put(createMessagePending(pendingMessage));

    const apiKey = yield select(selectApiKey);
    const url = `${API_URL}/notification/message?apiKey=${apiKey}&tempId=${tempId}`;
    yield call(axios.post, url, {
      message: action.payload,
    });

    yield put(createMessageSuccess());
  } catch (error) {
    yield put(createMessageFailure({ error, tempId }));
  }
}

// Fetch Messages
export function* watchFetchMessagesSaga() {
  yield takeLatest(FETCH_MESSAGES_START, fetchMessagesSaga);
}

export function* fetchMessagesSaga() {
  try {
    yield call(ensureValidToken);
    const token: ReturnType<typeof selectToken> = yield select(selectToken);

    const url = API_URL + "/notification/message";
    const response = yield call(axios.get, url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { messages }: IFetchMessagesResponse = response.data;
    yield put(fetchMessagesSuccess(messages));
  } catch (error) {
    yield put(fetchMessagesFailure(error));
  }
}

// Fetch Messages
export function* watchFetchMoreMessagesSaga() {
  yield takeLatest(FETCH_MORE_MESSAGES_START, fetchMoreMessagesSaga);
}

export function* fetchMoreMessagesSaga(action: FetchMoreMessagesStartAction) {
  try {
    yield call(ensureValidToken);
    const token: ReturnType<typeof selectToken> = yield select(selectToken);

    const url = `${API_URL}/notification/message?skip=${action.payload}`;
    const response = yield call(axios.get, url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { messages }: IFetchMessagesResponse = response.data;
    yield put(fetchMoreMessagesSuccess(messages));
  } catch (error) {
    yield put(fetchMoreMessagesFailure(error));
  }
}

// Add Message
export function* watchAddMessageSaga() {
  yield takeLatest(ADD_MESSAGE_START, addMessageSaga);
}

export function* addMessageSaga(action: AddMessageStartAction) {
  try {
    yield put(addMessageSuccess(action.payload));
  } catch (error) {
    yield put(addMessageFailure(error));
  }
}

// Delete Messages
export function* watchDeleteMessagesSaga() {
  yield takeLatest(DELETE_MESSAGES_START, deleteMessagesSaga);
}

export function* deleteMessagesSaga(action: DeleteMessagesStartAction) {
  try {
    yield call(ensureValidToken);
    const token: ReturnType<typeof selectToken> = yield select(selectToken);

    let url = `${API_URL}/notification/message`;
    if (action.payload) {
      url += `?date=${action.payload}`;
    }

    yield call(axios.delete, url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(deleteMessagesSuccess());
  } catch (error) {
    yield put(deleteMessagesFailure());
  }
}

export function* messagesSagas() {
  yield all([
    call(watchCreateMessageSaga),
    call(watchFetchMessagesSaga),
    call(watchFetchMoreMessagesSaga),
    call(watchAddMessageSaga),
    call(watchDeleteMessagesSaga),
  ]);
}

// --- UTILS ---

export function removeDuplicateMessages(messages: IMessage[]) {
  const seen = new Set();
  return messages.filter((message) => {
    if (seen.has(message._id)) {
      return false;
    }
    seen.add(message._id);
    return true;
  });
}

export function resolveMessage(
  tempId: string,
  resolvedMessage: IMessageResponse,
  messages: IMessage[]
) {
  let alreadyExists = false;
  let updatedMessages = messages.map((message) => {
    if (message._id === tempId) {
      alreadyExists = true;
      return {
        ...message,
        ...resolvedMessage,
        unResolved: false,
      };
    }
    return message;
  });
  if (alreadyExists) {
    updatedMessages = [resolvedMessage, ...messages];
  }
  return updatedMessages;
}
