import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CrudFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: { name: string; label: string; type: string; required?: boolean; options?: { value: string; label: string }[]; accept?: string }[];
  initialData?: any;
  onSubmit: (data: any) => Promise<boolean>;
  isLoading: boolean;
}

const CrudFormModal: React.FC<CrudFormModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<any>(initialData);
  const [fileData, setFileData] = useState<{ [key: string]: File | null }>({});

  useEffect(() => {
    setFormData(initialData);
    setFileData({}); // Clear file data on initialData change
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFileData((prev: any) => ({ ...prev, [name]: fileInput.files ? fileInput.files[0] : null }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let dataToSubmit: any = { ...formData };
    const hasFiles = Object.values(fileData).some(file => file !== null);

    if (hasFiles) {
      const formWithFiles = new FormData();
      for (const key in formData) {
        formWithFiles.append(key, formData[key]);
      }
      for (const key in fileData) {
        if (fileData[key]) {
          formWithFiles.append(key, fileData[key] as File);
        }
      }
      dataToSubmit = formWithFiles; // Send FormData if files are present
    }

    const success = await onSubmit(dataToSubmit);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h3 className="text-3xl font-bold text-secondary-dark mb-6 text-center">{title}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-gray-600 text-sm font-bold mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
                    required={field.required}
                    rows={4}
                  ></textarea>
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
                    required={field.required}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-white hover:file:bg-primary"
                    required={field.required}
                    accept={field.accept || "image/*"}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <motion.button
              type="submit"
              className="bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-full w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CrudFormModal;