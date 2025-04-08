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
        onSubmit={(event) => {
          event.preventDefault();

          fetch("/", {
            body: new FormData(event.target as HTMLFormElement),
            method: "POST",
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
            <span>Add file:</span>
            <input name="fileAttachment" type="file" />
          </label>
        </p>
        <Button>Submit</Button>
      </form>
    </div>
  );
}
