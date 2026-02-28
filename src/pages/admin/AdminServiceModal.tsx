import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAddServiceMutation, useUpdateServiceMutation } from '@/store/api';
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { toast } from 'sonner';

interface AdminServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
}

const AdminServiceModal: React.FC<AdminServiceModalProps> = ({ isOpen, onClose, service }) => {
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [isUploading, setIsUploading] = useState(false);
  const isLoading = isAdding || isUpdating || isUploading;

  const [formData, setFormData] = useState({
    title: '', slug: '', icon: '', badge: '', tagline: '',
    desc: '', longDesc: '', duration: '', price: '',
    highlights: '', process: '', faqs: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        icon: service.icon || '',
        badge: service.badge || '',
        tagline: service.tagline || '',
        desc: service.desc || '',
        longDesc: service.longDesc || '',
        duration: service.duration || '',
        price: service.price || '',
        highlights: Array.isArray(service.highlights) ? service.highlights.join(', ') : '',
        process: service.process ? JSON.stringify(service.process, null, 2) : '[]',
        faqs: service.faqs ? JSON.stringify(service.faqs, null, 2) : '[]',
      });
      setImageFile(null);
      setUploadedImageUrl(service.image || '');
    } else {
      setFormData({
        title: '', slug: '', icon: '', badge: '', tagline: '',
        desc: '', longDesc: '', duration: '', price: '', highlights: '', process: '[]', faqs: '[]'
      });
      setImageFile(null);
      setUploadedImageUrl('');
    }
  }, [service, isOpen]);

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
      
      let parsedHighlights = [];
      let parsedProcess = [];
      let parsedFaqs = [];

      try {
        if (formData.highlights) parsedHighlights = formData.highlights.split(',').map(s => s.trim()).filter(Boolean);
        if (formData.process) parsedProcess = JSON.parse(formData.process);
        if (formData.faqs) parsedFaqs = JSON.parse(formData.faqs);
      } catch (e) {
        toast.error('Invalid JSON format in Process or FAQs');
        setIsUploading(false);
        return;
      }

      const variables = {
        ...formData,
        image: uploadedImageUrl,
        highlights: parsedHighlights,
        process: parsedProcess,
        faqs: parsedFaqs,
        price: formData.price || null,
        duration: formData.duration || null,
        tagline: formData.tagline || null,
        badge: formData.badge || null,
        longDesc: formData.longDesc || null,
        rating: service ? service.rating : 5,
        reviews: service ? service.reviews : 0
      };

      if (service) {
        await updateService({ id: service._id || service.id, variables }).unwrap();
        toast.success('Service updated successfully');
      } else {
        await addService(variables).unwrap();
        toast.success('Service created successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || 'Error saving service');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">Title *</label><input name="title" required value={formData.title} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Slug *</label><input name="slug" required value={formData.slug} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Icon Name</label><input name="icon" value={formData.icon} onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g. Activity" /></div>
            <div><label className="text-sm font-medium">Badge</label><input name="badge" value={formData.badge} onChange={handleChange} className="w-full border rounded p-2" placeholder="Most Popular" /></div>
            <div><label className="text-sm font-medium">Tagline</label><input name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border rounded p-2" /></div>
            <div><label className="text-sm font-medium">Price</label><input name="price" value={formData.price} onChange={handleChange} className="w-full border rounded p-2" placeholder="Starts from ₹999" /></div>
            <div><label className="text-sm font-medium">Duration</label><input name="duration" value={formData.duration} onChange={handleChange} className="w-full border rounded p-2" placeholder="2-4 Hours" /></div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Service Image</label>
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
                  ✓ Image uploaded: <a href={uploadedImageUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-[200px]">{uploadedImageUrl}</a>
                </div>
              )}
            </div>
          </div>

          <div><label className="text-sm font-medium">Description *</label><textarea name="desc" required value={formData.desc} onChange={handleChange} className="w-full border rounded p-2" rows={2}></textarea></div>
          <div><label className="text-sm font-medium">Long Description</label><textarea name="longDesc" value={formData.longDesc} onChange={handleChange} className="w-full border rounded p-2" rows={3}></textarea></div>
          <div><label className="text-sm font-medium">Highlights (comma separated)</label><input name="highlights" value={formData.highlights} onChange={handleChange} className="w-full border rounded p-2" /></div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">Process (JSON array)</label><textarea name="process" value={formData.process} onChange={handleChange} className="w-full border rounded p-2 font-mono text-xs" rows={5}></textarea></div>
            <div><label className="text-sm font-medium">FAQs (JSON array)</label><textarea name="faqs" value={formData.faqs} onChange={handleChange} className="w-full border rounded p-2 font-mono text-xs" rows={5}></textarea></div>
          </div>

          <DialogFooter>
            <button type="button" onClick={onClose} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark">
              {isLoading ? 'Saving...' : 'Save Service'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminServiceModal;
