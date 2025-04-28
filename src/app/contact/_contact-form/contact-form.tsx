"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  startTransition,
  useState,
} from "react";

import { submitHubspotForm } from "@/actions/hubspot";
import { type SubmitHubspotFormRequest } from "@/api/validation/hubspot";
import { Alert } from "@/components/ui/styled/alert";
import { Button } from "@/components/ui/styled/button";
import {
  Input,
  InputLengthCounter,
  Textarea,
} from "@/components/ui/styled/field";
import { FormErrorMessage } from "@/components/ui/styled/form-error-message";
import {
  FormErrorSummaryItem,
  FormErrorSummaryList,
} from "@/components/ui/styled/form-error-summary";
import { FormHelperText } from "@/components/ui/styled/form-helper-text";
import { Label } from "@/components/ui/styled/label";
import { TextLink } from "@/components/ui/styled/text-link";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldProvider,
} from "@/components/ui/unstyled/field";
import { Form } from "@/components/ui/unstyled/form";
import { NoSSR } from "@/components/ui/unstyled/no-ssr";
import { useActionMutation } from "@/hooks/use-action-mutation";
import { useBeforeUnload } from "@/hooks/use-beforeunload";
import { getKeyErrorMessageMap } from "@/lib/zod/utils";
import { type HTMLElementHasNameAndValue } from "@/types/react";
import { scrollWithFocus } from "@/utils/dom";
import { entriesOf, fromEntries, keysOf, mapObject } from "@/utils/object";
import { getCSSVar, remToPx } from "@/utils/styling";

import {
  contactFormSchema,
  type ContactFormValues,
  MESSAGE_MAX_LENGTH,
} from "./validation";

// state definition
// ----------------------------------------

interface FormState {
  values: ContactFormValues;
  touched: { [key in keyof ContactFormValues]: boolean };
  errorSummaryVisible: boolean;
}

const initialFormState: FormState = {
  values: { name: "", email: "", companyName: "", message: "" },
  touched: fromEntries(
    keysOf(contactFormSchema.shape).map((key) => [key, false]),
  ),
  errorSummaryVisible: false,
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
      const request: SubmitHubspotFormRequest["body"] = {
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

    const bufferMargin = 12;
    const scrollToTop =
      window.scrollY +
      labelY -
      remToPx(getCSSVar("--height-header")) -
      bufferMargin;

    scrollWithFocus(labelElem, { top: scrollToTop });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        touched: mapObject(prev.values, () => true),
        errorSummaryVisible: true,
      }));

      return;
    }

    startTransition(() => {
      submitMutation.mutate(values);
    });
  };

  useBeforeUnload({
    enabled: Object.values(formState.values).some((value) => value !== ""),
  });

  const { values } = formState;

  return (
    <div className="lg:border-base-light-200 lg:shadow-wide lg:rounded-xl lg:border lg:border-solid lg:bg-white lg:px-10 lg:pt-8 lg:pb-11">
      <Form
        onSubmit={handleSubmit}
        allDisabled={submitMutation.pending}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-6 md:flex md:space-y-0 md:space-x-4">
          <FieldProvider isError={showError("name", formState)}>
            {({ isError }) => (
              <div className="space-y-2 md:w-1/3">
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
                  invalid={isError}
                />
                <FieldError as={FormErrorMessage}>{errors.name}</FieldError>
              </div>
            )}
          </FieldProvider>

          <FieldProvider isError={showError("email", formState)}>
            {({ isError }) => (
              <div className="space-y-2 md:w-2/3">
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
                  invalid={isError}
                />
                <FieldError as={FormErrorMessage}>{errors.email}</FieldError>
              </div>
            )}
          </FieldProvider>
        </div>

        <FieldProvider isError={showError("companyName", formState)}>
          {({ isError }) => (
            <div className="space-y-2">
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
                invalid={isError}
              />
              <FieldError as={FormErrorMessage}>
                {errors.companyName}
              </FieldError>
            </div>
          )}
        </FieldProvider>

        <FieldProvider isError={showError("message", formState)}>
          {({ isError }) => (
            <div className="space-y-2">
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
                invalid={isError}
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
          )}
        </FieldProvider>

        {Object.keys(errors).length > 0 && formState.errorSummaryVisible && (
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
            <TextLink href="/" withUnderline className="font-bold">
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
