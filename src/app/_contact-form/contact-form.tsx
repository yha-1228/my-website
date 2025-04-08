"use client";

import { Button } from "@/components/ui/styled/button";
import { CONTACT_FORM_NAME } from "@/constants";

export function ContactForm() {
  return (
    <div>
      <form
        name={CONTACT_FORM_NAME}
        encType="multipart/form-data"
        data-netlify="true"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.target as HTMLFormElement);

          await fetch("/__forms.html", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            // @ts-expect-error err
            body: new URLSearchParams(formData).toString(),
          })
            .then(() => {
              alert("Done!");
            })
            .catch(() => {
              alert("Error!");
            });
        }}
      >
        <p>
          <label>
            <span>Name:</span>
            <input name="name" type="text" />
          </label>
        </p>

        <p>
          <label>
            <span>Add file:</span>
            <input name="fileAttachment" type="file" />
          </label>
        </p>
        <Button>Submit</Button>
      </form>
    </div>
  );
}
