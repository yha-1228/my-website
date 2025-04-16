import { usePathname } from "next/navigation";
import { useEffect,useRef } from "react";

export function useOnRouteChange(callback: () => void) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const pathname = usePathname();

  useEffect(() => {
    savedCallback.current?.();
  }, [pathname]);
}
