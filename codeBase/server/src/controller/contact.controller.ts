import type { Request, Response } from "express";

import { Contact } from "../models/contact.model";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import { ContactSchemaBody } from "../validators/contact.validate";
import { AppError } from "../utils/AppError";

export const contactController = {
  async createContact(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, topic, message }: ContactSchemaBody = req.body;
      const newContact = new Contact({ fullName, email, topic, message });
      await newContact.save();
      sendSuccessResponse(res, 201, "Contact created successfully", newContact);
    } catch (error) {
      if (error instanceof AppError)
        return sendErrorResponse(res, error.statusCode, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.user?.userId;
      const isAdmin = req.user?.role === "admin";
      if (!adminId || !isAdmin ) return sendErrorResponse(res, 403, "Forbidden: You are not authorized to access this resource");
      const contacts = await Contact.find();
      sendSuccessResponse(res, 200, "Contacts retrieved successfully", contacts);
    }catch (error) {
        if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};
