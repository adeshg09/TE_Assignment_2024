
const Base_URL ="https://te-assignment-2024backend.onrender.com/api/v1/projects/"


export const projectEndpoints = {
    addProjectApi: `${Base_URL}create`,
    editProjectApi: (id) => `${Base_URL}${id}/update`,  
    deleteProjectApi: (id) => `${Base_URL}${id}/delete`, 
    getProjectsApi: `${Base_URL}`, 
    getProjectByIdApi: (id) => `${Base_URL}${id}` ,
    deleteAllProjectsApi:`${Base_URL}deleteAll`
};
