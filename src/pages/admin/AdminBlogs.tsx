import React, { useState } from 'react';
import { useGetBlogsQuery, useDeleteBlogMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminBlogModal from './AdminBlogModal';
import Loader from '@/components/ui/Loader';
import { Pencil, Trash2, Plus, FileText } from 'lucide-react';

const AdminBlogs = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      setDeletingId(id);
      await deleteBlog(id).unwrap();
      toast.success('Blog deleted successfully');
    } catch {
      toast.error('Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-syne">Manage Blogs</h1>
          <p className="text-neutral-500 mt-1">Create, edit, and delete blog posts.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add New Blog
        </button> 
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Blogs', value: blogs.length },
          { label: 'Categories', value: [...new Set(blogs.map((b: any) => b.category))].length },
          { label: 'With Images', value: blogs.filter((b: any) => b.image).length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-700 font-medium">
            <FileText size={18} />
            <span>All Blog Posts</span>
          </div>
          <span className="text-xs text-neutral-400">{blogs.length} post{blogs.length !== 1 ? 's' : ''}</span>
        </div>

        {isLoading ? (
          <div className="p-16 flex justify-center bg-white">
            <Loader />
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
              <FileText size={24} className="text-neutral-400" />
            </div>
            <p className="text-neutral-600 font-medium">No blogs yet</p>
            <p className="text-neutral-400 text-sm">Click "Add New Blog" to create your first post.</p>
            <button
              onClick={handleAdd}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors text-sm"
            >
              <Plus size={15} />
              Add New Blog
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-6 py-3 w-16">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Content Preview</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog: any) => {
                const contentPreview = Array.isArray(blog.content)
                  ? blog.content[0]
                  : blog.content;

                return (
                  <tr
                    key={blog._id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                  >
                    {/* Image */}
                    <td className="px-6 py-4">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover border border-neutral-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                          <FileText size={16} className="text-neutral-300" />
                        </div>
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 text-sm leading-snug max-w-[200px] line-clamp-2">
                        {blog.title}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">
                        {blog.category}
                      </span>
                    </td>

                    {/* Content Preview */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-400 max-w-[260px] line-clamp-2 leading-relaxed">
                        {contentPreview || '—'}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-blue border border-brand-blue/30 rounded-lg hover:bg-brand-blue/5 transition-colors"
                        >
                          <Pencil size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          disabled={deletingId === blog._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={12} />
                          {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AdminBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blog={selectedBlog}
      />
    </div>
  );
};

export default AdminBlogs;