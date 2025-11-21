import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import qr from '/qr.jpg';

import {
  CreditCard,
  Banknote,
  CheckCircle,
  Upload,
  ArrowLeft,
  ClipboardCheck,
  LockIcon,
} from "lucide-react";
import Button from "@/features/ui/Button";

// --- 1. Enrollment Summary Component (Right Sidebar) ---

const EnrollmentSummary = ({ summary, totalAmount }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-white dark:bg-dark rounded-md overflow-hidden shadow-sm h-fit flex flex-col">
        <div className="bg-primary text-primary-foreground p-4 w-full">
          <h2 className="text-2xl font-bold">
            Enrollment Summary
          </h2>
          <p className="text-lg font-sans text-primary-foreground/70">
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
              <span className="font-xl text-muted">{key} :</span>
              <span className="font-medium ">{value}</span>
            </div>
          ))}  
        </div>
      </div>

      <div className="flex flex-col mt-5 w-full">
        <h3 className="text-xl border-b px-6 p-3 font-bold border-muted/40 ">
          Payment Summary
        </h3>
        <div className="flex px-6 justify-between items-center text-xl font-bold p-3 text-muted">
          <span>Total Amount</span>
          <span className="text-foreground">{totalAmount}</span>
        </div>

        <Button   onClick={()=>navigate('/success')} outline className="w-full my-2">
          Complete Enrollment
        </Button>

        <p className="text-sm text-center my-2 text-muted">
          By completing enrollment, you agree to our terms and conditions
        </p>
      </div>
 
      <Button
        onClick={() => navigate("/")} 
        outline
        className="w-full"
      >
        <ArrowLeft strokeWidth={2.5} />
        Back to Course Details
      </Button>
    </>
  );
};

// --- 2. Payment Method Card Component ---
const PaymentMethodCard = ({ icon: Icon, title, subtitle, selected, onClick }) => {
  const baseClasses =
    "relative flex flex-col items-center p-8 border-2 rounded-xl cursor-pointer transition duration-300 w-full";
  const selectedClasses = "border-constructive bg-constructive/10  scale-101";
  const defaultClasses = "border-primary bg-primary/20";

  return (
    <div
      className={`${baseClasses} ${
        selected ? selectedClasses : defaultClasses
      }`}
      onClick={onClick}
    >
      <div
        className={`p-3 rounded-full mb-3 transition duration-300 ${
          selected ? "bg-constructive/30 text-constructive" : " text-primary bg-primary/30"
        }`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <p className="font-bold text-lg text-black">{title}</p>
      <p className="text-sm text-muted">{subtitle}</p>
      {selected && (
        <div className="absolute top-2 right-2 text-constructive">
          <CheckCircle className="w-5 h-5 outline-constructive" />
        </div>
      )}
    </div>
  );
};

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
    <div className="min-h-screen bg-white dark:bg-dark p-6 sm:p-10 font-sans">
      <div className="mb-6">
        <div className="flex justify-center rounded-md">
          <h1 className="bg-secondary  text-secondary-foreground py-1 font-semibold px-5 rounded-full flex mb-5 items-center justify-center gap-3">
            <LockIcon strokeWidth={3}  size={15} /> complete the process
            securely
          </h1>
        </div>
        <h1 className="text-4xl  font-semibold text-center font-serif">
          Complete Your Enrollment
        </h1>
        <h1 className="text-center font-normal text-muted  flex-wrap text-xl p-1">
          You're just one step away from being a part of Byte Gurkha Services
        </h1>
      </div>

      {/* Main 2-column layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Content Area (scrollable) */}
        <div className="w-full pt-12 lg:w-2/3 space-y-8">
          {/* 1. Choose Payment Method */}
          <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
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
               url="/qr.jpg"
              paymentInstructions={paymentInstructions}
            />
          )}
          {selectedMethod === "BankTransfer" && (
            <PaymentSection
              title="Bank Transfer"
              url="/qr.jpg"
              paymentInstructions={paymentInstructions}
            />
          )}

          {/* 3. Upload Payment Screenshot */}
          <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-md shadow-sm">
            <h2 className="text-xl font-bold mb-4 ">
              Upload Payment Screenshot
            </h2>
            <label
              htmlFor="payment-screenshot"
              className={`flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all duration-300
              border-2 border-dashed rounded-lg
              ${
                isDragging
                  ? "border-constructive bg-constructive/10"
                  : "border-muted/40 hover:border-muted"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload
                className={`w-12 h-12 mb-3 transition-colors ${
                  uploadedFile ? "text-constructive" : "text-muted"
                }`}
              />

              {uploadedFile ? (
                <p className="text-constructive font-bold text-lg">
                  {uploadedFile.name}
                </p>
              ) : (
                <>
                  <p className="text-muted font-semibold">
                    Click to browse or drag and drop your payment screenshot
                  </p>
                  <p className="text-sm text-muted mt-2">
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
  <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-md shadow-sm space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted text-sm">
        Scan the QR code below to make payment
      </p>
    </div>

    {/* QR Code and Label */}
    <div className="flex   justify-center flex-col  w-full items-center space-y-2">
     <img className="w-[250px]" src='/qr.jpg' alt="" />
      <p className="text-sm font-medium w-[250px] text-muted text-center">Byte Gurkha</p>
    </div>

    {/* Payment Instructions */}
    <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary shadow-inner">
      <h3 className="font-bold mb-3 text-primary flex items-center">
        <ClipboardCheck className="w-5 h-5 mr-2" />
        Payment Instructions:
      </h3>
      <ol className="list-none pl-0 space-y-2 text-sm text-muted">
        {paymentInstructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="font-semibold w-4 mr-2 text-primary">
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
