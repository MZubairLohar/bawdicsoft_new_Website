import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(`GET /api/blogs/${params.slug} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}