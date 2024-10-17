import mongoose from 'mongoose'


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skillSet: {
        type: [String],
        required: true,
    },
    noOfMembers: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Project = mongoose.model.Project || mongoose.model("Project", projectSchema)
export default Project;