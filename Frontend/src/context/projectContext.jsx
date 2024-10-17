import { createContext, useState, useContext, useEffect } from 'react';
import { addProject, getAllProjects, updateProject, deleteProject } from '../services/operations/projectApi';


export const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('latest'); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); 
      try {
   
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        const res = await getAllProjects();
        if (res && res.success) {
          setProjects(res.data);
        } else {
          console.error("Failed to load projects");
        }
      } catch (error) {
        console.error("Error fetching projects: " + error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    if (searchTerm) {
      result = result.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skillSet.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) || 
        project.noOfMembers.toString().includes(searchTerm) ||
        project.isActive.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(project.createdAt).toLocaleDateString().includes(searchTerm)
      );
    }

    switch (filterOption) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
        break;
      case 'nameAZ':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'members':
        result.sort((a, b) => {
          const aMembers = parseInt(a.noOfMembers, 10) || 0; 
          const bMembers = parseInt(b.noOfMembers, 10) || 0; 
          return bMembers - aMembers;
        });
        break;
      case 'isActive':
        result = result.filter(project => project?.isActive === true);
        break;
      case 'isInactive':
        result = result.filter(project => project?.isActive === false);
        break;
      default:
        break;
    }

    setFilteredProjects(result);
  }, [projects, searchTerm, filterOption]);

  const addNewProject = async (projectData) => {
    const res = await addProject(projectData);
    if (res && res.success) {
      setProjects([...projects, { ...projectData, id: Date.now() }]);
    } else {
      console.log("Failed to Add Project")
    }
  };

  const updateOldProject = async (id, updatedProject) => {
    const res = await updateProject(id, updatedProject);
    if (res && res.success) {
      setProjects(projects.map(project =>
        project._id === id ? { ...project, ...res.data } : project
      ));
    } else {
      console.log( `Failed to update Project with id ${id}`)
    }
  };

  const deleteCreatedProject = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter(project => project._id !== id));
  };

  return (
    <ProjectContext.Provider value={{
      projects: filteredProjects,
      isLoading,
      searchTerm,
      setSearchTerm,
      filterOption,
      setFilterOption,
      addProject: addNewProject,
      updateOldProject,
      deleteCreatedProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
