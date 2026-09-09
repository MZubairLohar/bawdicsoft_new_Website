import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Blog } from '@/models/Blog';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

// Force Node runtime — Cloudinary's SDK needs Node APIs, not Edge.
export const runtime = 'nodejs';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * POST /api/blogs
 * Expects multipart/form-data with fields:
 *   title, excerpt, content, category, author, readTime  (strings)
 *   image  (File, optional — if omitted, blog is created without a cover image)
 *
 * The image is uploaded to Cloudinary server-side; only the resulting URL
 * is ever written to MongoDB. No base64 data touches the database.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get('title')?.toString().trim();
    const excerpt = formData.get('excerpt')?.toString().trim();
    const content = formData.get('content')?.toString().trim();
    const category = formData.get('category')?.toString().trim();
    const author = formData.get('author')?.toString().trim();
    const readTime = formData.get('readTime')?.toString().trim();
    const imageFile = formData.get('image') as File | null;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'title, excerpt, and content are required' },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
      // Basic guardrails — adjust limits to taste.
      const MAX_BYTES = 5 * 1024 * 1024; // 5MB
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
      }
      if (imageFile.size > MAX_BYTES) {
        return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 });
      }

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      imageUrl = await uploadBufferToCloudinary(buffer, {
        folder: 'bawdicsoft-blogs',
        public_id: `${slugify(title)}-${Date.now()}`,
      });
    }

    const blog = await Blog.create({
      title,
      slug: slugify(title),
      excerpt,
      content,
      category,
      author,
      readTime,
      image: imageUrl, // always a URL (or undefined) — never base64
      date: new Date(),
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

/**
 * GET /api/blogs
 * List endpoint — projected fields only, matches the fix applied to the
 * server-rendered /blogs page. Use for any client-side fetching (e.g. a
 * "load more" button) so this endpoint doesn't reintroduce the bloat.
 */
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find()
      .select('title slug excerpt category date readTime author image')
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Failed to load blogs:', error);
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 });
  }
}







// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/db';     // adjust path to your db.ts
// import { Blog } from '@/models/Blog';

// // GET all blogs (latest first)
// export async function GET() {
//   try {
//     await connectDB();
//     const blogs = await Blog.find().sort({ date: -1 }).lean();
//     return NextResponse.json(blogs, { status: 200 });
//   } catch (error) {
//     console.error('GET /api/blogs error:', error);
//     return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
//   }
// }

// // POST – create a new blog
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const required = ['title', 'slug', 'excerpt', 'content', 'category', 'date', 'readTime', 'author'];
//     for (const field of required) {
//       if (typeof body[field] !== 'string' || !body[field].trim()) {
//         return NextResponse.json(
//           { error: `Missing required field: ${field}` },
//           { status: 400 }
//         );
//       }
//     }

//     await connectDB();
//     const newBlog = await Blog.create(body);
//     return NextResponse.json(newBlog, { status: 201 });
//   } catch (error: any) {
//     console.error('POST /api/blogs error:', error);
//     if (error.code === 11000) {
//       return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
//     }
//     return NextResponse.json(
//       { error: 'Database unavailable. Blog was not saved.' },
//       { status: 503 }
//     );
//   }
// }
