import type { Request, Response } from "express";
import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";

import User from "../../models/userModel";
import refreshTokenModel from "../../models/refreshToken";
import { AppError } from "../../utils/AppError";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.util";
import { sendErrorResponse } from "../../utils/Responses";
import type { jwtPayload } from "../../types/auth.types";

dotenv.config();

passport.serializeUser((user: jwtPayload, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return done(null, false);
    }

    done(null, { userId: user.id, role: user.role });
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false);
        }

        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = await User.create({
              email,
              FirstName: profile.name?.givenName || "",
              LastName: profile.name?.familyName || "",
              phoneNumber: profile.phone || "",
              googleId: profile.id,
              isVerified: true,
            });
          }
        }

        return done(null, { userId: user.id, role: user.role } as jwtPayload);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, false);
      }
    },
  ),
);

const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as jwtPayload;
    const accessToken = await signAccessToken({
      userId: user.userId,
      role: user.role,
    });
    const refreshToken = await signRefreshToken({
      userId: user.userId,
      role: user.role,
    });

    await refreshTokenModel.create({
      userId: user.userId,
      refreshToken,
    });

    const redirectUrl = new URL(
      `${process.env.FRONTEND_URL}/api/auth/googleCallback`,
    );
    redirectUrl.searchParams.set("token", accessToken);
    redirectUrl.searchParams.set("refreshToken", refreshToken);
    res.redirect(redirectUrl.toString());
  } catch (error) {
    if (error instanceof AppError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

export default googleCallback;
