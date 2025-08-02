import { z } from "zod";

export const MESSAGE_MAX_LENGTH = 1000;

export const contactFormSchema = z.object({
  /**
   * お名前
   *
   * @description 必須
   */
  name: z.string().min(1, { message: "入力してください。" }),

  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: z
    .string()
    .min(1, { message: "入力してください。" })
    .email({ message: "メールアドレスの形式で入力してください。" }),

  /**
   * 会社名
   *
   * @description 任意, 入力された場合は100文字以内
   */
  companyName: z
    .string()
    .min(1)
    .max(100, { message: "100文字以下で入力してください。" })
    .or(z.literal("")),

  /**
   * お問い合わせ内容
   *
   * @description 必須, 10文字以上, 10000文字以内
   */
  message: z
    .string()
    .min(1, { message: "入力してください。" })
    .min(10, { message: "10文字以上で入力してください。" })
    .max(MESSAGE_MAX_LENGTH, {
      message: `${MESSAGE_MAX_LENGTH}文字以下で入力してください。`,
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
