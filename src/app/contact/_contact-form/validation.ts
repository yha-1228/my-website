import { z } from "zod";

import { errorMessages } from "@/form/error-messages";
import { keysOf } from "@/utils/object/keys-of";

export const MESSAGE_MAX_LENGTH = 1000;

export const contactFormSchema = z.object({
  /**
   * お名前
   *
   * @description 必須
   */
  name: z.string().min(1, { message: errorMessages.required() }),

  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: z
    .string()
    .min(1, { message: errorMessages.required() })
    .email({ message: errorMessages.isEmail() }),

  /**
   * 会社名
   *
   * @description 任意, 入力された場合は100文字以内
   */
  companyName: z
    .string()
    .min(1)
    .max(100, { message: errorMessages.isLength({ max: 100 }) })
    .or(z.literal("")),

  /**
   * お問い合わせ内容
   *
   * @description 必須, 10文字以上, 10000文字以内
   */
  message: z
    .string()
    .min(1, { message: errorMessages.required() })
    .min(10, { message: errorMessages.isLength({ min: 10 }) })
    .max(MESSAGE_MAX_LENGTH, {
      message: errorMessages.isLength({ max: MESSAGE_MAX_LENGTH }),
    }),
});

export const contactFormKeys = keysOf(contactFormSchema.shape);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
