import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddProjectModal from '../components/shared/AddProjectModal'
import { useProjectContext } from '../context/projectContext'
import SearchBar from '../components/shared/SearchBar'
import FilterDropdown from '../components/shared/FilterDropDown'
import ProjectTable from '../components/shared/ProjectTable'

export default function HomePage() {
  const { projects, isLoading } = useProjectContext() 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">My Projects</h1>
      <div className="flex flex-row sm:flex-row justify-between items-center sm:items-center gap-4 lg:mx-72">
        <Button onClick={() => setIsAddModalOpen(true)}>Add Project</Button>
        <div className="flex flex-row sm:flex-row gap-8 justify-between">
          <SearchBar />
          <FilterDropdown />
        </div>
      </div>
      <div className="overflow-x-auto lg:mx-32">
        <div className="min-w-full align-middle">
          <ProjectTable projects={projects} isLoading={isLoading} /> 
        </div>
      </div>
      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}