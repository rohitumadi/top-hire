import { getCompanies } from "@/api/companiesApi";
import { createJob } from "@/api/jobsApi";
import AddCompanyDrawer from "@/components/AddCompanyDrawer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobDescription } from "@/data/constants";
import useFetch from "@/hooks/useFetch";
import useUpdate from "@/hooks/useUpdate";
import { Company } from "@/utils/database.types";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(5000),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Company is required" }),
  expected_salary: z
    .string()
    .min(1, { message: "Expected Salary is required" })
    .max(10),
  experience: z.string().min(1, { message: "Experience is required" }).max(10),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user } = useUser();
  const role = user?.unsafeMetadata.role;
  const navigate = useNavigate();

  const {
    fn: createJobFn,
    loading: loadingCreateJob,
    error: errorCreateJob,
  } = useUpdate(createJob);
  const {
    data: companies,
    loading: loadingCompanies,
    fetchData: fetchCompanies,
  } = useFetch<Company[]>(getCompanies);
  useEffect(() => {
    if (role !== "recruiter") {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    async function getData() {
      await fetchCompanies();
    }

    getData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    await createJobFn("Job created  successfully", "Error creating job", {
      ...data,
      recruiter_id: user?.id,
    });
    reset();
  }
  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      <h1 className="text-center text-5xl font-semibold ">Post a Job</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Fill Job Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title")}
                  id="title"
                  placeholder="Title of the job"
                />
                {errors.title && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder={jobDescription}
                />
                {errors.description && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex items-center  gap-2 ">
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {State.getStatesOfCountry("IN").map(({ name }) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="company_id"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies?.map(({ company_name, id }) => (
                            <SelectItem value={`${id}`} key={company_name}>
                              {company_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>Add Company</Button>
                  </DrawerTrigger>
                  <AddCompanyDrawer fetchCompanies={fetchCompanies} />
                </Drawer>
              </div>
              <div className="grid grid-cols-2 gap-2 justify-center">
                <div>
                  <Input
                    {...register("expected_salary")}
                    id="expected_salary"
                    placeholder="Expected Salary"
                  />
                  {errors.expected_salary && (
                    <p className="col-span-3 text-red-500 text-sm">
                      {errors.expected_salary.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("experience")}
                    id="experience"
                    placeholder="Experience"
                  />
                  {errors.experience && (
                    <p className="col-span-3 text-red-500 text-sm">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                {errors.location && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
                {errors.company_id && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.company_id.message}
                  </p>
                )}
              </div>
            </div>
            <Controller
              control={control}
              name="requirements"
              render={({ field }) => (
                <MDEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.requirements && (
              <p className="col-span-3 text-red-500 text-sm">
                {errors.requirements.message}
              </p>
            )}
          </CardContent>
          <CardFooter className="w-full ">
            <Button
              disabled={loadingCreateJob}
              type="submit"
              className="w-full"
            >
              Post
            </Button>
            {errorCreateJob && (
              <p className="col-span-3 text-red-500 text-sm">
                {errorCreateJob.message}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default PostJob;
