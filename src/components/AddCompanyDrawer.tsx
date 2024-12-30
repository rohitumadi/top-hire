import { addNewCompay } from "@/api/companiesApi";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useUpdate from "@/hooks/useUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const addCompanySchema = z.object({
  company_name: z.string().min(1, { message: "Company Name is required" }),
  company_logo: z
    .any()
    .refine(
      (fileList) => fileList instanceof FileList && fileList.length > 0, // Ensure it's a FileList with at least one file
      { message: "Company Logo is required" }
    )
    .refine(
      (fileList) =>
        fileList[0].type === "image/png" || fileList[0].type === "image/jpeg",
      { message: "Only PNG or JPEG files are allowed" }
    )
    .refine((fileList) => fileList[0].size <= 5 * 1024 * 1024, {
      message: "File size must not exceed 5MB",
    }),
});
function AddCompanyDrawer({ fetchCompanies }: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof addCompanySchema>>({
    resolver: zodResolver(addCompanySchema),
  });

  const {
    fn: createCompanyFn,
    loading: loadingAddCompany,
    error,
  } = useUpdate(addNewCompay);
  async function onSubmit(data: z.infer<typeof addCompanySchema>) {
    await createCompanyFn(
      "Company added successfully",
      "Error adding company",
      {
        company_name: data.company_name,
        company_logo: data.company_logo[0],
      }
    );
    await fetchCompanies();
    reset();
  }

  return (
    <DrawerContent>
      <DrawerHeader className="p-4">
        <DrawerTitle>Add Company</DrawerTitle>
      </DrawerHeader>
      <form>
        <div className="flex gap-2 w-full p-4">
          <div className="flex flex-col w-full">
            <Input
              {...register("company_name")}
              type="text"
              placeholder="Company Name"
              className="w-full"
            />
            {errors?.company_name && (
              <p className=" text-red-500 text-sm">
                {errors.company_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              id="company_logo"
              {...register("company_logo")}
              type="file"
              //   accept="image/png, image/jpeg"
              className="col-span-3"
              placeholder="Upload Company Logo"
            />
            {errors?.company_logo && (
              <p className=" text-red-500 text-sm">
                {errors?.company_logo?.message &&
                  typeof errors.company_logo.message === "string" && (
                    <span>{errors.company_logo.message}</span>
                  )}
              </p>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Add
        </Button>
      </form>

      <DrawerFooter className="flex gap-2">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
export default AddCompanyDrawer;
