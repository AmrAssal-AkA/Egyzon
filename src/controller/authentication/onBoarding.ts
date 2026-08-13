import { Request, Response } from "express";

import Customer from "../../models/customerModel";
import { sendErrorResponse , sendSuccessResponse } from "../../utils/Responses";
import { AppError } from "../../utils/AppError";

const onBoarding = async (req: Request, res: Response) => {
  try{
  const userId = req.user?.userId || (process.env.NODE_ENV !== "production" && req.body?.userId);
  const { phoneNumber, address } = req.body;

  const customer = await Customer.findById(userId);
  if (!customer) {
    return sendErrorResponse(res, 404, "User not found", "User not found");
  }

  if(customer.completedOnboarding)return sendErrorResponse(res, 400, "User is already onboarded", "User is already onboarded");


  customer.phoneNumber = phoneNumber;
  customer.address = address;
  customer.completedOnboarding = true;
  await customer.save();
  await customer.save();

  sendSuccessResponse(res, 200, "Onboarding completed successfully", {
    customerId: customer._id,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
  });
}catch (error) {
  if (error instanceof AppError) {
    sendErrorResponse(res, error.statusCode, error.message);
  } else {
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
}
};

export default onBoarding;
