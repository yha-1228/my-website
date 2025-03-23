"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useId,
  useState,
} from "react";
import { sendNetlifyForm } from "@/api/clients/utils";
import { isFetchNetworkError } from "@/api/misc";
import { headerHeight } from "@/components/layouts/header";
import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { FormErrorMessage } from "@/components/ui/styled/form-error-message";
import { FormHelperText } from "@/components/ui/styled/form-helper-text";
import { Heading1 } from "@/components/ui/styled/heading1";
import {
  Input,
  InputLengthCounter,
  Textarea,
} from "@/components/ui/styled/input";
import { Label } from "@/components/ui/styled/label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldProvider,
} from "@/components/ui/unstyled/field";
import { IsClient } from "@/components/ui/unstyled/is-client";
import { CONTACT_FORM_NAME } from "@/constants";
import { useBeforeUnload } from "@/hooks/use-beforeunload";
import { useMutation } from "@/hooks/use-mutation";
import { getKeyErrorMessageMap } from "@/lib/zod/utils";
import { clsx } from "@/utils/css/clsx";
import { remToPx } from "@/utils/css/unit";
import { scrollWithFocus } from "@/utils/dom/utils";
import { entriesOf } from "@/utils/object/entries-of";
import { fromEntries } from "@/utils/object/from-entries";
import { mapObject } from "@/utils/object/map-object";
import { FeedbackNotification } from "./feedback-notification";
import { type FieldType } from "./types";
import {
  contactFormKeys,
  contactFormSchema,
  MESSAGE_MAX_LENGTH,
  type ContactFormValues,
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
  touched: fromEntries(contactFormKeys.map((key) => [key, false])),
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

const keyLabelMap: { [key in keyof ContactFormValues]: string } = {
  name: "お名前",
  email: "メールアドレス",
  companyName: "会社名",
  message: "お問い合わせ内容",
};

const feedbackText = {
  done: "お問い合わせありがとうございます。",
  networkError: "ネットワークに接続されていません。",
  fail: "送信中にエラーが発生しました。",
};

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

  const [submitState, submitAction, resetSubmitAction] = useMutation({
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

  const handleChange = (e: ChangeEvent<FieldType>) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [e.target.name]: e.target.value },
    }));
  };

  const handleBlur = (e: FocusEvent<FieldType>) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [e.target.name]: true },
    }));
  };

  const handleErrorListItemClick = (key: keyof ContactFormValues) => {
    const labelId = createLabelId(id, key);
    const labelElem = document.getElementById(labelId);
    const labelY = labelElem?.getBoundingClientRect().top;
    if (!labelY) return;

    const bufferMargin = 12;
    const scrollToTop =
      window.scrollY + labelY - remToPx(headerHeight) - bufferMargin;

    scrollWithFocus({
      idToFocus: createFieldId(id, key),
      scrollToOptions: { top: scrollToTop },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        touched: mapObject(prev.values, () => true),
        bottomErrorVisible: true,
      }));

      return;
    }

    await submitAction(formState.values);
  };

  useBeforeUnload({
    enabled: Object.values(formState.values).some((value) => value !== ""),
  });

  const { values } = formState;

  return (
    <div className="py-14 lg:pb-20">
      <Container>
        <Heading1>お問い合わせ</Heading1>

        <p className="mt-8 text-base-foreground-weak">
          お気軽にお問い合わせください。
          <br />
          <span aria-hidden="true" className="text-danger-500">
            * は必須項目です。
          </span>
        </p>

        <div
          className={clsx(
            "mt-10",
            "lg:rounded-xl lg:border lg:border-solid lg:border-base-light-200 lg:bg-white lg:px-10 lg:pb-11 lg:pt-8 lg:shadow-wide",
          )}
        >
          <form
            onSubmit={handleSubmit}
            name={CONTACT_FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div className="space-y-5 md:flex md:space-x-4 md:space-y-0">
                <FieldProvider
                  whenError={showError("name", formState)}
                  fieldId={createFieldId(id, "name")}
                >
                  <div className="md:w-1/3">
                    <FieldLabel
                      as={Label}
                      id={createLabelId(id, "name")}
                      required
                    >
                      {keyLabelMap.name}
                    </FieldLabel>
                    <div className="mt-2">
                      <Field
                        as={Input}
                        type="text"
                        name="name"
                        placeholder="田中 太郎"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={showError("name", formState)}
                      />
                    </div>
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
                    <FieldLabel
                      as={Label}
                      id={createLabelId(id, "email")}
                      required
                    >
                      {keyLabelMap.email}
                    </FieldLabel>
                    <div className="mt-2">
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={showError("email", formState)}
                      />
                    </div>
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
                  <div className="mt-2">
                    <Field
                      as={Input}
                      type="text"
                      name="companyName"
                      placeholder="株式会社ABC / 自営業"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={showError("companyName", formState)}
                    />
                  </div>
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
                  <FieldLabel
                    as={Label}
                    id={createLabelId(id, "message")}
                    required
                  >
                    {keyLabelMap.message}
                  </FieldLabel>
                  <div className="mt-2">
                    <Field
                      as={Textarea}
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      invalid={showError("message", formState)}
                    />
                  </div>
                  <div className="mt-2">
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
                    <FieldError as={FormErrorMessage}>
                      {errors.message}
                    </FieldError>
                  </div>
                </div>
              </FieldProvider>
            </div>

            <div className="mt-10 lg:mt-14">
              {Object.keys(errors).length > 0 &&
                formState.bottomErrorVisible && (
                  <div className="mb-5 border-t-4 border-solid border-t-danger-600 bg-danger-50 px-5 py-4 text-danger-600">
                    <div className="font-bold">
                      {Object.values(errors).length}件の項目に問題があります。
                    </div>
                    <ul className="mt-3 space-y-1.5 sm:space-y-0">
                      {entriesOf(errors).map(([key, error]) => (
                        <li key={key} className="text-sm sm:flex sm:space-x-1">
                          <div className="font-bold">
                            {keyLabelMap[key]}
                            <span className="hidden sm:inline">: </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleErrorListItemClick(key)}
                            className="text-left underline underline-offset-4"
                          >
                            {error}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <IsClient>
                {({ isClient }) => (
                  <Button
                    disabled={submitState.loading || !isClient}
                    className="w-full"
                  >
                    {submitState.loading ? "送信中..." : "送信する"}
                  </Button>
                )}
              </IsClient>
            </div>
          </form>
          {submitState.isSuccess && (
            <FeedbackNotification
              className="mt-10"
              variant="primary"
              onClose={resetSubmitAction}
            >
              {feedbackText.done}
            </FeedbackNotification>
          )}
          {submitState.isError && (
            <FeedbackNotification
              className="mt-10"
              variant="danger"
              onClose={resetSubmitAction}
            >
              {isFetchNetworkError(submitState.error)
                ? feedbackText.networkError
                : feedbackText.fail}
            </FeedbackNotification>
          )}
        </div>
      </Container>
    </div>
  );
}
