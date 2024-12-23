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
import { JobWithCompany } from "@/utils/database.types";
import { User } from "@supabase/supabase-js";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ApplyModalProps {
  job: JobWithCompany;
  user: User;
  applied: boolean;
  fetchJob: Function;
}
function ApplyModal({ job, user, applied = false, fetchJob }: ApplyModalProps) {
  console.log(job);
  return (
    <Dialog open={applied ? false : undefined}>
      <DialogTrigger asChild>
        <Button
          variant={job?.isOpen && !applied ? "default" : "destructive"}
          disabled={!job?.isOpen || applied}
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
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                id="experience"
                placeholder="2 years"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="Skills (comma separated)"
                defaultValue="React, Node, TypeScript"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="education" className="text-right">
                Education
              </Label>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className=""
                    value="intermediate"
                    id="intermediate"
                  />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="post-graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                type="file"
                className="col-span-3"
                placeholder="Upload Resume"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit">
              Apply
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default ApplyModal;
