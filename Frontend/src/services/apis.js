
const Base_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1/projects/";


export const projectEndpoints = {
    addProjectApi: `${Base_URL}create`,
    editProjectApi: (id) => `${Base_URL}${id}/update`,  
    deleteProjectApi: (id) => `${Base_URL}${id}/delete`, 
    getProjectsApi: `${Base_URL}`, 
    getProjectByIdApi: (id) => `${Base_URL}${id}` 
};
