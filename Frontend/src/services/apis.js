
const Base_URL =import.meta.env.VITE_BACKEND_URL || " https://te-assignment-2024.vercel.app/api/v1/projects/ "


export const projectEndpoints = {
    addProjectApi: `${Base_URL}create`,
    editProjectApi: (id) => `${Base_URL}${id}/update`,  
    deleteProjectApi: (id) => `${Base_URL}${id}/delete`, 
    getProjectsApi: `${Base_URL}`, 
    getProjectByIdApi: (id) => `${Base_URL}${id}` ,
    deleteAllProjectsApi:`${Base_URL}deleteAll`
};
