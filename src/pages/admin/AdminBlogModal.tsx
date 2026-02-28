import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAddBlogMutation, useUpdateBlogMutation } from '@/store/api';
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { toast } from 'sonner';

interface AdminBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: any;
}

const AdminBlogModal: React.FC<AdminBlogModalProps> = ({ isOpen, onClose, blog }) => {
  const [addBlog, { isLoading: isAdding }] = useAddBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [isUploading, setIsUploading] = useState(false);
  const isLoading = isAdding || isUpdating || isUploading;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        category: blog.category || '',
        content: Array.isArray(blog.content) ? blog.content.join('\n\n') : (blog.content || ''),
      });
      setImageFile(null);
      setUploadedImageUrl(blog.image || '');
    } else {
      setFormData({
        title: '', category: '', content: ''
      });
      setImageFile(null);
      setUploadedImageUrl('');
    }
  }, [blog, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    try {
      setIsUploading(true);
      const url = await uploadImageToCloudinary(imageFile);
      setUploadedImageUrl(url);
      toast.success('Image uploaded successfully to Cloudinary');
    } catch (err) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      if (!uploadedImageUrl && !blog) {
        toast.error('Featured image must be uploaded for new blogs');
        setIsUploading(false);
        return;
      }

      const variables = {
        title: formData.title,
        category: formData.category,
        content: formData.content.split('\n\n').filter(p => p.trim() !== ''),
        image: uploadedImageUrl,
      };

      if (blog) {
        await updateBlog({ id: blog._id || blog.id, variables }).unwrap();
        toast.success('Blog updated successfully');
      } else {
        await addBlog(variables).unwrap();
        toast.success('Blog created successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || 'Error saving blog');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{blog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <input name="title" required value={formData.title} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Category *</label>
              <input name="category" required value={formData.category} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Featured Image {blog ? '(leave empty to keep current)' : '*'}</label>
            <div className="flex gap-2 items-center mt-1">
              <input type="file" accept="image/*" onChange={handleFileChange} className="flex-1 border rounded p-2" />
              <button 
                type="button" 
                onClick={handleUploadImage} 
                disabled={!imageFile || isUploading}
                className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-900 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
            {uploadedImageUrl && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-medium">
                ✓ Image uploaded: <a href={uploadedImageUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-[300px]">{uploadedImageUrl}</a>
              </div>
            )}
          </div>



          <div>
            <label className="text-sm font-medium">Content * (Separate paragraphs with double enter)</label>
            <textarea name="content" required value={formData.content} onChange={handleChange} className="w-full border rounded p-2 mt-1" rows={6}></textarea>
          </div>



          <DialogFooter>
            <button type="button" onClick={onClose} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark">
              {isLoading ? 'Saving...' : 'Save Blog'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBlogModal;
