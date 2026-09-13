import axios from "axios";

import {apiClient} from "@/lib/apiClient";
import {ContactFormData, ContactResponse} from "@/types/contact.types";

export const contactService = {
    async sendContactForm(data: ContactFormData): Promise<ContactResponse> {
        try {
            const response = await apiClient.post("/api/contact/send-contact", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Internal Server Error");
            }
            throw new Error("Internal Server Error");
        }
    }
}

export const sendContact = await contactService.sendContactForm;