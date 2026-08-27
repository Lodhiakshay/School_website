import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  isbn: string;
  title: string;
  author: string;
  publisher?: string;
  category: string; // e.g. "Science", "Literature", "Mathematics", "Encyclopedia"
  edition?: string;
  shelfLocation?: string;
  totalCopies: number;
  availableCopies: number;
  price?: number;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    isbn: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, required: true, trim: true, index: true },
    author: { type: String, required: true, trim: true },
    publisher: { type: String, default: '' },
    category: { type: String, required: true, index: true },
    edition: { type: String, default: '' },
    shelfLocation: { type: String, default: '' },
    totalCopies: { type: Number, required: true, default: 1 },
    availableCopies: { type: Number, required: true, default: 1 },
    price: { type: Number, default: 0 },
    coverImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model<IBook>('Book', BookSchema);

