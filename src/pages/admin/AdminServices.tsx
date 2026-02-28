import React, { useState } from 'react';
import { useGetServicesQuery, useDeleteServiceMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminServiceModal from './AdminServiceModal';
import Loader from '@/components/ui/Loader';

const AdminServices = () => {
  const { data: services = [], isLoading } = useGetServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id).unwrap();
        toast.success('Service deleted successfully');
      } catch (err: any) {
        toast.error('Failed to delete service');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-syne">Manage Services</h1>
          <p className="text-neutral-500 mt-1">Create, update, and manage services offered.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary">Add New Service</button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex justify-center bg-white"><Loader /></div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No services found. Add a new service.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="p-4 font-medium text-neutral-500 w-16">Image</th>
                <th className="p-4 font-medium text-neutral-500">Title</th>
                <th className="p-4 font-medium text-neutral-500">Badge</th>
                <th className="p-4 font-medium text-neutral-500">Price</th>
                <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: any) => (
                <tr key={service._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-200 rounded"></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-neutral-900">{service.title}</td>
                  <td className="p-4 text-neutral-600">{service.badge || '-'}</td>
                  <td className="p-4 text-neutral-600">{service.price || '-'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(service)} className="text-brand-blue hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default AdminServices;
