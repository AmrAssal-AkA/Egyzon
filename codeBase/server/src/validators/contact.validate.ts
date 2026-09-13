import { z } from "zod";

import { sentizePlainText, sentizeRichText } from "../utils/senitize";
import { IContact } from "../types/contact.types";

export const contactSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .transform(sentizeRichText),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .transform(sentizePlainText),
    topic: z
      .string()
      .min(1, { message: "Topic is required" })
      .transform(sentizePlainText),
    message: z
      .string()
      .min(1, { message: "Message is required" })
      .transform(sentizeRichText),
  }),
});

export type ContactSchemaBody = z.infer<typeof contactSchema>["body"] &
  IContact;
