import { useReducer } from "react";
import { type AnyAsyncFunction } from "@/types/utils";
import { assertNever } from "@/utils/assert-never";

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
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: TError | undefined;
}

const initialState: UseMutationState = {
  pending: true,
  loading: false,
  isSuccess: false,
  isError: false,
  error: undefined,
};

type Action<TError extends Error> =
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; error: TError }
  | { type: "reset" };

function reducer<TError extends Error>(
  _: UseMutationState<TError>,
  action: Action<TError>,
): UseMutationState<TError> {
  switch (action.type) {
    case "loading": {
      return {
        pending: false,
        loading: true,
        isSuccess: false,
        isError: false,
        error: undefined,
      };
    }

    case "success": {
      return {
        pending: false,
        loading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
      };
    }

    case "error": {
      return {
        pending: false,
        loading: false,
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

type UseMutationReturn<
  TAction extends AnyAsyncFunction,
  TError extends Error,
> = readonly [
  UseMutationState<TError>,
  (...args: Parameters<TAction>) => Promise<void>,
  () => void,
];

function useMutation<
  TAction extends AnyAsyncFunction,
  TError extends Error = Error,
>(props: UseMutationProps<TAction>): UseMutationReturn<TAction, TError> {
  const { fn, onSuccess, onError } = props;
  const [state, dispatch] = useReducer<typeof reducer<TError>>(
    reducer,
    initialState as UseMutationState<TError>,
  );

  const handleAction = async (...args: Parameters<TAction>) => {
    dispatch({ type: "loading" });

    try {
      const result = await fn(...args);
      onSuccess?.(result, ...args);
      dispatch({ type: "success" });
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error, ...args);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch({ type: "error", error });
      } else {
        throw error;
      }
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return [state, handleAction, handleReset] as const;
}

export { useMutation };
export type { UseMutationProps, UseMutationState, UseMutationReturn };
