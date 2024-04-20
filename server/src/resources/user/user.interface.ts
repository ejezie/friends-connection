import mongoose, { Document } from 'mongoose';

export default interface User extends Document {
    email?: string;
    name: string;
    username?: string;
    friends?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface RegistrationResult {
        newUser: User;
        accessToken: string;
    }