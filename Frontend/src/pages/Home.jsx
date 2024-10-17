import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddProjectModal from '../components/shared/AddProjectModal'
import DeleteAllProjectsModal from '../components/shared/DeleteAllProjectsModal'
import { useProjectContext } from '../context/projectContext'
import SearchBar from '../components/shared/SearchBar'
import FilterDropdown from '../components/shared/FilterDropDown'
import ProjectTable from '../components/shared/ProjectTable'

export default function HomePage() {
  const { projects, isLoading } = useProjectContext()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">My Projects</h1>
      <div className="flex flex-row sm:flex-row justify-between items-center sm:items-center gap-4 lg:mx-72">
        <Button onClick={() => setIsAddModalOpen(true)} size="lg">Add Project</Button>
        <SearchBar />
        <FilterDropdown />
      </div>
      <div className="overflow-x-auto lg:mx-32">
        <div className="min-w-full align-middle">
          <ProjectTable projects={projects} isLoading={isLoading} />
        </div>
      </div>
      {projects.length > 0 && (
                <div className="flex justify-end lg:mx-32">
                    <Button variant="destructive" onClick={() => setIsDeleteAllModalOpen(true)}>Delete All Projects</Button>
                </div>
            )}
      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <DeleteAllProjectsModal isOpen={isDeleteAllModalOpen} onClose={() => setIsDeleteAllModalOpen(false)} /> {/* Add the modal here */}
    </div>
  )
}