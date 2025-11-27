import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Button from "@/features/ui/Button";
import Input from "@/features/ui/Input";
import { companyData } from "@/data/mockData";
import { useTranslation } from "react-i18next";

const signUp = () => {
  const { t } = useTranslation("form");
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    pan: "",
    phone: "",
    businessName: "",
    address: "",
    file: null,
  });

  const businessTypes = ["cosmetic", "mechanic", "retail", "medical", "sport"];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (id && companyData.length > 0) {
      const company = companyData.find((obj) => obj.id === id);
      if (company) {
        setFormData({
          name: company.name,
          email: company.email,
          type: company.type,
          pan: company.pan,
          phone: company.phone,
          address: company.address,
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) return t("signUpErrors.businessNameRequired");
    if (!formData.type.trim()) return t("signUpErrors.businessTypeRequired");
    if (!formData.pan.trim()) return t("signUpErrors.panRequired");
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return t("signUpErrors.invalidEmail");
    if (!formData.phone.match(/^\+?\d{7,15}$/))
      return t("signUpErrors.invalidPhone");
    if (!formData.file) return t("signUpErrors.uploadLogo");
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMsg(t("signUp.accountCreated"));
      navigate("/payment");
    } catch (err) {
      setError(t("signUpErrors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {id && (
        <Link
          to={"/profile"}
          className="bg-primary/10 absolute z-40 text-left ml-0 hover:bg-primary/30 rounded-full"
        >
          <ArrowLeftIcon className="size-10 p-2" strokeWidth={2.5} />
        </Link>
      )}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full md:w-[50%] bg-white dark:bg-dark rounded-xl shadow-sm md:px-4 px-2 lg:px-4 py-5">
          {/* Header */}
          {id ? (
          <div className="text-center mb-3">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {t("signUp.update")}
       
            </h1>
            <p className="text-muted mt-1 text-sm">
              {t("signUp.updateDescription")}
            </p>
          </div>
          ):<div className="text-center mb-3">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {t("signUp.registerCompany")}
       
            </h1>
            <p className="text-muted mt-1 text-sm">
              {t("signUp.alreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:text-primary-hover"
              >
                {t("signUp.signInHere")}
              </Link>
            </p>
          </div>}
          

          {/* Alerts */}
          {error && (
            <div
              className="mb-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-destructive text-sm"
              role="alert"
            >
              * {error}
            </div>
          )}
          {successMsg && (
            <div
              className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm"
              role="status"
            >
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 text-sm">
            {/* Business Name */}
            <Input
              label={t("signUp.businessName") + " *"}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("signUp.businessNamePlaceholder")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PAN */}
              <Input
                label={t("signUp.panVatNumber") + " *"}
                name="pan"
                type="text"
                value={formData.pan}
                onChange={handleChange}
                placeholder={t("signUp.panVatPlaceholder")}
              />

              {/* Business Type */}
              <div className="w-full">
                <label className="block mb-1">{t("signUp.businessType")} *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
                >
                  <option value="">{t("signUp.selectBusinessType")}</option>
                  {businessTypes.map((item, ind) => (
                    <option key={ind} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t("signUp.emailAddress") + " *"}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("signUp.emailPlaceholder")}
              />
              <Input
                label={t("signUp.phoneNumber") + " *"}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("signUp.phonePlaceholder")}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1">{t("signUp.businessAddress")}</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder={t("signUp.addressPlaceholder")}
                className="w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
              ></textarea>
            </div>

            {/* File Upload */}
            <Input
              label={t("signUp.uploadLogo") + " *"}
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="cursor-pointer focus:outline-none p-0 file:mr-3 file:py-3 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover transition duration-150 ease-in-out"
            />

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-primary border-muted/40 rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted">
                {t("signUp.termsAgreement")}{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  {t("signUp.termsAndConditions")}
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? t("signUp.creatingAccount") : t("signUp.createAccount")}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default signUp;
