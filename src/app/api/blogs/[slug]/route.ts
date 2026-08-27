import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Blog } from '@/models/Blog';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // 👈 note the Promise type
) {
   let slug: string | undefined;  // 👈 declare outside try
  try {
    const resolved = await params; // ✅ await the params
    const decodedSlug = decodeURIComponent(resolved.slug);
    await connectDB();
    
    const blog = await Blog.findOne({ slug: decodedSlug }).lean();
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(`GET /api/blogs/${slug} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   try {
//     const { slug } = await params;
//     const decodedSlug = decodeURIComponent(slug); // <-- add this line
//     await connectDB();
//     const blog = await Blog.findOne({ slug: decodedSlug }).lean();
//     if (!blog) {
//       return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
//     }
//     return NextResponse.json(blog, { status: 200 });
//   } catch (error) {
//     console.error(`GET /api/blogs/${slug} error:`, error);
//     return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
//   }
// }