import Button from "@/features/ui/Button";
import Input from "@/features/ui/Input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {PlusIcon} from "lucide-react";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().optional(),
  imageUrl: z.any().optional().nullable(),
  color: z.string().optional(),
});

const NewCategoryForm = ({ className = "",setIsCreateCategoryFormOpen,setIsSuccessModalOpen }) => {
  const {t}=useTranslation("form")
  const [error, setError] = useState(null);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      imageUrl: null,
      color: "#3B82F6",
    },
    resolver: zodResolver(categorySchema),
  });
  const formData = watch();
  const [previewUrl, setPreviewURl] = useState("");
  useEffect(() => {
    if (formData?.imageUrl && formData.imageUrl.length > 0) {
      setPreviewURl(URL.createObjectURL(formData.imageUrl[0]));
    }
  }, [formData?.imageUrl]);

  const createNewCategory = async (data) => {
    try {
      const newCategory = { ...data, items: 0, active: true, id: Date.now() };
      console.log(newCategory);
      //simulate api call for creating new category
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsCreateCategoryFormOpen(false)
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.log("Error creating category:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
      <form
        onSubmit={handleSubmit(createNewCategory)}
        className={cn(
          "max-w-xl relative w-[95%] p-5 bg-white dark:bg-dark h-fit rounded-md shadow-sm space-y-4",
          className
        )}
      >
        <h1 className="text-2xl font-bold">{t("category.title")}</h1>
        <Input
          label={t("category.categoryName")}
          placeholder="e.g., Seasonal Sales"
          id="name"
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label={t("category.imageUrl")}
          type="file"
          id="imageUrl"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />
        <div className="flex items-end gap-2">
          <Input
            label={t("category.categoryColor")}
            type="text"
            id="colorText"
            readOnly
            className="grow"
            value={formData.color}
          />
          <Input
            type="color"
            id="color"
            {...register("color")}
            error={errors.color?.message}
            className="size-10 p-1 rounded-md cursor-pointer border-none focus:ring-0"
          />
        </div>
        {/* Preview */}
        <div className="flex items-center min-h-30 p-5 space-x-3 bg-background rounded-md">
          <p className="text-sm font-medium text-muted">{t("category.preview")}</p>
          <div
            style={{ backgroundColor: formData.color }}
            className="size-14 rounded-lg overflow-hidden"
          >
            {previewUrl && (
              <img
                alt="image preview"
                src={previewUrl}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>

          <p className="text-muted truncate capitalize">
            {formData.name || "Category Preview"}
          </p>
        </div>
        {error && <p className="text-destructive text-sm mt-1">*{error}</p>}
        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            t("category.creating")
          ) : (
            <>
              <PlusIcon  strokeWidth={2.7}/>
              {t("category.createButton")}
            </>
          )}
        </Button>
      </form>
  );
};
export default NewCategoryForm;
