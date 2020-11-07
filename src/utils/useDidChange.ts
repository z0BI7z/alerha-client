import usePrevious from "./usePrevious";

export default function useDidChange<T>(value: T): boolean {
  const prev = usePrevious(value);
  return value !== prev;
}
