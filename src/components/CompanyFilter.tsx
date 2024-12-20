import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/utils/database.types";

import { Dispatch, SetStateAction } from "react";

interface CompanyFilterProps {
  companies: Database["public"]["Tables"]["companies"]["Row"][];
  company_id?: string | undefined;
  setCompanyId: Dispatch<SetStateAction<string|undefined>>;
}

function CompanyFilter({
  companies,
  company_id,
  setCompanyId,
}: CompanyFilterProps) {
  return (
    <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies?.map(({ company_name, id }) => (
            <SelectItem value={id} key={company_name}>
              {company_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default CompanyFilter;
