import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { State } from "country-state-city";

interface LocationFilterProps {
  location: string | undefined;
  setLocation: Dispatch<SetStateAction<string>>;
}

function LocationFilter({ location, setLocation }: LocationFilterProps) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({ name }) => (
            <SelectItem value={name}>{name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default LocationFilter;
