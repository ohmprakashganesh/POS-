import { XMarkIcon } from "@heroicons/react/24/outline";
import test from "@/assets/test.png";
import { Calendar, DollarSign, Hash, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Children } from "react";
import { useTranslation } from "react-i18next";

export default function PurchaseDetailsCard({ onClose, purchase }) {
  const {t}=useTranslation()
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 dark:bg-black/70 z-50"
      >
        {" "}
        <button onClick={onClose} className="absolute top-3 right-3 text-muted">
          <XMarkIcon className="size-8" />
        </button>
      </div>
      <div className="bg-white animate-fade-slide-in  dark:bg-dark rounded-xl shadow-lg w-full max-w-md overflow-hidden  relative z-50">
        <span className="absolute top-1 right-1 bg-primary text-primary-foreground font-semibold rounded-full px-1.5 py-px">
          {purchase.category}
        </span>
        <img
          src={purchase.imageUrl || test}
          alt={purchase.name}
          className="w-full aspect-video "
        />

        <div className="details p-3">
          <h2 className="font-semibold text-2xl">{purchase.name}</h2>
          <BadgeComponent title={t("purchase.th.quantity")} value={purchase.stock}>
            <Hash className="text-primary" />
          </BadgeComponent>
           <BadgeComponent title={t("purchase.th.costRs")} value={purchase.cost}>
            <DollarSign className="text-secondary" />
          </BadgeComponent>
          <BadgeComponent title={t("purchase.th.purchaseDate")} value={purchase.purchase_date}>
            <Calendar className="text-tertiary" />
          </BadgeComponent>
          <BadgeComponent title={t("purchase.th.expiryDate")} value={purchase.expiry_date}>
            <Calendar className="text-destructive" />
          </BadgeComponent>
        </div>
      </div>
    </div>
  );
}

function BadgeComponent({ title,value,className,children}) {
  return (
    <div className={cn("bg-background text-foreground flex gap-2 items-center p-1 my-2 rounded-md",className)}>
        {children}
     <div className="">
              <p className="text-muted text-sm">{title || "title"}:</p>
              <p className="font-medium">{value || "-"}</p>
            </div>
    </div>
  );
}
