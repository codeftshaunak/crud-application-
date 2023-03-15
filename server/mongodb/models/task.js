import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    projectname: { type: String, required: true },
    taskname: { type: String, required: true },
    taskdescription: { type: String, required: true },
    acceptancecriteria: { type: String, required: true },
    deadline: { type: Date, required: true },
    assignee: { type: String, required: true }
});

const taskModel = mongoose.model('Task', TaskSchema);

export default taskModel;