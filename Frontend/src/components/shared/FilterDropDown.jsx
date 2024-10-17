import { useProjectContext } from '../../context/projectContext';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';

export default function FilterDropdown() {
  const { filterOption, setFilterOption } = useProjectContext();

  return (
    <Select onValueChange={setFilterOption}>
      <SelectTrigger className="w-full sm:w-64 focus:outline-none focus:border-none">
        <SelectValue 
          placeholder="Filter by" 
          className={`text-black ${!filterOption ? 'opacity-50' : ''}`} 
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="members">Most Members</SelectItem>
        <SelectItem value="nameAZ">Name (A-Z)</SelectItem>
        <SelectItem value="isActive">Active Projects</SelectItem>
        <SelectItem value="isInactive">Inactive Projects</SelectItem>
      </SelectContent>
    </Select>
  );
}
