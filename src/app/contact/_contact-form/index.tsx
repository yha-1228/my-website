"use client";

import { type ChangeEvent, type FocusEvent, useState } from "react";

import { submitHubspotForm } from "@/actions/hubspot";
import { type SubmitHubspotFormRequestBody } from "@/api/models/hubspot";
import { Button } from "@/components/ui/styled/button";
import { TextLink } from "@/components/ui/styled/text-link";
import { routes } from "@/routes";
import { entriesOf } from "@/utils/object";
import { cn, getCSSVar, remToPx } from "@/utils/styling";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldProvider,
} from "./headless-ui/field";
import { Form } from "./headless-ui/form";
import { NoSSR } from "./no-ssr";
import { fromEntries, keysOf, mapObject } from "./object-utils";
import { type HTMLElementHasNameAndValue } from "./react-utils";
import { scrollWithFocus } from "./scroll-with-focus";
import { Alert } from "./ui/alert";
import { Input, InputLengthCounter, Textarea } from "./ui/field";
import { FormErrorMessage } from "./ui/form-error-message";
import {
  FormErrorSummaryItem,
  FormErrorSummaryList,
} from "./ui/form-error-summary";
import { FormHelperText } from "./ui/form-helper-text";
import { Label } from "./ui/label";
import { useActionMutation } from "./use-action-mutation";
import { useBeforeUnload } from "./use-beforeunload";
import {
  contactFormSchema,
  type ContactFormValues,
  MESSAGE_MAX_LENGTH,
} from "./validation";
import { getKeyErrorMessageMap } from "./zod-utils";

// state definition
// ----------------------------------------

interface FormState {
  values: ContactFormValues;
  touched: { [key in keyof ContactFormValues]: boolean };
  submitPressedWithError: boolean;
}

const keys = keysOf(contactFormSchema.shape);

const initialFormState: FormState = {
  values: { name: "", email: "", companyName: "", message: "" },
  touched: fromEntries(keys.map((key) => [key, false])),
  submitPressedWithError: false,
};

function getErrors(formState: FormState) {
  const errors = getKeyErrorMessageMap(
    contactFormSchema.safeParse(formState.values),
  );
  return errors;
}

// constants, helpers
// ----------------------------------------

const keyLabelMap = {
  name: "お名前",
  email: "メールアドレス",
  companyName: "会社名",
  message: "お問い合わせ内容",
} as const satisfies { [key in keyof ContactFormValues]: string };

function showError(name: keyof ContactFormValues, formState: FormState) {
  const errors = getErrors(formState);
  return !!(errors[name] && formState.touched[name]);
}

// export
// ----------------------------------------

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const errors = getErrors(formState);

  const submitMutation = useActionMutation({
    fn: (data: ContactFormValues) => {
      const request: SubmitHubspotFormRequestBody = {
        fields: [
          { objectTypeId: "0-1", name: "fullname", value: data.name },
          { objectTypeId: "0-1", name: "email", value: data.email },
          { objectTypeId: "0-1", name: "company", value: data.companyName },
          { objectTypeId: "0-1", name: "message", value: data.message },
        ],
      };

      return submitHubspotForm(request);
    },
    onSuccess: () => {
      setFormState(initialFormState);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLElementHasNameAndValue>) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [event.target.name]: event.target.value },
    }));
  };

  const handleBlur = (event: FocusEvent<HTMLElementHasNameAndValue>) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [event.target.name]: true },
    }));
  };

  const handleErrorListItemClick = (key: keyof ContactFormValues) => {
    const labelElem = document.querySelector(`label[data-key="${key}"]`);
    if (!(labelElem instanceof HTMLElement)) return;
    const labelY = labelElem.getBoundingClientRect().top;
    if (!labelY) return;

    const bufferMargin = remToPx(getCSSVar("--spacing")) * 4;

    const scrollToTop =
      window.scrollY +
      labelY -
      remToPx(getCSSVar("--height-header")) -
      bufferMargin;

    scrollWithFocus(labelElem, { top: scrollToTop });
  };

  const handleSubmit = (formData: FormData) => {
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        touched: mapObject(prev.values, () => true),
        submitPressedWithError: true,
      }));

      return;
    }

    const formValues = fromEntries(keys.map((key) => [key, formData.get(key)]));
    const validatedFormValues = contactFormSchema.parse(formValues);

    submitMutation.mutate(validatedFormValues);
  };

  useBeforeUnload({
    enabled: entriesOf(formState.values).some(
      ([key, value]) => value !== initialFormState.values[key],
    ),
  });

  const { values } = formState;

  return (
    <div
      className={cn(
        "lg:shadow-wide lg:rounded-xl lg:border lg:border-solid lg:border-gray-200 lg:bg-white lg:px-10 lg:pt-8 lg:pb-11",
      )}
    >
      <Form
        action={handleSubmit}
        allDisabled={submitMutation.pending}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="flex flex-col gap-y-6 md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-0">
          <FieldProvider isError={showError("name", formState)}>
            <div className="flex flex-col gap-2">
              <FieldLabel as={Label} data-key="name" required>
                {keyLabelMap.name}
              </FieldLabel>
              <Field
                as={Input}
                type="text"
                name="name"
                placeholder="田中 太郎"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FieldError as={FormErrorMessage}>{errors.name}</FieldError>
            </div>
          </FieldProvider>

          <FieldProvider isError={showError("email", formState)}>
            <div className="flex flex-col gap-2 md:col-span-2">
              <FieldLabel as={Label} data-key="email" required>
                {keyLabelMap.email}
              </FieldLabel>
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FieldError as={FormErrorMessage}>{errors.email}</FieldError>
            </div>
          </FieldProvider>
        </div>

        <FieldProvider isError={showError("companyName", formState)}>
          <div className="flex flex-col gap-2">
            <FieldLabel as={Label} data-key="companyName">
              {keyLabelMap.companyName}
            </FieldLabel>
            <Field
              as={Input}
              type="text"
              name="companyName"
              placeholder="株式会社ABC / 自営業"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError as={FormErrorMessage}>{errors.companyName}</FieldError>
          </div>
        </FieldProvider>

        <FieldProvider isError={showError("message", formState)}>
          <div className="flex flex-col gap-2">
            <FieldLabel as={Label} data-key="message" required>
              {keyLabelMap.message}
            </FieldLabel>
            <Field
              as={Textarea}
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={6}
            />
            <div>
              <FieldDescription
                as={FormHelperText}
                className="flex justify-between"
              >
                <span>10文字以上</span>
                <InputLengthCounter
                  currentLength={values.message.length}
                  maxLength={MESSAGE_MAX_LENGTH}
                />
              </FieldDescription>
              <FieldError as={FormErrorMessage}>{errors.message}</FieldError>
            </div>
          </div>
        </FieldProvider>

        {Object.keys(errors).length > 0 && formState.submitPressedWithError && (
          <FormErrorSummaryList
            className="my-10"
            heading={`${Object.values(errors).length}件の項目に問題があります。`}
          >
            {entriesOf(errors).map(([key, error]) => (
              <FormErrorSummaryItem
                key={key}
                label={keyLabelMap[key]}
                onClick={() => handleErrorListItemClick(key)}
              >
                {error}
              </FormErrorSummaryItem>
            ))}
          </FormErrorSummaryList>
        )}

        <NoSSR fallback={<Button className="block w-full" disabled />}>
          <Button
            className="w-full"
            loading={submitMutation.pending}
            loadingLabel="送信中..."
            size="lg"
          >
            送信する
          </Button>
        </NoSSR>
      </Form>

      {!submitMutation.pending && submitMutation.isSuccess && (
        <Alert
          className="mt-10"
          variant="success"
          heading="お問い合わせを送信しました"
        >
          <p>お返事まで今しばらくお待ちください。</p>
          <p>
            <TextLink
              href={routes.index.href}
              withUnderline
              className="font-bold"
            >
              ホームに戻る
            </TextLink>
          </p>
        </Alert>
      )}
      {!submitMutation.pending && submitMutation.isError && (
        <Alert className="mt-10" variant="error" heading="エラー">
          <p>お問い合わせの送信中にエラーが発生しました。</p>
        </Alert>
      )}
    </div>
  );
}
