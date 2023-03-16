import React, { useState } from 'react';

const Notes = () => {
    const [formData, setFormData] = useState({
        projectname: '',
        taskname: '',
        taskdescription: '',
        acceptancecriteria: '',
        deadline: '',
        assigne: '',

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //   const response = await axios.post('http://localhost:8080/api/v1/tasks', formData);
            const response = await fetch('http://localhost:8080/api/v1/tasks', {
                method: "POST",
                headers: { 'Content-Type': 'application.json' },
                body: formData,
            })
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Project Name:
                <input type="text" name="projectname" value={formData.projectname} onChange={handleInputChange} required />
            </label>
            <label>
                Task Detail:
                <textarea name="taskname" value={formData.taskname} onChange={handleInputChange} required />
            </label>
            <label>
                Task Description:
                <textarea name="taskdescription" value={formData.taskdescription} onChange={handleInputChange} required />
            </label>
            <label>
                Acceptance Criteria:
                <textarea name="acceptancecriteria" value={formData.acceptancecriteria} onChange={handleInputChange} required />
            </label>
            <label>
                Deadline:
                <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} required />
            </label>
            <label>
                Assigne:
                <input type="text" name="assigne" value={formData.assigne} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Notes;
