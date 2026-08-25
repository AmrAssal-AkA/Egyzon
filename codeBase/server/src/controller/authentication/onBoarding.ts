import { Request, Response } from "express";

import Customer from "../../models/customerModel";
import { sendErrorResponse , sendSuccessResponse } from "../../utils/Responses";
import { AppError } from "../../utils/AppError";

const onBoarding = async (req: Request, res: Response) => {
  try{
  const userId = req.user?.userId || (process.env.NODE_ENV !== "production" && req.body?.userId);
  const { phoneNumber, address } = req.body;
  if (!userId) return sendErrorResponse(res, 401, "Unauthorized", "Missing user id");

  const customer = await Customer.findById(userId);
  if (!customer) return sendErrorResponse(res, 404, "User not found", "User not found");
  if(customer.completedOnboarding)return sendErrorResponse(res, 400, "User is already onboarded", "User is already onboarded");

  customer.phoneNumber = phoneNumber;
  customer.address = Array.isArray(address) ? address : [address];
  customer.completedOnboarding = true;
  await customer.save();
  return sendSuccessResponse(res, 200, "Onboarding completed successfully", {
    customerId: customer._id,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
  });
}catch (error) {
  console.error("Onboarding failed:", error);
  if ((error as { code?: number })?.code === 11000) {
    return sendErrorResponse(res, 409, "Phone number is already in use", error);
  }
  if (error instanceof AppError) {
    return sendErrorResponse(res, error.statusCode, error.message);
  } else {
    return sendErrorResponse(res, 500, "Internal Server Error", error);
  }
}
};

export default onBoarding;
