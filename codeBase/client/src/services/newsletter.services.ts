import axios from "axios";

import { apiClient } from "@/lib/apiClient";
import { SubscribeNewsletterRequest, SubscribeNewsletterResponse } from "@/types/newsletter.type";

export const subscribeNewsletter = async (
    data: SubscribeNewsletterRequest
): Promise<SubscribeNewsletterResponse> => {
    try {
        const response = await apiClient.post<SubscribeNewsletterResponse>("/api/newsletter/subscribe", data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data?.message || "Failed to subscribe to the newsletter"
            );
        }
        throw new Error("Failed to subscribe to the newsletter");
    }
};