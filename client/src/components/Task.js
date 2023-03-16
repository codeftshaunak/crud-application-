import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
    const url = 'http://localhost:4000/api/todos';
    const [formData, setFormData] = useState({
        projectname: '',
        taskname: '',
        taskdescription: '',
        acceptancecriteria: '',
        deadline: '',
        assigne: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(url, formData);
            console.log(response.data);

            // clear form data
            setFormData({
                projectname: '',
                taskname: '',
                taskdescription: '',
                acceptancecriteria: '',
                deadline: '',
                assigne: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="crud"><h1>Assign Task</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="projectname">Project Name:</label>
                        <input type="text" id="projectname" name="projectname" value={formData.projectname} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="taskname">Task Name:</label>
                        <input type="text" id="taskname" name="taskname" value={formData.taskname} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="taskdescription">Task Description:</label>
                        <textarea id="taskdescription" name="taskdescription" value={formData.taskdescription} onChange={handleChange} required></textarea>
                    </div>
                    <div>
                        <label htmlFor="acceptancecriteria">Acceptance Criteria:</label>
                        <textarea id="acceptancecriteria" name="acceptancecriteria" value={formData.acceptancecriteria} onChange={handleChange} required></textarea>
                    </div>
                    <div>
                        <label htmlFor="deadline">Deadline:</label>
                        <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="assigne">Assignee:</label>
                        <input type="text" id="assigne" name="assigne" value={formData.assigne} onChange={handleChange} required />
                    </div>
                    <button type="submit">Create Task</button>
                </form>
            </div>
            {/* <div className="task__list">
                {taskList.map((task) => (
                    <div key={task._id}>
                        <h3>{task.taskname}</h3>
                        <p>{task.taskdescription}</p>
                        <p>{task.acceptancecriteria}</p>
                        <p>{task.deadline}</p>
                        <p>{task.assigne}</p>
                        <button onClick={() => handleEdit(task._id)}>Edit</button>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                ))}
            </div> */}

        </>

    );
};

export default Task;
