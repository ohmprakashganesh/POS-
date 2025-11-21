import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../contexts/AuthContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { plans } from "@/data/mockData";
import Button from "@/features/ui/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Subscription = () => {
  const {t}=useTranslation();
  const navigate = useNavigate();
  const { user, subscriptionStatus, updateSubscription } = useAuth();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(subscriptionStatus);
  const sts = localStorage.getItem("pos_subscription");

  const handleSubscribe = async (plan) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      updateSubscription("active");
      setIsProcessing(false);
      alert("Subscription activated successfully!");
    }, 2000);
  };

  const handlePayment = (gateway) => {
    // In real app, this would integrate with eSewa/Khalti
    alert(`Redirecting to ${gateway} payment...`);
    handleSubscribe(selectedPlan);
  };

  if (sts === "active") {
    return (
      <div className="h-[calc(100dvh-80px)] flex  flex-col justify-center items-center lg:justify-start lg:py-40">
        <CheckIcon className="mx-auto bg-primary/10 rounded-full p-3 h-16 w-16 text-constructive" />
        <h1 className="mt-4 text-3xl font-bold">{t("plan.statusActive")}</h1>
        <p className="my-2 text-muted text-lg">
          {t("plan.descriptionActive")}
        </p>
        <Button onClick={() => navigate("/publicSubscription")}>
          {" "}
          {t("plan.manage")}
        </Button>
      </div>
    );
  }
  if (sts === "trail") {
    return (
      <div className="h-[calc(100dvh-80px)] flex flex-col items-center justify-center lg:justify-start lg:py-40">
        <CheckIcon className="mx-auto bg-primary/10 rounded-full p-3 h-16 w-16 text-constructive" />
        <h1 className="text-3xl mt-4 font-bold">{t("plan.statusTrial")}</h1>
        <p className="text-muted text-lg my-2">
          {t("plan.descriptionTrial")}
        </p>
        <Button onClick={() => navigate("/publicSubscription")}>
          {t("plan.getFullAccess")}
        </Button>
      </div>
    );
  }
};

export default Subscription;
