import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncFunction = (...args: any[]) => Promise<any>;

interface UseAsyncFunctionProps<T extends AnyAsyncFunction> {
  fn: T;
  onSuccess?: (result: Awaited<ReturnType<T>>) => void;
  onError?: (error: Error) => void;
}

function useAsyncFunction<T extends AnyAsyncFunction>(
  props: UseAsyncFunctionProps<T>,
) {
  const { fn, onSuccess, onError } = props;

  const [state, setState] = useState({
    isPending: false,
    isSuccess: false,
    isError: false,
  });

  const handleMutate = async (...args: Parameters<T>) => {
    setState((prev) => ({ ...prev, isPending: true }));

    try {
      const result = (await fn(...args)) as Awaited<ReturnType<T>>;
      onSuccess?.(result);
      setState((prev) => ({ ...prev, isSuccess: true, isError: false }));
    } catch (error) {
      onError?.(error as Error);
      setState((prev) => ({ ...prev, isSuccess: false, isError: true }));
    } finally {
      setState((prev) => ({ ...prev, isPending: false }));
    }
  };

  return { ...state, handleMutate };
}

export { useAsyncFunction };
export type { UseAsyncFunctionProps };
