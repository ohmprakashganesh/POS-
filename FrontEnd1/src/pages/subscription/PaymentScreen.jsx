import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Banknote,
  CheckCircle,
  Upload,
  ArrowLeft,
  ClipboardCheck,
  LockIcon,
} from "lucide-react";

// --- 1. Enrollment Summary Component (Right Sidebar) ---
const EnrollmentSummary = ({ summary, totalAmount }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full text-white rounded-xl shadow-2xl h-fit flex flex-col">
        <div className="bg-green-700 p-4 w-full">
          <h2 className="text-2xl text-white font-bold pb-4">
            Enrollment Summary
          </h2>
          <p className="text-xl font-sans text-gray-200 mb-6">
            Review your details before payment
          </p>
        </div>
        <div className="pt-3 h-fit pb-5">
          {Object.entries(summary).map(([key, value], index) => (
            <div
              key={key}
              className={`flex justify-between px-6 py-3 items-center text-sm ${
                index < Object.keys(summary).length - 1 ? "border-green-700" : ""
              }`}
            >
              <span className="font-bold text-gray-700">{key}</span>
              <span className="font-medium text-black">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-5 w-full">
        <h3 className="text-gray-700 text-xl border-b p-6 font-bold mt-4 mb-3 border-green-700 pt-3">
          Payment Summary
        </h3>
        <div className="flex px-6 justify-between items-center text-xl font-bold mb-6 text-gray-600">
          <span>Total Amount</span>
          <span className="text-green-600">{totalAmount}</span>
        </div>

        <button   onClick={()=>navigate('/success')} className="w-full text-white opacity-75 py-3 bg-green-500 text-lg hover:bg-green-600 hover:[letter-spacing:1px] transition duration-150 shadow-lg">
          Complete Enrollment
        </button>

        <p className="text-xs text-center mt-3 text-gray-600">
          By completing enrollment, you agree to our terms and conditions
        </p>
      </div>

      <button
        onClick={() => navigate("/")} 
        className="w-full outline hover:bg-green-500 hover:text-white py-3 mt-6 flex items-center justify-center text-sm text-black transition duration-150"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Course Details
      </button>
    </>
  );
};

// --- 2. Payment Method Card Component ---
const PaymentMethodCard = ({ icon: Icon, title, subtitle, selected, onClick }) => {
  const baseClasses =
    "relative flex flex-col items-center p-8 border-2 rounded-xl cursor-pointer transition duration-300 w-full";
  const selectedClasses = "border-green-500 bg-green-50 shadow-lg scale-[1.01]";
  const defaultClasses = "border-gray-200 bg-white hover:border-gray-400";

  return (
    <div
      className={`${baseClasses} ${
        selected ? selectedClasses : defaultClasses
      }`}
      onClick={onClick}
    >
      <div
        className={`p-3 rounded-full mb-3 transition duration-300 ${
          selected ? "bg-green-200 text-green-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <p className="font-bold text-lg text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
      {selected && (
        <div className="absolute top-2 right-2 text-green-600">
          <CheckCircle className="w-5 h-5 fill-green-500" />
        </div>
      )}
    </div>
  );
};

// --- 3. Main Payment Screen Component ---
const App = () => {
  const [selectedMethod, setSelectedMethod] = useState("eSewa");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const enrollmentSummaryData = {
    Email: "admin@gems.com",
    Phone: "9806877739",
    Course: "React JS",
    Remarks: "I am interested in this class",
    Price: "999",
    Class: "Online",
    Name: "Om Prakash Parajuli",
    Status: "Pending",
  };
  const TOTAL_AMOUNT = "NPR 999";

  const paymentInstructions = [
    "Scan the QR code using your eSewa/bank app",
    "Enter the amount 999",
    "Complete the payment process",
    "Take a screenshot of the successful payment",
    "Upload the screenshot below and submit",
  ];

  const handleFileChange = useCallback((file) => {
    if (file) {
      setUploadedFile(file);
    }
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="mb-6">
        <div className="flex justify-center rounded-md">
          <h1 className="bg-green-50 px-5 rounded-md flex mb-5 items-center justify-center gap-3">
            <LockIcon className="text-[10px]" size={15} /> complete the process
            securely
          </h1>
        </div>
        <h1 className="text-4xl pb-2 font-semibold text-center font-serif">
          Complete Your Enrollment
        </h1>
        <h1 className="text-center font-normal text-gray-500 flex-wrap text-xl p-1">
          You're just one step away from being a part of Byte Gurkha Services
        </h1>
      </div>

      {/* Main 2-column layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Content Area (scrollable) */}
        <div className="w-full pt-12 lg:w-2/3 space-y-8">
          {/* 1. Choose Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Choose Payment Method
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <PaymentMethodCard
                icon={CreditCard}
                title="eSewa"
                subtitle="Digital wallet payment"
                selected={selectedMethod === "eSewa"}
                onClick={() => setSelectedMethod("eSewa")}
              />
              <PaymentMethodCard
                icon={Banknote}
                title="Bank Transfer"
                subtitle="Direct bank payment"
                selected={selectedMethod === "BankTransfer"}
                onClick={() => setSelectedMethod("BankTransfer")}
              />
            </div>
          </div>

          {/* 2. Conditional Payment Section */}
          {selectedMethod === "eSewa" && (
            <PaymentSection
              title="eSewa Payment"
               url="https://placehold.co/160x160/02b662/ffffff/png?text=eSewa+Payment
"

              paymentInstructions={paymentInstructions}
            />
          )}
          {selectedMethod === "BankTransfer" && (
            <PaymentSection
              title="Bank Transfer"
              url="https://placehold.co/160x160/000000/FFFFFF/png?text=QR+Code"
              paymentInstructions={paymentInstructions}
            />
          )}

          {/* 3. Upload Payment Screenshot */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Upload Payment Screenshot
            </h2>
            <label
              htmlFor="payment-screenshot"
              className={`flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all duration-300
              border-2 border-dashed rounded-lg
              ${
                isDragging
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload
                className={`w-12 h-12 mb-3 transition-colors ${
                  uploadedFile ? "text-green-600" : "text-gray-400"
                }`}
              />

              {uploadedFile ? (
                <p className="text-green-600 font-bold text-lg">
                  {uploadedFile.name}
                </p>
              ) : (
                <>
                  <p className="text-gray-700 font-semibold">
                    Click to browse or drag and drop your payment screenshot
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPG, PNG, JPEG (Max 5MB)
                  </p>
                </>
              )}

              <input
                id="payment-screenshot"
                type="file"
                accept=".jpg,.png,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Right Content Area (Sticky Sidebar) */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-24 space-y-6">
            <EnrollmentSummary
              summary={enrollmentSummaryData}
              totalAmount={TOTAL_AMOUNT}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const PaymentSection = ({ title, paymentInstructions,url }) => (
  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm">
        Scan the QR code below to make payment
      </p>
    </div>

    {/* QR Code and Label */}
    <div className="flex justify-center flex-col items-center space-y-2">
     <img src='https://placehold.co/160x160/000000/FFFFFF/png?text=QR+Code' alt="" />
      <p className="mt-2 text-sm font-medium text-gray-700">Byte Gurkha</p>
    </div>

    {/* Payment Instructions */}
    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 shadow-inner">
      <h3 className="font-bold mb-3 text-blue-800 flex items-center">
        <ClipboardCheck className="w-5 h-5 mr-2" />
        Payment Instructions:
      </h3>
      <ol className="list-none pl-0 space-y-2 text-sm text-gray-700">
        {paymentInstructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="font-semibold w-4 mr-2 text-blue-500">
              {index + 1}.
            </span>
            <span>{instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

// --- QR Placeholder Generator ---
const gridCols = 15;
const gridRows = 15;
const gridTemplateCols = `repeat(${gridCols}, 1fr)`;

const QRGrid = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: gridTemplateCols,
      gap: "1px",
      width: "10rem",
      height: "10rem",
    }}
  >
    {children}
  </div>
);

const QRCodePlaceholder = () => {
  const cells = Array.from({ length: gridCols * gridRows }, (_, i) => {
    const isDark =
      (i % 3 === 0 && Math.floor(i / gridCols) % 2 === 0) ||
      Math.random() > 0.6;
    return (
      <div
        key={i}
        className={`w-full h-full ${isDark ? "bg-black" : "bg-white"}`}
      />
    );
  });

  return (
    <div className="border border-gray-300 p-4 rounded-xl bg-white shadow-md inline-block">
      <QRGrid>{cells}</QRGrid>
    </div>
  );
};

export default App;
