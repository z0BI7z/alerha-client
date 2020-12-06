import { createSelector } from "reselect";
import { IState } from "./store";

export const NULL_ACTION = "NULL_ACTION";

export function clearLastAction() {
  return {
    type: NULL_ACTION,
  };
}

export interface LastActionState {
  type: string;
  payload: any;
}

export interface LastActionAction {
  type: string;
  payload?: any;
}

const LAST_ACTION_INITIAL_STATE: LastActionState = {
  type: NULL_ACTION,
  payload: null,
};

export function lastActionReducer(
  _state = LAST_ACTION_INITIAL_STATE,
  action: LastActionAction
) {
  if (!action.payload) {
    return {
      ...action,
      payload: null,
    };
  }
  return action;
}

export const selectLastAction = (state: IState) => state.lastAction;

export const selectLastActionType = createSelector(
  [selectLastAction],
  (lastAction) => lastAction.type
);

export const selectLastActionPayload = createSelector(
  [selectLastAction],
  (lastAction) => lastAction.payload
);
