import React, { useState } from 'react';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminProjectModal from './AdminProjectModal';
import Loader from '@/components/ui/Loader';

const AdminProjects = () => {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleAdd = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        toast.success('Project deleted successfully');
      } catch (err: any) {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-syne">Manage Projects</h1>
          <p className="text-neutral-500 mt-1">Create, edit, and manage portfolio projects.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary">Add New Project</button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex justify-center bg-white"><Loader /></div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No projects found. Add a new project.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="p-4 font-medium text-neutral-500 w-16">Image</th>
                <th className="p-4 font-medium text-neutral-500">Title</th>
                <th className="p-4 font-medium text-neutral-500">Location</th>
                <th className="p-4 font-medium text-neutral-500">Date</th>
                <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    {project.featuredImage ? (
                      <img src={project.featuredImage} alt={project.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-200 rounded"></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-neutral-900">{project.title}</td>
                  <td className="p-4 text-neutral-600">{project.location || '-'}</td>
                  <td className="p-4 text-neutral-600">{project.completionDate || '-'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(project)} className="text-brand-blue hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
      />
    </div>
  );
};

export default AdminProjects;
