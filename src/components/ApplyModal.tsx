import { applyJob } from "@/api/applicationsApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdate from "@/hooks/useUpdate";
import { JobWithCompany } from "@/utils/database.types";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";
import { useTheme } from "./theme-provider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
interface ApplyModalProps {
  job: JobWithCompany;
  applied: boolean;
  fetchJob: Function;
}

const schema = z.object({
  name: z
    .string()
    .nonempty()
    .max(50, { message: "Name cannot be greater than 50 characters" }),
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0s" })
    .max(50, { message: "Experience cannot be grater than 50" })
    .int(),
  skills: z.string().nonempty().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        (file[0] && file[0].type === "application/pdf") ||
        file[0].type === "application/msword",
      { message: "Only  PDF or Word file is allowed" }
    ),
});
function ApplyModal({ job, applied = false, fetchJob }: ApplyModalProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const userId = user?.id;
  const {
    fn: applyJobFn,
    loading: loadingApply,
    error: errorApply,
  } = useUpdate(applyJob);
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
    try {
      await applyJobFn(
        "Applied for the job successfully",
        "Error applying for the job",
        {
          candidate_id: userId,
          job_id: job.id,
          candidate_name: data.name,
          status: "applied",
          experience: data.experience,
          skills: data.skills,
          education: data.education,
          resume: data.resume[0],
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      await fetchJob(job.id);
      reset();
    }
  }
  function handleOpenDialog() {
    if (!user) {
      navigate("?sign-in=true");
    }
  }
  return (
    <Dialog open={applied || !user ? false : undefined}>
      <DialogTrigger asChild>
        <Button
          variant={job?.isOpen && !applied ? "default" : "destructive"}
          disabled={!job?.isOpen || applied}
          onClick={handleOpenDialog}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Closed"}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            Apply for {job.title} at {job.company.company_name}{" "}
          </DialogTitle>
          <DialogDescription>Please Fill the Form</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Pedro Duarte"
                className="col-span-3"
              />
              <div className="col-start-2 col-end-5">
                {errors.name && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                type="number"
                {...register("experience", {
                  valueAsNumber: true,
                  required: "Experience is required",
                })}
                id="experience"
                placeholder="2"
                className="col-span-3"
              />
              <div className="col-start-2 col-end-5">
                {errors.experience && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                {...register("skills", {
                  required: "Skills are required",
                })}
                placeholder="Skills (comma separated)"
                defaultValue="React, Node, TypeScript"
                className="col-span-3"
              />
              <div className="col-start-2 col-end-5">
                {errors.skills && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.skills.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="education" className="text-right">
                Education
              </Label>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} {...field}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Intermediate" id="Intermediate" />
                      <Label htmlFor="Intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Graduate" id="Graduate" />
                      <Label htmlFor="Graduate">Graduate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Post Graduate"
                        id="Post Graduate"
                      />
                      <Label htmlFor="Post Graduate">Post Graduate</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <div className="col-start-2 col-end-5">
                {errors.education && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors.education.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                {...register("resume", {
                  required: "Resume is required",
                })}
                type="file"
                className="col-span-3"
                placeholder="Upload Resume"
              />
              <div className="col-start-2 col-end-5">
                {errors?.resume && (
                  <p className="col-span-3 text-red-500 text-sm">
                    {errors?.resume?.message &&
                      typeof errors.resume.message === "string" && (
                        <span>{errors.resume.message}</span>
                      )}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={loadingApply} className="w-full" type="submit">
              {loadingApply ? (
                <ClipLoader color={theme === "dark" ? "white" : "black"} />
              ) : (
                "Apply"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default ApplyModal;
