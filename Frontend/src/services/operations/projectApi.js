import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { projectEndpoints } from "../apis";

const {
    getProjectsApi,
    addProjectApi,
    editProjectApi,
    deleteProjectApi,
    deleteAllProjectsApi
} = projectEndpoints;

export const getAllProjects = async () => {
    const toastId = toast.loading("Loading projects...");
    let result;
    try {
        const response = await apiConnector("GET", getProjectsApi);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch Projects");
        }
        result = response.data;
    } catch (e) {
        console.log("getAllProjects Api Error", e);
        console.error(e.message || "Error fetching projects", { id: toastId });
    } finally {
        toast.dismiss(toastId);
    }
    return result;
};

export const addProject = async (data) => {
    const toastId = toast.loading("Adding project...");
    let result;
    try {
        const response = await apiConnector("POST", addProjectApi, data);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to add Project");
        }
        result = response.data;
        toast.success("Project Added Successfully", { id: toastId });


        setTimeout(() => toast.dismiss(toastId), 2000);
    } catch (e) {
        console.log("AddProject Api Error", e);
        toast.error(e.message || "Error adding project", { id: toastId });
        toast.dismiss(toastId);
    }
    return result;
};

export const updateProject = async (id, updatedProject) => {
    const toastId = toast.loading("Updating project...");
    let result;
    try {
        const response = await apiConnector("PUT", editProjectApi(id), updatedProject);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to update Project");
        }
        result = response.data;
        
        toast.success("Project Updated Successfully", { id: toastId });


        setTimeout(() => toast.dismiss(toastId), 2000);
    } catch (error) {
        toast.error("Error updating project: " + error.message, { id: toastId });
        toast.dismiss(toastId);
    }
    return result;
};

export const deleteProject = async (id) => {
    const toastId = toast.loading("Deleting project...");
    try {
        const response = await apiConnector("DELETE", deleteProjectApi(id));
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to delete Project");
        }
        
        toast.success("Project Deleted Successfully", { id: toastId });

  
        setTimeout(() => toast.dismiss(toastId), 2000);
    } catch (e) {
        console.log("DeleteProject Api Error", e);
        toast.error(e.message || "Error deleting project", { id: toastId });
        toast.dismiss(toastId);
    }
};


export const deleteAllProjects = async () => {
    const toastId = toast.loading("Deleting all projects...");

    try {
        const response = await apiConnector("DELETE", deleteAllProjectsApi);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to delete all projects");
        }
        toast.success("All projects deleted successfully", { id: toastId });
    } catch (e) {
        console.log("DeleteAllProjects Api Error", e);
        toast.error(e.message || "Error deleting all projects", { id: toastId });
    } finally {
        toast.dismiss(toastId);
    }

};
