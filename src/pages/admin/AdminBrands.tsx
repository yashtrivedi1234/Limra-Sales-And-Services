import React, { useState } from 'react';
import { useGetBrandsQuery, useDeleteBrandMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminBrandModal from './AdminBrandModal';
import Loader from '@/components/ui/Loader';

const AdminBrands = () => {
  const { data: brands = [], isLoading } = useGetBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleAdd = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand: any) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id).unwrap();
        toast.success('Brand deleted successfully');
      } catch (err: any) {
        toast.error('Failed to delete brand');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-syne">Manage Brands</h1>
          <p className="text-neutral-500 mt-1">Manage brand details, features, and associated products.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary">Add New Brand</button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex justify-center bg-white"><Loader /></div>
        ) : brands.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No brands found. Add a new brand.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="p-4 font-medium text-neutral-500 w-24">Image</th>
                <th className="p-4 font-medium text-neutral-500">ID</th>
                <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand: any) => (
                <tr key={brand._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    {brand.heroImage ? (
                      <img src={brand.heroImage} alt="Brand" className="h-12 w-auto object-contain bg-neutral-100 rounded p-1" />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-200 rounded"></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-neutral-500 font-mono text-sm">{brand._id}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(brand)} className="text-brand-blue hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(brand._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminBrandModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        brand={selectedBrand} 
      />
    </div>
  );
};

export default AdminBrands;
