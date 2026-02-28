import Service from '../model/service.model.js';

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const serviceData = { ...req.body };
    if (req.file) {
      serviceData.image = req.file.path; // Cloudinary URL
    }

    // Parse nested arrays from FormData string
    if (typeof serviceData.highlights === 'string') {
      try { serviceData.highlights = JSON.parse(serviceData.highlights); } catch(e) { serviceData.highlights = [serviceData.highlights]; }
    }
    if (typeof serviceData.process === 'string') {
      try { serviceData.process = JSON.parse(serviceData.process); } catch(e) {}
    }
    if (typeof serviceData.faqs === 'string') {
      try { serviceData.faqs = JSON.parse(serviceData.faqs); } catch(e) {}
    }

    const newService = new Service(serviceData);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // New Cloudinary URL
    }

    // Parse nested arrays from FormData string
    if (typeof updateData.highlights === 'string') {
      try { updateData.highlights = JSON.parse(updateData.highlights); } catch(e) { updateData.highlights = [updateData.highlights]; }
    }
    if (typeof updateData.process === 'string') {
      try { updateData.process = JSON.parse(updateData.process); } catch(e) {}
    }
    if (typeof updateData.faqs === 'string') {
      try { updateData.faqs = JSON.parse(updateData.faqs); } catch(e) {}
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete service (Admin only)
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
