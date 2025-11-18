import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/features/ui/Input";
import Button from "@/features/ui/Button";

const SupportForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "", // Default pre-selected topic (optional)
    subject: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issSubmissionSuccessFormOpen, setIsSubmissionSuccessFormOpen] =
    useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Simulate an API call/submission process ---
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setIsSubmitting(false);
      // In a real application, you'd check the API response here
      setIsSubmissionSuccessFormOpen(true);
      // Optionally reset form: setFormData({ name: '', email: '', topic: 'Party Balances & Ledgers', subject: '', description: '' });
    }, 1500);
  };

  // List of topics (should match your help cards)
  const helpTopics = [
    "Adding New Parties",
    "Party",
    "Inventory",
    "Managing Party Details",
    "Party Balances & Ledgers",
    "Staff Management",
    "Categorizing Parties",
  ];

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center">
      {issSubmissionSuccessFormOpen && (
        <div
          onClick={() => setIsSubmissionSuccessFormOpen(false)}
          className="fixed inset-0 bg-black/30  flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
        >
          <div className="bg-white dark:bg-dark rounded-md shadow-sm  max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300">
            <button className="absolute top-4 right-4 text-muted hover:text-muted-hover transition-colors">
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle size={48} className="text-constructive" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>

              <p className="text-gray-600 mb-1">
                We've received your request successfully.
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Our team will respond within 24 hours.
              </p>
              <Button className="px-6">Close</Button>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 w-[95%] max-w-150 bg-white dark:bg-dark rounded-md shadow-sm p-5"
      >
        <h2 className="text-3xl text-center font-semibold">Request Support</h2>
        {/* Email Input */}
        <Input
          label="Your Email Address *"
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        {/* Topic Dropdown */}
        <div>
          <label htmlFor="topic" className="block mb-1 ">
            Help Topic *
          </label>
          <select
            id="topic"
            name="topic"
            required
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-muted/40 focus:border-none outline-none rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {helpTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Subject/Summary Input */}
        <Input
          label=" Please Upload ScreenShort *"
          type="file"
          name="subject"
          id="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="please upload screenshot."
        />

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block mb-1">
            Detailed Description *
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe your issue in detail, including any steps taken, error messages, and expected outcome."
            className="w-full px-3 py-2 border border-muted/40 focus:border-none outline-none rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SupportForm;
