import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
}

const newsletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<INewsletter>('Newsletter', newsletterSchema);