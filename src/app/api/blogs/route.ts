import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';     // adjust path to your db.ts
import { Blog } from '@/models/Blog';

// GET all blogs (latest first)
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST – create a new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ['title', 'slug', 'excerpt', 'content', 'category', 'date', 'readTime', 'author'];
    for (const field of required) {
      if (typeof body[field] !== 'string' || !body[field].trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await connectDB();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/blogs error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Database unavailable. Blog was not saved.' },
      { status: 503 }
    );
  }
}