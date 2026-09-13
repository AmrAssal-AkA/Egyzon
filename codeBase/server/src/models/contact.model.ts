import mongoose, { Schema } from 'mongoose';
import { IContact } from '../types/contact.types';

const contactSchema: Schema<IContact> = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true }
});



export const Contact = mongoose.model<IContact>('Contact', contactSchema);