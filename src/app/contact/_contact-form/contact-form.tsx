"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useId,
  useState,
} from "react";

import { sendNetlifyForm } from "@/api/clients/netlify";
import { Alert } from "@/components/ui/styled/alert";
import { Button } from "@/components/ui/styled/button";
import {
  Input,
  InputLengthCounter,
  Textarea,
} from "@/components/ui/styled/field";
import { FormErrorMessage } from "@/components/ui/styled/form-error-message";
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
import { IsClient } from "@/components/ui/unstyled/is-client";
import { CONTACT_FORM_NAME } from "@/constants";
import { useBeforeUnload } from "@/hooks/use-beforeunload";
import { useMutation } from "@/hooks/use-mutation";
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
  bottomErrorVisible: boolean;
}

const initialFormState: FormState = {
  values: { name: "", email: "", companyName: "", message: "" },
  touched: fromEntries(
    keysOf(contactFormSchema.shape).map((key) => [key, false]),
  ),
  bottomErrorVisible: false,
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

function createFieldId(id: string, key: keyof ContactFormValues) {
  return `${id}-${key}-field`;
}

function createLabelId(id: string, key: keyof ContactFormValues) {
  return `${id}-${key}-label`;
}

function showError(name: keyof ContactFormValues, formState: FormState) {
  const errors = getErrors(formState);
  return !!(errors[name] && formState.touched[name]);
}

// export
// ----------------------------------------

export function ContactForm() {
  const id = useId();

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const errors = getErrors(formState);

  const submitMutation = useMutation({
    fn: (data: ContactFormValues) => {
      return sendNetlifyForm({
        htmlFilepath: "/__forms.html",
        formName: CONTACT_FORM_NAME,
        data,
      });
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
    const labelId = createLabelId(id, key);
    const labelElem = document.getElementById(labelId);
    const labelY = labelElem?.getBoundingClientRect().top;
    if (!labelY) return;

    const bufferMargin = 12;
    const scrollToTop =
      window.scrollY +
      labelY -
      remToPx(getCSSVar("--height-header")) -
      bufferMargin;

    scrollWithFocus({
      idToFocus: createFieldId(id, key),
      scrollToOptions: { top: scrollToTop },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        touched: mapObject(prev.values, () => true),
        bottomErrorVisible: true,
      }));

      return;
    }

    await submitMutation.mutate(formState.values);
  };

  useBeforeUnload({
    enabled: Object.values(formState.values).some((value) => value !== ""),
  });

  const { values } = formState;

  return (
    <div className="lg:border-base-light-200 lg:shadow-wide lg:rounded-xl lg:border lg:border-solid lg:bg-white lg:px-10 lg:pt-8 lg:pb-11">
      <Form
        onSubmit={handleSubmit}
        name={CONTACT_FORM_NAME}
        data-netlify="true"
        netlify-honeypot="bot-field"
        noValidate
        allDisabled={submitMutation.loading}
      >
        <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
        <div className="space-y-6">
          <div className="space-y-6 md:flex md:space-y-0 md:space-x-4">
            <FieldProvider
              whenError={showError("name", formState)}
              fieldId={createFieldId(id, "name")}
            >
              <div className="md:w-1/3">
                <FieldLabel as={Label} id={createLabelId(id, "name")} required>
                  {keyLabelMap.name}
                </FieldLabel>
                <Field
                  as={Input}
                  className="mt-2"
                  type="text"
                  name="name"
                  placeholder="田中 太郎"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={showError("name", formState)}
                />
                <FieldError as={FormErrorMessage} className="mt-2">
                  {errors.name}
                </FieldError>
              </div>
            </FieldProvider>

            <FieldProvider
              whenError={showError("email", formState)}
              fieldId={createFieldId(id, "email")}
            >
              <div className="md:w-2/3">
                <FieldLabel as={Label} id={createLabelId(id, "email")} required>
                  {keyLabelMap.email}
                </FieldLabel>
                <Field
                  as={Input}
                  className="mt-2"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={showError("email", formState)}
                />
                <FieldError as={FormErrorMessage} className="mt-2">
                  {errors.email}
                </FieldError>
              </div>
            </FieldProvider>
          </div>

          <FieldProvider
            whenError={showError("companyName", formState)}
            fieldId={createFieldId(id, "companyName")}
          >
            <div>
              <FieldLabel as={Label} id={createLabelId(id, "companyName")}>
                {keyLabelMap.companyName}
              </FieldLabel>
              <Field
                as={Input}
                className="mt-2"
                type="text"
                name="companyName"
                placeholder="株式会社ABC / 自営業"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={showError("companyName", formState)}
              />
              <FieldError as={FormErrorMessage} className="mt-2">
                {errors.companyName}
              </FieldError>
            </div>
          </FieldProvider>

          <FieldProvider
            whenError={showError("message", formState)}
            fieldId={createFieldId(id, "message")}
          >
            <div>
              <FieldLabel as={Label} id={createLabelId(id, "message")} required>
                {keyLabelMap.message}
              </FieldLabel>
              <Field
                as={Textarea}
                className="mt-2"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                invalid={showError("message", formState)}
              />
              <FieldDescription
                as={FormHelperText}
                className="mt-2 flex justify-between"
              >
                <span>10文字以上</span>
                <InputLengthCounter
                  currentLength={values.message.length}
                  maxLength={MESSAGE_MAX_LENGTH}
                />
              </FieldDescription>
              <FieldError as={FormErrorMessage}>{errors.message}</FieldError>
            </div>
          </FieldProvider>
        </div>

        {Object.keys(errors).length > 0 && formState.bottomErrorVisible && (
          <div className="bg-danger-600 border-l-danger-400 mt-9 mb-3 rounded-md border-l-[6px] py-4 pl-6">
            <div className="text-lg font-bold text-white">
              {`${Object.values(errors).length}件の項目に問題があります。`}
            </div>

            <ul className="mt-2 space-y-1 text-white/90 sm:list-disc sm:space-y-0.5 sm:pl-4">
              {entriesOf(errors).map(([key, error]) => (
                <li key={key} className="text-sm">
                  <span className="">{keyLabelMap[key]}:</span>
                  <br className="sm:hidden" />
                  <TextLink
                    href="/"
                    className="font-bold sm:ml-1"
                    withUnderline
                    preventLink
                    onClick={() => handleErrorListItemClick(key)}
                  >
                    {error}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <IsClient>
          {({ isClient }) => (
            <Button
              disabled={submitMutation.loading || !isClient}
              className="mt-6 w-full"
            >
              {!isClient ? (
                <>&nbsp;</>
              ) : submitMutation.loading ? (
                "送信中..."
              ) : (
                "送信する"
              )}
            </Button>
          )}
        </IsClient>
      </Form>
      {submitMutation.isSuccess && (
        <Alert
          className="mt-10"
          variant="success"
          alertTitle="お問い合わせを送信しました"
        >
          <p>お返事まで今しばらくお待ちください。</p>
          <p>
            <TextLink href="/" withUnderline className="font-bold">
              ホームに戻る
            </TextLink>
          </p>
        </Alert>
      )}
      {submitMutation.isError && (
        <Alert className="mt-10" variant="error" alertTitle="エラー">
          <p>お問い合わせの送信中にエラーが発生しました。</p>
        </Alert>
      )}
    </div>
  );
}
