import mongoose, { Schema, model, models } from 'mongoose';

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;        // e.g., "2025-03-15"
  readTime: string;    // e.g., "5 min read"
  author: string;
  image?: string;
  _id?: mongoose.Types.ObjectId;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);