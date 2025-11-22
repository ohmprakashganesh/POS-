import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/features/ui/Input";
import Button from "@/features/ui/Button";
import { useTranslation } from "react-i18next";

const SupportForm = () => {
  const {t}= useTranslation("subscriber");
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
    <div className="h-[calc(100dvh-80px)]  flex items-center justify-center">
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

              <h2 className="text-2xl font-bold mb-2">  {t("request.thankYou")} </h2>

              <p className="text-gray-600 mb-1">
              {t("request.requestReceived")}
              </p>

              <p className="text-sm text-gray-500 mb-6">
             {t("request.responseTime")}
              </p>
              <Button className="px-6"> {t("request.close")}</Button>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 w-[95%] h-fit max-w-150 bg-white dark:bg-dark rounded-md shadow-sm p-5"
      >
        <h2 className="text-3xl text-center font-semibold">{t("request.requestSupport")}</h2>
        {/* Email Input */}
      
        {/* Topic Dropdown */}
        <div>
          <label htmlFor="topic" className="block mb-1 ">
           {t("request.helpTopic")}
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
            {t("request.helpTopic")}
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
          label= {t("request.pleaseUploadScreenshot")}
          type="file"
          name="subject"
          id="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder=   {t("request.noFileChosen")}
        />

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block mb-1">
            {t("request.detailedDescription")}
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            required
            value={formData.description}
            onChange={handleChange}
            placeholder=     {t("request.descriptionPlaceholder")}
            className="w-full px-3 py-2 border border-muted/40 focus:border-none outline-none rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="flex ">
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
               {t("request.submitting")}
              </>
            ) : (
              <>
              {t("request.submitRequest")}
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
