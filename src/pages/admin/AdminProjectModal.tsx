import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAddProjectMutation, useUpdateProjectMutation } from '@/store/api';
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { toast } from 'sonner';

interface AdminProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

const AdminProjectModal: React.FC<AdminProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [isUploading, setIsUploading] = useState(false);
  const isLoading = isAdding || isUpdating || isUploading;

  const [formData, setFormData] = useState({
    slug: '', title: '', description: '', location: '', completionDate: ''
  });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [uploadedFeaturedImageUrl, setUploadedFeaturedImageUrl] = useState<string>('');
  const [uploadedGalleryUrls, setUploadedGalleryUrls] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      setFormData({
        slug: project.slug || '',
        title: project.title || '',
        description: project.description || '',
        location: project.location || '',
        completionDate: project.completionDate || '',
      });
      setFeaturedImageFile(null);
      setGalleryFiles(null);
      setUploadedFeaturedImageUrl(project.featuredImage || '');
      setUploadedGalleryUrls(project.images || []);
    } else {
      setFormData({
        slug: '', title: '', description: '', location: '', completionDate: ''
      });
      setFeaturedImageFile(null);
      setGalleryFiles(null);
      setUploadedFeaturedImageUrl('');
      setUploadedGalleryUrls([]);
    }
  }, [project, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(e.target.files);
    }
  };

  const handleUploadFeatured = async () => {
    if (!featuredImageFile) return;
    try {
      setIsUploading(true);
      const url = await uploadImageToCloudinary(featuredImageFile);
      setUploadedFeaturedImageUrl(url);
      toast.success('Featured image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload featured image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadGallery = async () => {
    if (!galleryFiles || galleryFiles.length === 0) return;
    try {
      setIsUploading(true);
      const newUrls = await uploadMultipleImagesToCloudinary(galleryFiles);
      setUploadedGalleryUrls((prev) => [...prev, ...newUrls]);
      toast.success(`${newUrls.length} gallery images uploaded`);
    } catch (err) {
      toast.error('Failed to upload gallery images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      const variables = {
        ...formData,
        featuredImage: uploadedFeaturedImageUrl,
        images: uploadedGalleryUrls,
      };

      if (project) {
        await updateProject({ id: project._id || project.id, variables }).unwrap();
        toast.success('Project updated successfully');
      } else {
        await addProject(variables).unwrap();
        toast.success('Project created successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || 'Error saving project');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">Project Title *</label><input name="title" required value={formData.title} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Slug *</label><input name="slug" required value={formData.slug} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Location</label><input name="location" value={formData.location} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Completion Date</label><input name="completionDate" value={formData.completionDate} onChange={handleChange} className="w-full border rounded p-2" /></div>
            
            <div className="col-span-2">
              <label className="text-sm font-medium">Featured Image</label>
              <div className="flex gap-2 items-center mt-1">
                <input type="file" accept="image/*" onChange={handleFeaturedImageChange} className="flex-1 border rounded p-2" />
                <button 
                  type="button" 
                  onClick={handleUploadFeatured} 
                  disabled={!featuredImageFile || isUploading}
                  className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-900 disabled:opacity-50"
                >
                  Upload Featured
                </button>
              </div>
              {uploadedFeaturedImageUrl && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✓ Featured image uploaded
                </div>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">Gallery Images (Multiple)</label>
              <div className="flex gap-2 items-center mt-1">
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="flex-1 border rounded p-2" />
                <button 
                  type="button" 
                  onClick={handleUploadGallery} 
                  disabled={!galleryFiles || galleryFiles.length === 0 || isUploading}
                  className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-900 disabled:opacity-50"
                >
                  Upload Gallery
                </button>
              </div>
              {uploadedGalleryUrls.length > 0 && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✓ {uploadedGalleryUrls.length} gallery images total
                </div>
              )}
            </div>

            <div className="col-span-2"><label className="text-sm font-medium">Description</label><textarea name="description" required value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows={3}></textarea></div>
          </div>

          <DialogFooter>
            <button type="button" onClick={onClose} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark">
              {isLoading ? 'Saving...' : 'Save Project'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProjectModal;
