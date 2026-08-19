// src/app/blogs/[slug]/page.tsx
import { blogs, BlogPost } from '@/data/blogs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static paths at build time
export async function generateStaticParams() {
  return blogs.map((blog: BlogPost) => ({
    slug: blog.slug,
  }));
}

// Props type for Next.js App Router
interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;
  const blog: BlogPost | undefined = blogs.find((b: BlogPost) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Split content into paragraphs (handle newlines)
  const paragraphs = blog.content.split('\n').filter((p) => p.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
          >
            ← Back to all blogs
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200 mb-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
              {blog.category}
            </span>
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
          <p className="mt-3 text-blue-100 text-lg">By {blog.author}</p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 prose prose-lg max-w-none text-gray-700">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{blog.content}</p>
          )}
        </div>

        {/* Footer / Share */}
        <div className="mt-8 flex flex-wrap justify-between items-center border-t border-gray-200 pt-6">
          <Link href="/blogs" className="text-blue-600 hover:underline">
            ← All Blogs
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-gray-500 text-sm">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://bawdicsoft.com/blogs/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://bawdicsoft.com/blogs/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}