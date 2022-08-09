import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import TaskContext from '../context/tasks/TaskContext';
export default function CreateTask(props) {
    const [global, setglobal] = useState(props.global)
    const [task_description, settask_description] = useState(props.task_description)
    const history = useHistory();
    const { updatetask, fetchtasks } = useContext(TaskContext)
    const ref = useRef(null);

    const changetaskdescription = () => {
        updatetask(props.id,{ task_description, global })
        ref.current.click();
        fetchtasks();
        setglobal(false)
        settask_description('')
        history.push('/tasks')
    }
    return (
        <div className="modal fade z-index-3" id="newexampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h3 className="modal-title container text-center" id="exampleModalLabel">Update Task</h3>
                    <div className="mb-3">
                        <label htmlFor="Task_Description">Task Description</label>
                        <div className="form-floating">
                            <textarea className="form-control p-2" placeholder="Leave a comment here" value={task_description} onChange={(e) => { settask_description(e.target.value) }} id="Task_Description"></textarea>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={() => { global ? setglobal(false) : setglobal(true); }} value={global} checked={global} name='global' id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Publish Global
                        </label>
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={changetaskdescription} disabled={task_description.length < 3}>Submit</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
