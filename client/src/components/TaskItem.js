import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TaskItem = () => {
    const [data, setData] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [formData, setFormData] = useState({
        projectname: '',
        taskname: '',
        taskdescription: '',
        acceptancecriteria: '',
        deadline: '',
        assigne: '',
    });

    useEffect(() => {
        fetch('http://localhost:4000/api/todos')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [data]);

    const handleEdit = (task) => {
        setFormData({
            projectname: task.projectname,
            taskname: task.taskname,
            taskdescription: task.taskdescription,
            acceptancecriteria: task.acceptancecriteria,
            deadline: task.deadline,
            assigne: task.assigne,
        });
    };

    const updateSubmit = async (id) => {
        console.log(id);
        fetch(`http://localhost:4000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        console.log(formData);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/todos/${id}`)
            .then(() => {
                const updatedList = taskList.filter((task) => task._id !== id);
                setTaskList(updatedList);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/todos')
            .then((res) => setTaskList(res.data))
            .catch((err) => console.log(err));
    }, []);


    return (
        <div>
            {data.map(item => (
                <div key={item._id}>
                    <h3>{item.projectname}</h3>
                    <p>{item.taskname}</p>
                    <p>{item.taskdescription}</p>
                    <p>{item.acceptancecriteria}</p>
                    <p>{item.deadline}</p>
                    <p>{item.assigne}</p>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <input type="text" id="projectname" name="projectname" defaultValue={item.projectname} onChange={(e) =>
                                            setFormData({ ...formData, projectname: e.target.value })
                                        } />
                                        <br />
                                        <input type="text" id="taskname" name="taskname" defaultValue={item.taskname} onChange={(e) =>
                                            setFormData({ ...formData, taskname: e.target.value })
                                        } />
                                        <br />
                                        <textarea id="taskdescription" name="taskdescription" defaultValue={item.taskdescription} onChange={(e) =>
                                            setFormData({ ...formData, taskdescription: e.target.value })
                                        }></textarea>
                                        <br />
                                        <textarea id="acceptancecriteria" name="acceptancecriteria" defaultValue={item.acceptancecriteria} onChange={(e) =>
                                            setFormData({ ...formData, acceptancecriteria: e.target.value })
                                        }></textarea>
                                        <br />
                                        <input type="date" id="deadline" name="deadline" defaultValue={item.deadline} onChange={(e) =>
                                            setFormData({ ...formData, deadline: e.target.value })
                                        } />
                                        <br />
                                        <input type="text" id="assigne" name="assigne" defaultValue={item.assigne} onChange={(e) =>
                                            setFormData({ ...formData, assigne: e.target.value })
                                        } />
                                        <br />
                                        <button type="submit" onClick={() => updateSubmit(item._id)}>Update Task</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => handleEdit(item)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            ))}

        </div>
    )
}

export default TaskItem;
