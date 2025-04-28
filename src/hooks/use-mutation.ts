import { useReducer } from "react";

import { type AnyAsyncFunction } from "@/types/utils";
import { assertNever } from "@/utils/misc";

interface UseMutationProps<TAction extends AnyAsyncFunction> {
  fn: TAction;
  onSuccess?: (
    result: Awaited<ReturnType<TAction>>,
    ...args: Parameters<TAction>
  ) => void;
  onError?: (error: unknown, ...args: Parameters<TAction>) => void;
}

interface UseMutationState<TError extends Error = Error> {
  pending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | undefined;
}

const initialState: UseMutationState = {
  pending: false,
  isSuccess: false,
  isError: false,
  error: undefined,
};

type Action<TError extends Error> =
  | { type: "pending" }
  | { type: "success" }
  | { type: "error"; error: TError }
  | { type: "reset" };

function reducer<TError extends Error>(
  _: UseMutationState<TError>,
  action: Action<TError>,
): UseMutationState<TError> {
  switch (action.type) {
    case "pending": {
      return {
        pending: true,
        isSuccess: false,
        isError: false,
        error: undefined,
      };
    }

    case "success": {
      return {
        pending: false,
        isSuccess: true,
        isError: false,
        error: undefined,
      };
    }

    case "error": {
      return {
        pending: false,
        isSuccess: false,
        isError: true,
        error: action.error,
      };
    }

    case "reset": {
      return initialState as UseMutationState<TError>;
    }

    default:
      return assertNever(action);
  }
}

interface UseMutationReturn<
  TAction extends AnyAsyncFunction,
  TError extends Error,
> {
  mutate: (...args: Parameters<TAction>) => Promise<void>;
  reset: () => void;
  pending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | undefined;
}

function useMutation<
  TAction extends AnyAsyncFunction,
  TError extends Error = Error,
>(props: UseMutationProps<TAction>): UseMutationReturn<TAction, TError> {
  const { fn, onSuccess, onError } = props;
  const [state, dispatch] = useReducer(
    reducer,
    initialState as UseMutationState<TError>,
  );

  const mutate = async (...args: Parameters<TAction>) => {
    dispatch({ type: "pending" });

    try {
      const result = await fn(...args);
      onSuccess?.(result, ...args);
      dispatch({ type: "success" });
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error, ...args);
        dispatch({ type: "error", error: error as TError });
      } else {
        throw error;
      }
    }
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return { ...state, mutate, reset };
}

export { useMutation };
export type { UseMutationProps, UseMutationState, UseMutationReturn };
