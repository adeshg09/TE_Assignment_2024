import { Input } from '@/components/ui/input'
import { useProjectContext } from '../../context/projectContext'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useProjectContext()

  return (
    <div className="relative w-full sm:w-64">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none cursor-pointer">
        <Search className="h-4 w-4 text-gray-400 cursor-pointer" />
      </span>
      <Input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
