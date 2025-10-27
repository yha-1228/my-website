import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams(hash?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    const queryString = params.toString();

    const href = `${pathname}?${queryString}${hash ? `#${hash}` : ""}`;

    router.replace(href, { scroll: false });
  };

  return updateSearchParams;
}
