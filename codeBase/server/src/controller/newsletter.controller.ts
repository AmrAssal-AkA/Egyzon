import type { Request, Response } from 'express';

import Newsletter from '../models/newletter.model';
import { SubscribeNewsletterInput } from '../validators/newsletter.validate';
import { sendErrorResponse, sendSuccessResponse } from '../utils/Responses';
import {AppError} from '../utils/AppError';

export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as SubscribeNewsletterInput['body'];
    if (!email) {
      res.status(400).json({ message: 'Email is required.' });
      return;
    }

    // Check if the email is already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return sendErrorResponse(res, 400, 'Email is already subscribed to the newsletter.');
    }

    // Create a new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    return sendSuccessResponse(res, 201, 'Successfully subscribed to the newsletter.');
  } catch (error) {
    if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
    return sendErrorResponse(res, 500, 'An error occurred while subscribing to the newsletter.');
  }
};