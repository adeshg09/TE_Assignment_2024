
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useProjectContext } from '../../context/projectContext'

export default function DeleteProjectModal({ project, isOpen, onClose }) {
  const { deleteCreatedProject } = useProjectContext()

  const handleDelete = () => {
    deleteCreatedProject(project?._id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete the project <span className='font-bold'>{project?.name} </span>? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}