import React, { useContext, useEffect } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'
import { useHistory } from 'react-router-dom'
import { Task } from './Task'

const Tasks = () => {
  const { fetchtasks, usertasks } = useContext(TaskContext)
  const { FETCHUSER, loginstatus } = useContext(UserContext)
  const history = useHistory()
  useEffect(() => {
    if (loginstatus)
      fetchtasks()
    else if (localStorage.getItem('authToken')) {
      FETCHUSER();
      fetchtasks()
    }
    else {
      history.push("/login")
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="container mt-4">
      <h3 className='text-center mb-4'>{usertasks.length === 0 ? 'No Task' : 'Tasks'}</h3>
      <div className="row">
        {usertasks.length !== 0 && usertasks.map((T, i) => <Task key={i} task={T} />) }
      </div>
    </div>
  )
}

export default Tasks