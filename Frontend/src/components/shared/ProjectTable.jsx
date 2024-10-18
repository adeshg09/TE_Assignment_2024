import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditProjectModal from './EditProjectModal';
import DeleteProjectModal from './DeleteProjectModal';
import { TableHeaders } from '../../constants/data';
import PuffLoader from 'react-spinners/PuffLoader';

export default function ProjectTable({ projects, isLoading }) {
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  return (
    <div className="relative w-full rounded-lg border">
      
      <div className="sticky top-0 z-10 w-full overflow-hidden bg-gray-100 rounded-t-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {TableHeaders?.map((item, idx) => (
                <TableHead 
                  key={idx} 
                  className="w-[200px] text-center px-4 py-2 text-black text-sm font-bold bg-gray-100"
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>

    
      <div className="overflow-auto max-h-[450px]">
        <Table>
          <TableBody className="bg-white">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  <div className="flex justify-center items-center h-48 sm:h-64 md:h-48">
                    <PuffLoader size={60} color="#3498db" loading={isLoading} />
                  </div>
                </TableCell>
              </TableRow>
            ) : projects?.length > 0 ? (
              projects?.map((project, idx) => (
                <TableRow key={idx} className="text-center">
                  <TableCell className="w-[200px] font-medium px-4 py-2">{project?.name}</TableCell>
                  <TableCell className="w-[200px] px-4 py-2">{project?.description}</TableCell>
                  <TableCell className="w-[200px] px-4 py-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {project?.skillSet?.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="w-[200px] px-4 py-2">{project?.noOfMembers}</TableCell>
                  <TableCell className="w-[200px] px-4 py-2">
                    <Badge variant={project?.isActive ? 'default' : 'destructive'}>
                      {project?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[200px] px-4 py-2">
                    {new Date(project?.createdAt).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </TableCell>
                  <TableCell className="w-[200px] text-center px-4 py-2">
                    <div className="hidden sm:flex justify-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingProject(project)} className="flex items-center">
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeletingProject(project)} className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <div className="sm:hidden mt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                          <DropdownMenuItem onClick={() => setEditingProject(project)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingProject(project)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  <p>No projects found.</p>
                  <p>Create your First Project</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingProject && (
        <EditProjectModal project={editingProject} isOpen={!!editingProject} onClose={() => setEditingProject(null)} />
      )}
      {deletingProject && (
        <DeleteProjectModal project={deletingProject} isOpen={!!deletingProject} onClose={() => setDeletingProject(null)} />
      )}
    </div>
  );
}