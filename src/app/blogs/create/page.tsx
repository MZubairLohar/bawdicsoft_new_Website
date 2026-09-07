'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size (optional)
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('Image size should be less than 10MB.');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Build blog data
    const blogData = {
      title,
      author,
      content,
      // Agar image upload ho toh base64 send karo, warna empty string
      image: imagePreview || '',
      // Auto-generate slug from title
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      // Optional fields (aap chahe toh auto-set kar sakte hain)
      excerpt: content.slice(0, 150) + '...',
      category: 'Uncategorized',
      readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create blog');
      }
      router.push('/blogs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Back link aur heading */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/blogs" className="text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
          <span className="text-sm text-gray-500">+ Create New Blog</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">WRITE YOUR ARTICLE</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a compelling title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write your blog content here... Use #, ### for headings, and - for bullet lists."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Supports Markdown-like formatting: # Heading, ## Subheading, - bullet points, and bold text.
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="mb-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-48 rounded-lg shadow"
                    />
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Click to upload image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/png,image/jpeg,image/gif"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Publishing...' : '+ Publish Blog'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/blogs')}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}






// // src/app/blogs/create/page.tsx
// 'use client';

// import { useState, FormEvent, ChangeEvent } from 'react';
// import { useRouter } from 'next/navigation';

// // TypeScript Interface for Form Data
// interface BlogFormData {
//   title: string;
//   slug: string;
//   category: string;
//   author: string;
//   excerpt: string;
//   content: string;
//   date: string;
// }

// export default function CreateBlogPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState<BlogFormData>({
//     title: '',
//     slug: '',
//     category: 'Artificial Intelligence',
//     author: 'BawdicSoft Team',
//     excerpt: '',
//     content: '',
//     date: new Date().toISOString().split('T')[0],
//   });

//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>('');

//   // Handle input changes with proper typing
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Auto-generate slug from title
//     if (name === 'title') {
//       const generatedSlug = value
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-+|-+$/g, '');
//       setFormData((prev) => ({ ...prev, slug: generatedSlug }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');

//     if (!formData.title || !formData.content || !formData.slug) {
//       setMessage('❌ Please fill in Title, Content, and Slug.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       console.log('📝 Blog Data Submitted:', formData);

//       // 🚀 REAL API CALL (when backend is ready)
//       // const response = await fetch('/api/blogs', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });
//       // if (!response.ok) throw new Error('Failed to create blog');

//       // Demo: fake delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       setMessage('✅ Blog created successfully! Redirecting...');
//       setTimeout(() => router.push('/blogs'), 2000);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('❌ Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-3xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//               Write a Blog Post
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Share your insights on AI, Blockchain, Cybersecurity, and scalable technologies.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div>
//               <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
//                 Blog Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="e.g., AI Automation in 2026"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Slug */}
//             <div>
//               <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-1">
//                 URL Slug <span className="text-red-500">*</span>
//               </label>
//               <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
//                 <span className="pl-3 text-gray-400 text-sm">/blogs/</span>
//                 <input
//                   type="text"
//                   id="slug"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleChange}
//                   placeholder="ai-automation-2026"
//                   className="w-full px-3 py-2 bg-transparent focus:outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Category + Author */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>Artificial Intelligence</option>
//                   <option>Blockchain</option>
//                   <option>Cybersecurity</option>
//                   <option>DeFi</option>
//                   <option>Web Development</option>
//                   <option>Productivity</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-1">
//                   Author Name
//                 </label>
//                 <input
//                   type="text"
//                   id="author"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Excerpt */}
//             <div>
//               <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-1">
//                 Short Excerpt
//               </label>
//               <textarea
//                 id="excerpt"
//                 name="excerpt"
//                 rows={2}
//                 value={formData.excerpt}
//                 onChange={handleChange}
//                 placeholder="Brief summary for the listing page"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Content */}
//             <div>
//               <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">
//                 Blog Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="content"
//                 name="content"
//                 rows={10}
//                 value={formData.content}
//                 onChange={handleChange}
//                 placeholder="Write your full blog post here. Supports basic HTML."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 required
//               />
//             </div>

//             {/* Message */}
//             {message && (
//               <div
//                 className={`p-3 rounded-lg ${
//                   message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//                 }`}
//               >
//                 {message}
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Publishing...
//                   </>
//                 ) : (
//                   'Publish Blog'
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => router.push('/blogs')}
//                 className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }