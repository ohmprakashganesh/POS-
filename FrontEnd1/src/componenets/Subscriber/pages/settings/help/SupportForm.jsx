import React, { useState } from 'react';
import { Mail, Tag, MessageSquare, Send, AlignRight, CheckCircle, CheckIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SupportForm = ({setShowForm}) => {
    const {user}= useAuth();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '', // Default pre-selected topic (optional)
    subject: '',
    description: '',
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // --- Simulate an API call/submission process ---
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setIsSubmitting(false);
      // In a real application, you'd check the API response here
      setSubmissionStatus('success'); 
      // Optionally reset form: setFormData({ name: '', email: '', topic: 'Party Balances & Ledgers', subject: '', description: '' });
    }, 1500);
  };

  // List of topics (should match your help cards)
  const helpTopics = [
    'Adding New Parties',
    'Party',
    'Inventory',
    'Managing Party Details',
    'Party Balances & Ledgers',
    'Staff Management',
    'Categorizing Parties',
  ];

  return (
<div className="max-w-full md:w-[40%]  w-full bg-white mx-auto pt-4 px-5 pb-5 rounded-xl shadow-lg border border-gray-200 relative">

  <p onClick={()=>setShowForm(false)} className=' text-end font-bold'>X</p>
      <h2 className="text-2xl text-center font-bold text-gray-600 "> {submissionStatus==='success'?
        <div className="flex  items-center mb-5 justify-center text-green-600">
        <CheckIcon className="mx-auto bg-blue-100 rounded-full h-16 w-16 text-green-500" />
      </div> :"Request Support"} </h2>
      

      {submissionStatus === 'success' ? (
        <div className=" bg-green-50 border rounded-lg text-green-700">
          <p className="font-semibold">Thank you for your request!</p>
          <p className="text-sm">We have received your request and will respond within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Your Email Address <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-3 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Topic Dropdown */}
          <div>
            <label htmlFor="topic" className="block text-sm h-4 font-medium text-gray-600">
               Help Topic <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-3 w-5 text-gray-400" />
              </div>
              <select
                id="topic"
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="block appearance-none w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select a topic</option>
                {helpTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject/Summary Input */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-500">
              Please Upload ScreenShort <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="file"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="please upload screenshot."
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your issue in detail, including any steps taken, error messages, and expected outcome."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex mt-4 justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-green hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default SupportForm;