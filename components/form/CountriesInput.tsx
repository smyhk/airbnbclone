import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'country';

export default function CountriesInput({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        country
      </Label>

      <Select
        name={name}
        required
        defaultValue={defaultValue || formattedCountries[0].code}
      >
        <SelectTrigger name={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map(item => {
            return (
              <SelectItem key={item.code} value={item.code}>
                <span className="flex items-center gap-2">
                  {item.flag} {item.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
