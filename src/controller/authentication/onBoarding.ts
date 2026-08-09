import { Request, Response } from "express";

import User from "../../models/userModel";
import Customer from "../../models/customerModel";
import { sendErrorResponse , sendSuccessResponse } from "../../utils/Responses";
import { AppError } from "../../utils/AppError";

const onBoarding = async (req: Request, res: Response) => {
  try{
  const userId = req.user?.userId || (process.env.NODE_ENV !== "production" && req.body?.userId);
  const { phoneNumber, address } = req.body;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return sendErrorResponse(res, 404, "User not found", "User not found");
  }

  if(existingUser.completedOnboarding)return sendErrorResponse(res, 400, "User is already onboarded", "User is already onboarded");


  const customer = await Customer.findOne({ user: userId });
  if (!customer || existingUser.role !== "customer") {
    return sendErrorResponse(res, 400, "Bad Request", "User is not a customer");
  }
  existingUser.phoneNumber = phoneNumber;
  customer.address = address;
  existingUser.completedOnboarding = true;
  await customer.save();
  await existingUser.save();

  sendSuccessResponse(res, 200, "Onboarding completed successfully", {
    customerId: customer._id,
    phoneNumber: existingUser.phoneNumber,
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
