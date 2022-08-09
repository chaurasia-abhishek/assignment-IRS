import React, { useContext, useRef, useState } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'

export default function CreateTask() {
    const [global, setglobal ] = useState(false)
    const { createTask } = useContext(TaskContext)
    const [task_description, settask_description] = useState('')
    const ref = useRef(null);

    const submitnote = () => {
        createTask({task_description,global})
        ref.current.click();
        setglobal(false)
        settask_description('')
    }
    return (
        <div className="modal fade z-index-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h3 className="modal-title container text-center" id="exampleModalLabel">Create Task Here!</h3>
                    <div className="mb-3">
                        <label htmlFor="task_description" className="form-label">Task</label>
                        <textarea className={`form-control ${task_description.length < 3 ? 'border-danger' : ''}`} id="task_description" value={task_description} name="task_description" onChange={(e)=>{settask_description(e.target.value)}} placeholder="Enter the task (minimum 3 characters)"></textarea>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name='global' value={global} checked={global} onChange={() => { global?setglobal(false):setglobal(true)}} id="flexCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Publish Global
                            </label>
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={submitnote} disabled={task_description.length < 3}>Create Task</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
