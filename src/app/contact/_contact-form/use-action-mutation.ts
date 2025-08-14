import { useActionState } from "react";

interface ActionMutationState {
  isSuccess: boolean;
  isError: boolean;
}

interface UseActionMutationProps<Payload, Result> {
  fn: (payload: Payload) => Promise<Result>;
  onSuccess?: (result: Result) => void;
  onError?: (error: Error) => void;
}

interface UseActionMutationReturn<Payload> {
  pending: boolean;
  isSuccess: boolean;
  isError: boolean;
  mutate: (payload: Payload) => void;
}

/**
 * `useActionState`を次のようにラップしたフック。
 *
 * - 成功・失敗時のコールバックを差し込める
 * - オブジェクトで値を返し、キーで判別しやすくする
 */
function useActionMutation<Payload, Result>(
  props: UseActionMutationProps<Payload, Result>,
): UseActionMutationReturn<Payload> {
  const { fn, onSuccess, onError } = props;

  const [state, formAction, pending] = useActionState<
    ActionMutationState,
    Payload
  >(
    async function (_, payload) {
      try {
        const result = await fn(payload);
        onSuccess?.(result);
        return { isSuccess: true, isError: false };
      } catch (error) {
        onError?.(error as Error);
        return { isSuccess: false, isError: true };
      }
    },
    { isSuccess: false, isError: false },
  );

  return {
    pending,
    isSuccess: state.isSuccess,
    isError: state.isError,
    mutate: formAction,
  };
}

export { useActionMutation };
