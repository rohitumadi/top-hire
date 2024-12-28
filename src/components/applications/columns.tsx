import { ColumnDef } from "@tanstack/react-table";
export type Applications = {
  candidate_name: string;
  experience: string;
  education: string;
  skills: string;
};
export const columns: ColumnDef<Applications>[] = [
  {
    accessorKey: "id",
    header: "Application ID",
  },
  {
    accessorKey: "candidate_name",
    header: "Name",
  },
  {
    accessorKey: "education",
    header: "Education",
  },
  {
    accessorKey: "experience",
    header: "Experience (years)",
  },
  {
    accessorKey: "skills",
    header: "Skills",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "resume",
    header: "Resume",
  },
];
