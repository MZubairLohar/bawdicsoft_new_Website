// src/app/blogs/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { blogs, blogCategories, blogTopics, BlogPost } from '@/data/blogs';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Insights on AI, Blockchain &amp; <br />
              <span className="text-blue-200">Scalable Innovation</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl">
              Expert perspectives on building AI-powered systems, DeFi infrastructure, 
              and web applications that scale — from the team at BawdicSoft.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/blogs/create"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                ✍️ Write a Blog
              </Link>
              <span className="inline-flex items-center px-6 py-3 bg-blue-700/50 text-white rounded-lg">
                📚 {blogs.length}+ Articles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ===== BLOG GRID ===== */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blogCategories.map((cat: string) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: BlogPost) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>

          {/* ===== SIDEBAR (COMMENTED OUT) ===== */}
          {/* <aside className="lg:w-80 flex-shrink-0 space-y-6">
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">📌 Topics</h3>
              <div className="flex flex-wrap gap-2">
                {blogTopics.map((topic: string) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-800">📬 Stay Updated</h3>
              <p className="text-sm text-gray-600 mt-1">
                Subscribe for the latest insights on AI, blockchain, and scalable tech.
              </p>
              <form className="mt-4 flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">🔖 Recent Articles</h3>
              <ul className="space-y-3">
                {blogs.slice(0, 3).map((blog: BlogPost) => (
                  <li key={blog.id}>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      {blog.title}
                    </Link>
                    <span className="block text-xs text-gray-400">{blog.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}

// ===== BLOG CARD COMPONENT =====
interface BlogCardProps {
  blog: BlogPost;
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-400 font-medium">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg">📄 {blog.category}</span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {blog.category}
          </span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {blog.title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2 flex-1">
          {blog.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">By {blog.author}</span>
          <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}