import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { authApi } from '../../services/api'; // Import authApi
import { toast } from 'react-toastify';
import CrudFormModal from '../../components/CrudFormModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CRUD Modal State
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [currentCrudItem, setCurrentCrudItem] = useState<any | null>(null);
  const [crudModalTitle, setCrudModalTitle] = useState('');
  const [crudModalFields, setCrudModalFields] = useState<any[]>([]);
  const [crudSubmitFunction, setCrudSubmitFunction] = useState<any>(null);
  const [crudIsLoading, setCrudIsLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    authApi.getAllUsers()
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load users.');
        setLoading(false);
        console.error('Error fetching users:', err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CRUD Operations
  const handleCreate = () => {
    setCurrentCrudItem({}); // Clear for new creation
    setCrudModalTitle(`Create New User`);
    setCrudIsLoading(false);

    const formFields = [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'role', label: 'Role', type: 'select', required: true, options: [{ value: 'CLIENT', label: 'Client' }, { value: 'ADMIN', label: 'Admin' }] },
    ];
    
    setCrudModalFields(formFields);
    setCrudSubmitFunction(() => async (data: any) => {
      setCrudIsLoading(true);
      try {
        await authApi.createUser(data);
        toast.success('User created successfully!');
        fetchUsers();
        return true;
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to create user.');
        console.error('Error creating user:', error);
        return false;
      } finally {
        setCrudIsLoading(false);
      }
    });

    setIsCrudModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setCurrentCrudItem(user); // Set user for editing
    setCrudModalTitle(`Edit User: ${user.name}`);
    setCrudIsLoading(false);

    const formFields = [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'New Password (optional)', type: 'password', required: false },
      { name: 'role', label: 'Role', type: 'select', required: true, options: [{ value: 'CLIENT', label: 'Client' }, { value: 'ADMIN', label: 'Admin' }] },
    ];
    
    setCrudModalFields(formFields);
    setCrudSubmitFunction(() => async (data: any) => {
      setCrudIsLoading(true);
      try {
        await authApi.updateUser(user.id, data);
        toast.success('User updated successfully!');
        fetchUsers();
        return true;
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to update user.');
        console.error('Error updating user:', error);
        return false;
      } finally {
        setCrudIsLoading(false);
      }
    });

    setIsCrudModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"?`)) return;

    setCrudIsLoading(true); // Re-using for delete operation, could have separate loading state
    try {
      await authApi.deleteUser(id);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete user.');
      console.error('Error deleting user:', error);
    } finally {
      setCrudIsLoading(false);
    }
  };

  if (loading) return <div className="text-center py-16 text-secondary-dark">Loading Users...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-xl mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-secondary-dark">User Management</h2>
          <button
            onClick={handleCreate}
            className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" /> Add User
          </button>
        </div>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-secondary-dark uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button onClick={() => handleEdit(user)} className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                          <PencilIcon />
                        </button>
                        <button onClick={() => handleDelete(user.id, user.name)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
          <p className="text-gray-600">No users found. Click "Add User" to create one.</p>
        )}
      </motion.div>

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

export default UsersPage;