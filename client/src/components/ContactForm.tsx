import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline'; // Still keep this for now, might use it elsewhere or remove later

interface ContactFormProps {
  onSubmit: (formData: any) => Promise<boolean>;
}

const inputVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  hover: { scale: 1.02, borderColor: '#3B82F6' },
  focus: { borderColor: '#2563EB', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' },
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await onSubmit(formData);
    setIsLoading(false);
    if (success) {
      setFormData({ name: '', email: '', company: '', message: '' }); // Clear form on success
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <h2 className="text-4xl font-bold text-secondary-dark mb-8 text-center">Get in Touch</h2>

      <motion.div className="mb-4" variants={inputVariants}>
        <label htmlFor="name" className="block text-gray-600 text-sm font-bold mb-2">
          Name
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
          required
          whileHover="hover"
          whileFocus="focus"
        />
      </motion.div>

      <motion.div className="mb-4" variants={inputVariants}>
        <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">
          Email
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
          required
          whileHover="hover"
          whileFocus="focus"
        />
      </motion.div>

      <motion.div className="mb-4" variants={inputVariants}>
        <label htmlFor="company" className="block text-gray-600 text-sm font-bold mb-2">
          Company (Optional)
        </label>
        <motion.input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
          whileHover="hover"
          whileFocus="focus"
        />
      </motion.div>

      <motion.div className="mb-6" variants={inputVariants}>
        <label htmlFor="message" className="block text-gray-600 text-sm font-bold mb-2">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
          required
          whileHover="hover"
          whileFocus="focus"
        ></motion.textarea>
      </motion.div>

      <motion.button
        type="submit"
        className="bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-full w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
