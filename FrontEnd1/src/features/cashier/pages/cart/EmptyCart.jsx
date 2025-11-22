import React from "react";
import { ShoppingCart } from "lucide-react";
import Button from "@/features/ui/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CartEmpty = () => {
  const { t } = useTranslation("cashier")
    const navigate = useNavigate();

  return (
    <div className=" w-full p-5 ">
        <div className=" md:w-1/2 lg:w-1/2 w-full  text-muted-hover flex flex-col justify-center items-center mx-auto my-auto  p-6 rounded-xl ">
 <ShoppingCart width={200} height={200} />

      <h1 className=" text-4xl font-bold text-dark dark:text-white mt-3">{t("cart.emptyCart")}</h1>

      <p className="text-center mt-2 px-4">
        {t("cart.addItems")}
      </p>

      <Button onClick={() => navigate("/")} className="mt-4 w-full max-w-sm">
       {t("cart.addItems")}
      </Button>
        </div>
     
    </div>
  );
};

export default CartEmpty;
