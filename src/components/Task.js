import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'

export const Task = (props) => {
  const history = useHistory();
  const { task_description = 'this is task_description', UserName = 'this is creator of task', createdAt } = props.task
  const { Capital, settemptask, lastUpdated, URL, checkdoc } = useContext(TaskContext)
  const viewtask = () => {
    settemptask(props.task);
    history.push('/viewtask')
  }

  return (

    <div className='col-md-4 mb-4' >

      < div className={`card text-center p-3`}>
        <h5 className="card-title mb-3">Created by : {Capital(UserName)}</h5>
        <img src={`${URL}/static/files/${checkdoc(props.task.docs)}`} className="card-img-top" alt="profile" />
        <div className="card-body">
          <footer className="blockquote-footer mb-1">Dated : <cite>{lastUpdated(createdAt)}</cite></footer>
          <p className="card-text">{task_description}</p>

          {props.task.docs && <a href={`${URL}/static/files/${props.task.docs}`} target="blank" className='p-1'>Document-link</a>}
          <div className='m-auto p-3 '>
            <button type='btn btn-primary btn-sm' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={viewtask}>View Task</button>
          </div>
        </div>
      </div>
    </div>

  )
}
