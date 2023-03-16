import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
    const [formData, setFormData] = useState({
        projectname: '',
        taskname: '',
        taskdescription: '',
        acceptancecriteria: '',
        deadline: '',
        assigne: '',
    });
    // const [taskList, setTaskList] = useState([]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/todos', formData);
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

    // const handleEdit = (id, updatedTask) => {
    //     axios.put(`http://localhost:4000/api/todos/${id}`, updatedTask)
    //         .then((res) => {
    //             const updatedList = taskList.map((task) => {
    //                 if (task._id === res.data._id) {
    //                     return res.data;
    //                 } else {
    //                     return task;
    //                 }
    //             });
    //             setTaskList(updatedList);
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const handleDelete = (id) => {
    //     console.log(id);
    //     axios.delete(`http://localhost:4000/api/todos/${id}`)
    //         .then(() => {
    //             const updatedList = taskList.filter((task) => task._id !== id);
    //             setTaskList(updatedList);
    //         })
    //         .catch((err) => console.log(err));
    // };

    // useEffect(() => {
    //     axios.get('http://localhost:4000/api/todos')
    //         .then((res) => setTaskList(res.data))
    //         .catch((err) => console.log(err));
    // }, []);


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="projectname">Project Name:</label>
                    <input type="text" id="projectname" name="projectname" value={formData.projectname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="taskname">Task Name:</label>
                    <input type="text" id="taskname" name="taskname" value={formData.taskname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="taskdescription">Task Description:</label>
                    <textarea id="taskdescription" name="taskdescription" value={formData.taskdescription} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="acceptancecriteria">Acceptance Criteria:</label>
                    <textarea id="acceptancecriteria" name="acceptancecriteria" value={formData.acceptancecriteria} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="deadline">Deadline:</label>
                    <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="assigne">Assignee:</label>
                    <input type="text" id="assigne" name="assigne" value={formData.assigne} onChange={handleChange} />
                </div>
                <button type="submit">Create Task</button>
            </form>

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
