import React from 'react';
import ContactForm from '../components/ContactForm';
import { demoRequestsApi } from '../services/api'; // Import the API service
import { toast } from 'react-toastify'; // For user feedback

const ContactPage: React.FC = () => {
  const handleSubmit = async (formData: any) => {
    try {
      await demoRequestsApi.create(formData);
      toast.success('Your message has been sent successfully!');
      return true; // Indicate success to the form
    } catch (error) {
      toast.error('Failed to send your message. Please try again.');
      console.error('Error submitting demo request:', error);
      return false; // Indicate failure to the form
    }
  };

  return (
    <div>
      <div className="py-16 bg-secondary-dark text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Get in Touch with VisioTech</h1>
        <p className="text-xl max-w-2xl mx-auto">
          We're here to answer your questions and help you find the perfect solution for your industrial needs.
        </p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm onSubmit={handleSubmit} />
          </div>

          {/* Map Placeholder */}
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-secondary-dark mb-6">Our Location</h2>
            <div className="w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.805562768564!2d10.182410315291436!3d36.80649497994539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d193d25d1f%3A0x6b7b2b0a1f2b1b2b!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tunis, Tunisia Map"
              ></iframe>
            </div>
            <div className="mt-6 text-center text-gray-700">
              <p>123 Industrial Zone, Tunis, Tunisia</p>
              <p>Email: info@visiotech.tn</p>
              <p>Phone: +216 71 123 456</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;