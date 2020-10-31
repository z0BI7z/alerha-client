import { createSelector } from "reselect";
import { IState } from "./store";

export interface LastActionState {
  type: string | null;
  payload: any;
}

export interface LastActionAction {
  type: string;
  payload?: any;
}

const LAST_ACTION_INITIAL_STATE: LastActionState = {
  type: null,
  payload: null,
};

export function lastActionReducer(
  state = LAST_ACTION_INITIAL_STATE,
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
