import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'
 
export const Task = (props) => {
  const history = useHistory();
  const { task_description = 'this is task_description', UserName = 'this is creator of task'  , createdAt } = props.task
  const { Capital, settemptask, lastUpdated } = useContext(TaskContext)
  const viewtask = () => {
    settemptask(props.task);
    history.push('/viewtask')
  }
  return (
    <div className='col-md-4 mb-4'>
      <div className="card-body d-flex flex-column align-items-center py-2 py-1 form-control border-dark m-auto" >
        <h5 className="card-title text-justified">Created by : {Capital(UserName)}</h5>
        <h6>{lastUpdated(createdAt)}</h6>
        <p className="card-text m-0 text-center">Task : {task_description} </p>
        <div className='m-auto p-3 '>
          <button type='btn btn-primary btn-sm' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={viewtask}>View Task Log</button>
        </div>
      </div>
    </div>
  )
}
