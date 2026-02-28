import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAddBrandMutation, useUpdateBrandMutation } from '@/store/api';
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { toast } from 'sonner';

interface AdminBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: any;
}

const AdminBrandModal: React.FC<AdminBrandModalProps> = ({ isOpen, onClose, brand }) => {
  const [addBrand, { isLoading: isAdding }] = useAddBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();
  const [isUploading, setIsUploading] = useState(false);
  const isLoading = isAdding || isUpdating || isUploading;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedHeroImageUrl, setUploadedHeroImageUrl] = useState<string>('');

  useEffect(() => {
    if (brand) {
      setImageFile(null);
      setUploadedHeroImageUrl(brand.heroImage || '');
    } else {
      setImageFile(null);
      setUploadedHeroImageUrl('');
    }
  }, [brand, isOpen]);

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
      setUploadedHeroImageUrl(url);
      toast.success('Hero image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload hero image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      const timestamp = Date.now();
      const defaultName = `brand-${timestamp}`;

      const variables = {
        slug: brand?.slug || defaultName,
        brandName: brand?.brandName || "Brand Partner",
        title: brand?.title || defaultName,
        subtitle: "",
        description: "",
        heroImage: uploadedHeroImageUrl || brand?.heroImage || "",
        features: [],
        products: [],
      };

      if (brand) {
        await updateBrand({ id: brand._id || brand.id, variables }).unwrap();
        toast.success('Brand updated successfully');
      } else {
        await addBrand(variables).unwrap();
        toast.success('Brand created successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || 'Error saving brand');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{brand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Brand Logo / Image *</label>
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
              {uploadedHeroImageUrl && (
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-medium">
                  ✓ Image uploaded: <a href={uploadedHeroImageUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-[300px]">{uploadedHeroImageUrl}</a>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <button type="button" onClick={onClose} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark">
              {isLoading ? 'Saving...' : 'Save Brand'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBrandModal;
