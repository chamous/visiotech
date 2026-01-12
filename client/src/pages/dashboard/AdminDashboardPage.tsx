import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CubeTransparentIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import api, { solutionsApi, productsApi, caseStudiesApi, authApi, projectsApi } from '../../services/api'; // Import all APIs
import { toast } from 'react-toastify';
import CrudFormModal from '../../components/CrudFormModal';
import { getAbsoluteImageUrl } from '../../utils/helpers'; // Import the helper

interface KPIProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const KPI: React.FC<KPIProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-xl flex items-center space-x-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
    >
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-secondary-dark">{value}</p>
      </div>
    </motion.div>
  );
};

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const AdminDashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // State for active tab

  // States for fetched data
  const [solutions, setSolutions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]); // New: Projects state
  const [clientUsers, setClientUsers] = useState<any[]>([]); // New: Client users for dropdown

  // CRUD Modal State
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [currentCrudItem, setCurrentCrudItem] = useState<any | null>(null);
  const [crudModalTitle, setCrudModalTitle] = useState('');
  const [crudModalFields, setCrudModalFields] = useState<any[]>([]);
  const [crudSubmitFunction, setCrudSubmitFunction] = useState<any>(null);
  const [crudIsLoading, setCrudIsLoading] = useState(false);


  const fetchSolutions = () => solutionsApi.getAll().then(res => setSolutions(res.data)).catch(err => console.error(err));
  const fetchProducts = () => productsApi.getAll().then(res => setProducts(res.data)).catch(err => console.error(err));
  const fetchCaseStudies = () => caseStudiesApi.getAll().then(res => setCaseStudies(res.data)).catch(err => console.error(err));
  const fetchProjects = () => projectsApi.getAll().then(res => setProjects(res.data)).catch(err => console.error(err));
  const fetchClientUsers = () => authApi.getAllUsers().then(res => setClientUsers(res.data.filter((user: any) => user.role === 'CLIENT'))).catch(err => console.error(err));


  useEffect(() => {
    // Fetch data for management sections
    if (activeTab === 'solutions') {
      fetchSolutions();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'case-studies') {
      fetchCaseStudies();
    } else if (activeTab === 'projects') { // New: Fetch projects and client users
      fetchProjects();
      fetchClientUsers();
    }
  }, [activeTab]);

  // Helper to upload image files
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.filePath;
    } catch (error) {
      toast.error('Failed to upload image.');
      console.error('Image upload error:', error);
      return null;
    }
  };


  // CRUD Operations
  const handleCreate = (type: string) => {
    setCurrentCrudItem({}); // Clear for new creation
    setCrudModalTitle(`Create New ${type}`);
    setCrudIsLoading(false);

    let formFields: any[] = [];
    let submitApiCall: (data: any) => Promise<any>;

    if (type === 'Solution') {
      formFields = [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'imageUrl', label: 'Image', type: 'file', required: true, accept: 'image/*' },
      ];
      submitApiCall = solutionsApi.create;
    } else if (type === 'Product') {
      formFields = [
        { name: 'name', label: 'Product Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'imageUrl1', label: 'Product Image 1', type: 'file', required: true, accept: 'image/*' },
        { name: 'imageUrl2', label: 'Product Image 2', type: 'file', accept: 'image/*' },
      ];
      submitApiCall = productsApi.create;
    } else if (type === 'Case Study') {
      formFields = [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'beforeImage', label: 'Before Image', type: 'file', required: true, accept: 'image/*' },
        { name: 'afterImage', label: 'After Image', type: 'file', required: true, accept: 'image/*' },
        { name: 'solutionId', label: 'Related Solution ID', type: 'text' },
      ];
      submitApiCall = caseStudiesApi.create;
    } else if (type === 'Project') { // New: Project form fields
      formFields = [
        { name: 'title', label: 'Project Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'status', label: 'Status', type: 'select', required: true, options: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(s => ({ value: s, label: s })) },
        { name: 'progress', label: 'Progress (%)', type: 'number', required: true },
        { name: 'clientId', label: 'Assign to Client', type: 'select', required: true, options: clientUsers.map((user: any) => ({ value: user.id, label: user.name })) },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
      ];
      submitApiCall = projectsApi.create;
    }

    setCrudModalFields(formFields);
    setCrudSubmitFunction(() => async (formData: any) => {
      setCrudIsLoading(true);
      let dataToSubmit: any = {};

      if (formData instanceof FormData) { // Check if formData contains files
        const newFormData: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                const uploadedPath = await uploadImage(value);
                if (uploadedPath) {
                    newFormData[key] = uploadedPath;
                } else {
                    setCrudIsLoading(false);
                    return false;
                }
            } else {
                newFormData[key] = value;
            }
        }
        dataToSubmit = newFormData;
      } else {
        dataToSubmit = formData;
      }
      
      try {
        await submitApiCall(dataToSubmit);
        toast.success(`${type} created successfully!`);
        if (type === 'Solution') fetchSolutions();
        else if (type === 'Product') fetchProducts();
        else if (type === 'Case Study') fetchCaseStudies();
        else if (type === 'Project') fetchProjects();
        return true;
      } catch (error) {
        toast.error(`Failed to create ${type}.`);
        console.error(error);
        return false;
      } finally {
        setCrudIsLoading(false);
      }
    });

    setIsCrudModalOpen(true);
  };

  const handleEdit = (type: string, item: any) => {
    setCurrentCrudItem(item); // Set item for editing
    setCrudModalTitle(`Edit ${type}`);
    setCrudIsLoading(false);

    let formFields: any[] = [];
    let submitApiCall: (id: string, data: any) => Promise<any>;

    if (type === 'Solution') {
      formFields = [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        // Allow updating image via file upload
        { name: 'imageUrl', label: `Current Image: ${item.imageUrl ? item.imageUrl.split('/').pop() : 'None'}`, type: 'text', initialValue: item.imageUrl, disabled: true },
        { name: 'newImageUrl', label: 'Upload New Image', type: 'file', accept: 'image/*' },
      ];
      submitApiCall = solutionsApi.update;
    } else if (type === 'Product') {
      formFields = [
        { name: 'name', label: 'Product Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'imageUrl1', label: `Current Image 1: ${item.imageUrl1 ? item.imageUrl1.split('/').pop() : 'None'}`, type: 'text', initialValue: item.imageUrl1, disabled: true },
        { name: 'newImageUrl1', label: 'Upload New Image 1', type: 'file', accept: 'image/*' },
        { name: 'imageUrl2', label: `Current Image 2: ${item.imageUrl2 ? item.imageUrl2.split('/').pop() : 'None'}`, type: 'text', initialValue: item.imageUrl2, disabled: true },
        { name: 'newImageUrl2', label: 'Upload New Image 2', type: 'file', accept: 'image/*' },
      ];
      submitApiCall = productsApi.update;
    } else if (type === 'Case Study') {
      formFields = [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'beforeImage', label: `Current Before Image: ${item.beforeImage ? item.beforeImage.split('/').pop() : 'None'}`, type: 'text', initialValue: item.beforeImage, disabled: true },
        { name: 'newBeforeImage', label: 'Upload New Before Image', type: 'file', accept: 'image/*' },
        { name: 'afterImage', label: `Current After Image: ${item.afterImage ? item.afterImage.split('/').pop() : 'None'}`, type: 'text', initialValue: item.afterImage, disabled: true },
        { name: 'newAfterImage', label: 'Upload New After Image', type: 'file', accept: 'image/*' },
        { name: 'solutionId', label: 'Related Solution ID', type: 'text' },
      ];
      submitApiCall = caseStudiesApi.update;
    } else if (type === 'Project') { // New: Project form fields for editing
      formFields = [
        { name: 'title', label: 'Project Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'status', label: 'Status', type: 'select', required: true, options: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(s => ({ value: s, label: s })) },
        { name: 'progress', label: 'Progress (%)', type: 'number', required: true, initialValue: item.progress },
        { name: 'clientId', label: 'Assign to Client', type: 'select', required: true, options: clientUsers.map((user: any) => ({ value: user.id, label: user.name })), initialValue: item.clientId },
        { name: 'startDate', label: 'Start Date', type: 'date', initialValue: item.startDate ? item.startDate.split('T')[0] : '' },
        { name: 'endDate', label: 'End Date', type: 'date', initialValue: item.endDate ? item.endDate.split('T')[0] : '' },
      ];
      submitApiCall = projectsApi.update;
    }

    setCrudModalFields(formFields);
    setCrudSubmitFunction(() => async (formData: any) => {
      setCrudIsLoading(true);
      let dataToSubmit: any = {};
      
      // Collect all keys that correspond to file uploads for this specific form type
      const fileUploadKeys = formFields.filter(f => f.type === 'file').map(f => f.name);

      if (formData instanceof FormData) {
        const newFormData: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                const uploadedPath = await uploadImage(value);
                if (uploadedPath) {
                    // Determine the original field name (e.g., 'imageUrl1', 'imageUrl2')
                    let originalKey;
                    if (key.startsWith('new')) {
                      originalKey = key.substring(3); // Remove 'new' prefix
                      originalKey = originalKey.charAt(0).toLowerCase() + originalKey.slice(1); // lowercase first letter
                    } else {
                      originalKey = key;
                    }
                    newFormData[originalKey] = uploadedPath;
                } else {
                    setCrudIsLoading(false);
                    return false; // Stop if image upload fails
                }
            } else {
                // If it's a non-file field, or a disabled URL field
                if (!formFields.some(f => f.name === key && f.disabled)) {
                  newFormData[key] = value;
                }
            }
        }
        dataToSubmit = newFormData;
      } else {
        dataToSubmit = formData;
      }
      
      // For any 'file' type fields where no new file was uploaded (i.e., not present in FormData or value is not a File),
      // retain the existing URL from the item. This prevents overwriting with an empty field.
      // This is a more robust way to handle it, as 'initialValue' from fields may not be present in formData directly if file input is empty.
      formFields.forEach(field => {
        if (field.type === 'file' && !hasNewFile && item[field.name]) { // Check if no new file and item had existing image
          dataToSubmit[field.name] = item[field.name]; // Retain existing image URL
        }
      });


      try {
        await submitApiCall(item.id, dataToSubmit);
        toast.success(`${type} updated successfully!`);
        if (type === 'Solution') fetchSolutions();
        else if (type === 'Product') fetchProducts();
        else if (type === 'Case Study') fetchCaseStudies();
        else if (type === 'Project') fetchProjects();
        return true;
      } catch (error) {
        toast.error(`Failed to update ${type}.`);
        console.error(error);
        return false;
      } finally {
        setCrudIsLoading(false);
      }
    });
    setIsCrudModalOpen(true);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    setCrudIsLoading(true); // Re-using for delete operation, could have separate loading state
    try {
      if (type === 'Solution') {
        await solutionsApi.remove(id);
        toast.success('Solution deleted successfully!');
        fetchSolutions();
      } else if (type === 'Product') {
        await productsApi.remove(id);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } else if (type === 'Case Study') {
        await caseStudiesApi.remove(id);
        toast.success('Case Study deleted successfully!');
        fetchCaseStudies();
      } else if (type === 'Project') { // New: Delete project
        await projectsApi.remove(id);
        toast.success('Project deleted successfully!');
        fetchProjects();
      }
    } catch (error) {
      toast.error(`Failed to delete ${type}.`);
      console.error(error);
      return false;
    } finally {
      setCrudIsLoading(false);
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-xl shadow-xl mb-8"
      >
        <h2 className="text-4xl font-bold mb-2">Admin Overview</h2>
        <p className="text-lg">Key performance indicators and system health at a glance.</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        {['overview', 'solutions', 'products', 'case-studies', 'projects'].map(tab => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-primary-dark text-white'
                : 'bg-gray-200 text-secondary-dark hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPI
              title="Total Projects"
              value="150+"
              icon={CubeTransparentIcon}
              color="bg-purple-500"
            />
            <KPI
              title="Active Users"
              value="2,450"
              icon={ArrowTrendingUpIcon}
              color="bg-green-500"
            />
            <KPI
              title="Defect Accuracy"
              value="99.7%"
              icon={CheckCircleIcon}
              color="bg-red-500"
            />
          </div>

          {/* Recharts */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-secondary-dark mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#60A5FA" // primary-light
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="uv" stroke="#60A5FA" // accent
                  strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Animated Tables & Modals - Placeholder */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-secondary-dark mb-4">Recent Activities</h3>
            <p className="text-gray-600 mb-4">
              Tables and content management with image previews will go here.
            </p>
            <button
              onClick={openModal}
              className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Open Animated Modal
            </button>
          </motion.div>
        </>
      )}

      {activeTab === 'solutions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-secondary-dark">Manage Solutions</h3>
            <button
              onClick={() => handleCreate('Solution')}
              className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Solution
            </button>
          </div>
          {solutions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-secondary-dark uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Image</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {solutions.map((sol: any) => (
                    <tr key={sol.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{sol.title}</td>
                      <td className="py-3 px-6 text-left">{sol.description.substring(0, 70)}...</td>
                      <td className="py-3 px-6 text-left">
                        {sol.imageUrl && <img src={getAbsoluteImageUrl(sol.imageUrl)} alt={sol.title} className="h-10 w-10 object-cover rounded-full" />}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button onClick={() => handleEdit('Solution', sol)} className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                            <PencilIcon />
                          </button>
                          <button onClick={() => handleDelete('Solution', sol.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No solutions found. Click "Add Solution" to create one.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-secondary-dark">Manage Products</h3>
            <button
              onClick={() => handleCreate('Product')}
              className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Product
            </button>
          </div>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-secondary-dark uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Image 1</th>
                    <th className="py-3 px-6 text-left">Image 2</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {products.map((prod: any) => (
                    <tr key={prod.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{prod.name}</td>
                      <td className="py-3 px-6 text-left">{prod.description.substring(0, 70)}...</td>
                      <td className="py-3 px-6 text-left">
                        {prod.imageUrl1 && <img src={getAbsoluteImageUrl(prod.imageUrl1)} alt={prod.name} className="h-10 w-10 object-cover rounded-full" />}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {prod.imageUrl2 && <img src={getAbsoluteImageUrl(prod.imageUrl2)} alt={prod.name} className="h-10 w-10 object-cover rounded-full" />}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button onClick={() => handleEdit('Product', prod)} className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                            <PencilIcon />
                          </button>
                          <button onClick={() => handleDelete('Product', prod.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No products found. Click "Add Product" to create one.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'case-studies' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-secondary-dark">Manage Case Studies</h3>
            <button
              onClick={() => handleCreate('Case Study')}
              className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Case Study
            </button>
          </div>
          {caseStudies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-secondary-dark uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Before Img</th>
                    <th className="py-3 px-6 text-left">After Img</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {caseStudies.map((cs: any) => (
                    <tr key={cs.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{cs.title}</td>
                      <td className="py-3 px-6 text-left">{cs.description.substring(0, 70)}...</td>
                      <td className="py-3 px-6 text-left">
                        {cs.beforeImage && <img src={getAbsoluteImageUrl(cs.beforeImage)} alt="Before" className="h-10 w-10 object-cover rounded-full" />}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {cs.afterImage && <img src={getAbsoluteImageUrl(cs.afterImage)} alt="After" className="h-10 w-10 object-cover rounded-full" />}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button onClick={() => handleEdit('Case Study', cs)} className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                            <PencilIcon />
                          </button>
                          <button onClick={() => handleDelete('Case Study', cs.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No case studies found. Click "Add Case Study" to create one.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'projects' && ( // New: Projects Management Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-secondary-dark">Manage Projects</h3>
            <button
              onClick={() => handleCreate('Project')}
              className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Project
            </button>
          </div>
          {projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-secondary-dark uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Progress</th>
                    <th className="py-3 px-6 text-left">Client</th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                    <th className="py-3 px-6 text-left">End Date</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {projects.map((proj: any) => (
                    <tr key={proj.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{proj.title}</td>
                      <td className="py-3 px-6 text-left">{proj.description.substring(0, 70)}...</td>
                      <td className="py-3 px-6 text-left">{proj.status}</td>
                      <td className="py-3 px-6 text-left">{proj.progress}%</td>
                      <td className="py-3 px-6 text-left">{proj.client ? proj.client.name : 'N/A'}</td>
                      <td className="py-3 px-6 text-left">{proj.startDate ? new Date(proj.startDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-3 px-6 text-left">{proj.endDate ? new Date(proj.endDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button onClick={() => handleEdit('Project', proj)} className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                            <PencilIcon />
                          </button>
                          <button onClick={() => handleDelete('Project', proj.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No projects found. Click "Add Project" to create one.</p>
          )}
        </motion.div>
      )}


      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <h3 className="text-2xl font-bold text-secondary-dark mb-4">Modal Title</h3>
              <p className="text-gray-700 mb-6">
                This is an example of a smooth modal transition. You can add any content here.
              </p>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCrudModalOpen && (
          <CrudFormModal
            isOpen={isCrudModalOpen}
            onClose={() => setIsCrudModalOpen(false)}
            title={crudModalTitle}
            fields={crudModalFields}
            initialData={currentCrudItem}
            onSubmit={crudSubmitFunction}
            isLoading={crudIsLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardPage;
