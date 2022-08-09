import React, { useContext } from 'react'
import TaskContext from '../context/tasks/TaskContext'
const Comment = (props) => {
    const { Capital,lastUpdated} = useContext(TaskContext)
  
    return (
        <div className="card col-10 m-2 ">
            <div className="card-body text-center">
                <h5 className="card-title">{Capital(props.comment.updatedBy)}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{lastUpdated(props.comment.updatedAt)}</h6>
                <p className="card-text">{props.comment.comment}.</p>
            </div>
        </div>
    )
}

export default Comment