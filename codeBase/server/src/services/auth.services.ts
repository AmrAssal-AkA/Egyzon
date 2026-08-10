import User from '../models/userModel';
import { AppError } from '../utils/AppError';
import { comparePasswords, hashPassword } from '../utils/password.ustils';
import { signAccessToken, signRefreshToken } from '../utils/jwt.util';
import refreshTokenModel from '../models/refreshToken';

export const AuthService = {
    register: async (FirstName: string, LastName: string, email: string, password: string) => {
        try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError(400, 'User already exists');
        
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ FirstName, LastName, email, password: hashedPassword });
        await newUser.save();
        
        const accessToken = signAccessToken({userId: newUser._id.toString(), role: newUser.role});
        const refreshToken = signRefreshToken({userId: newUser._id.toString(), role: newUser.role});
        
        const refreshTokenDoc = new refreshTokenModel({ token: refreshToken, userId: newUser._id });
        await refreshTokenDoc.save();
        return { accessToken, refreshToken, user: newUser };
        }catch(error){
            if (error instanceof AppError) throw new AppError (error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    login: async (email: string, password: string) => {
        try{
            const user = await User.findOne({ email });
            if (!user) throw new AppError(400, 'Invalid email or password');
            
            const isPasswordValid = await comparePasswords(password, user.password);
            if (!isPasswordValid) throw new AppError(400, 'Invalid email or password');

            const accessToken = signAccessToken({userId: user._id.toString(), role: user.role});
            const refreshToken = signRefreshToken({userId: user._id.toString(), role: user.role});
            const refreshTokenDoc = new refreshTokenModel({ token: refreshToken, userId: user._id });
            await refreshTokenDoc.save();
            return { accessToken, refreshToken, user };
        }catch(error){ 
            if (error instanceof AppError) throw new AppError (error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    
}