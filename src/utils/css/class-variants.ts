import { cn } from "./cn";

type VariantsConfig<TVariantsProps> = {
  [K in keyof Required<TVariantsProps>]: Required<TVariantsProps>[K] extends string
    ? Record<Required<TVariantsProps>[K], string>
    : never;
};

function classVariants<TVariantsProps>(
  common: string,
  config: VariantsConfig<TVariantsProps>,
) {
  return function (variants: TVariantsProps) {
    const classInputs = Object.entries(config).map(
      // @ts-expect-error ...
      ([key, value]) => value[variants[key]],
    );
    return cn(common, ...classInputs);
  };
}

export { classVariants };
