
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useProjectContext } from '../../context/projectContext'

export default function DeleteAllProjectModal({  isOpen, onClose }) {
  const { deleteAllTheProjects } = useProjectContext()

  const handleDeleteAll = () => {
    deleteAllTheProjects()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete all projects? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDeleteAll}>Delete All Projects</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}