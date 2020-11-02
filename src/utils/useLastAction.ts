import { useEffect } from "react";
import { useSelector } from "react-redux";
import useDidChange from "./useDidChange";
import { selectLastAction } from "../modules/lastAction";

export default function useLastAction(
  types: string | string[],
  callback: Function
) {
  const lastAction = useSelector(selectLastAction);
  const didChange = useDidChange(lastAction);
  useEffect(() => {
    if (!didChange) {
      return;
    }

    if (typeof types === "string") {
      if (types === lastAction.type!) {
        callback(lastAction.payload);
      }
    } else {
      if (types.includes(lastAction.type!)) {
        callback(lastAction.payload);
      }
    }
  }, [lastAction, didChange, types, callback]);
}
