import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendContact } from '@/api/requests';
import * as m from '@/form/message';
import * as v from '@/form/validator';
import isEmptyObject from '@/utils/is-empty-object';
import { Button } from './ui/button';
import Container from './ui/container';
import Heading1 from './ui/heading1';
import { Input, Textarea } from './ui/input';

type FieldType = HTMLInputElement | HTMLTextAreaElement;

type ContactFormValues = {
  /**
   * お名前
   *
   * @description 必須
   */
  name: string;
  /**
   * メールアドレス
   *
   * @description 必須, Eメール
   */
  email: string;
  /**
   * お問い合わせ内容
   *
   * @description 10文字以上
   */
  message: string;
};

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

type ContactFormErrors = { [k in keyof ContactFormValues]?: string };

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!v.exists(values.name)) {
    errors.name = m.required;
  }

  if (!v.exists(values.email)) {
    errors.email = m.required;
  } else if (!v.isEmail(values.email)) {
    errors.email = m.email;
  }

  if (!v.isLength(values.message, { min: 10 })) {
    errors.message = m.length({ min: 10 });
  }

  return errors;
}

type ContactFormTouched = { [k in keyof ContactFormValues]: boolean };

const initialTouched: ContactFormTouched = {
  name: false,
  email: false,
  message: false,
};

const FORM_NAME = 'contact';

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const errors = validate(values);

  const [touched, setTouched] = useState(initialTouched);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<FieldType>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<FieldType>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      await sendContact(FORM_NAME, values);
      toast('done');
      setValues(initialValues);
      setTouched(initialTouched);
    } catch (error) {
      toast('fail');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <Container>
        <section className="space-y-6">
          <Heading1>お問い合わせ</Heading1>
          <form
            onSubmit={handleSubmit}
            name={FORM_NAME}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="space-y-5">
              <div>
                <div>
                  <label htmlFor="name">お名前</label>
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!(errors.name && touched.name)}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <div>
                  <label htmlFor="email">メールアドレス</label>
                </div>
                <div className="mt-2">
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!(errors.email && touched.email)}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <div>
                  <label htmlFor="message">お問い合わせ内容</label>
                </div>
                <div className="mt-2">
                  <Textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    isError={!!(errors.message && touched.message)}
                  />
                </div>
                {errors.message && touched.message ? (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                ) : null}
              </div>
              <div>
                <Button
                  disabled={!isEmptyObject(errors) || submitting}
                  className="w-full lg:w-60"
                >
                  {submitting ? '送信中...' : '送信する'}
                </Button>
              </div>
            </div>
          </form>
        </section>
      </Container>
    </div>
  );
}
