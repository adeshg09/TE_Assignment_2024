import Project from '../models/project.js'

export const createProject = async (req, res) => {

    try {

        const { name, description, skillSet, noOfMembers, isActive } = req.body;


        if (!name || !description || !skillSet || !noOfMembers) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const project = await Project.create({
            name, description, skillSet, noOfMembers, isActive
        });

        return res.status(200).json({
            success: true,
            message: `Project with name ${name} created`,
            projectDetails: project
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to create Project",
            error: e.message
        })
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: projects
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to get all projects",
            error: e.message
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, skillSet, noOfMembers, isActive } = req.body;

        const projectToBeUpdated = await Project.findById(id);
        if (!projectToBeUpdated) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                name,
                description,
                skillSet,
                noOfMembers,
                isActive
            },
            {
                new: true
            }
        )
        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: updatedProject
        })


    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: e.message
        })
    }

}

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projectToBeDeleted = await Project.findById(id);
        if (!projectToBeDeleted) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        await Project.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: e.message
        })
    }
}

export const deleteAllProjects = async (req, res) => {
    try {
        await Project.deleteMany(); 
        return res.status(200).json({
            success: true,
            message: "All projects deleted successfully"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to delete all projects",
            error: e.message
        });
    }
}