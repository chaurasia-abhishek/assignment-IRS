import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'
import ChangeStatus from './ChangeStatus'
import Comment from './Comment'

const ViewTask = () => {
    const history = useHistory();
    const { temptask, Capital, lastUpdated, updatetask } = useContext(TaskContext)
    const { deletetask } = useContext(TaskContext)
    const { USER } = useContext(UserContext)
    const [newcomment, setnewcomment] = useState({ comment: '' })
    const temp = temptask;
    const deletecurrenttask = () => {
        deletetask(temp._id)
        history.push("/tasks")
    }
    function sendcomment() {
        updatetask(temp._id, newcomment)
        setnewcomment({ comment: '' })
    }

    if (temp === 'null')
        history.push("/tasks")
    useEffect(() => { }, [temp])
    return (
        <div className="my-2 row p-1 w-100">
            < ChangeStatus task_description={temp.task_description} id={temp._id} global={temp.global} />
            <div className="col-md-7 mx-auto mt-5">
                <div className="card mx-auto">
                    <div className="card-body">
                        <h5 className="card-title">Created by : {Capital(temp.UserName)}</h5>
                        <p className="card-text">{temp.task_description}.</p>
                    </div>
                    <div div className='d-flex justify-content-center'>
                        {USER._id === temptask.UserId && <i className="fa-solid fa-pen-to-square p-1 m-1" data-bs-toggle="modal" data-bs-target="#newexampleModal" type='button' ></i>}
                        {USER._id === temptask.UserId && <i className="fa-solid fa-trash p-1 m-1 " disabled onClick={deletecurrenttask}></i>}
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated {lastUpdated(temp.createdAt)}</small>
                    </div>
                </div>
                <div className="my-3 card-body">
                    <h5 className='p-1 mb-1'>Comment</h5>
                    <div className="form-floating">
                        <textarea className="form-control p-2" placeholder="Leave a comment here" value={newcomment.comment} onChange={e => setnewcomment({ comment: e.target.value })} id="comment"></textarea>
                    </div><i className="fa-solid fa-paper-plane float-end m-2 p-1" onClick={sendcomment}></i>
                </div>
            </div>

            <div className="col-md-4 mx-auto">
                <h2 className='text-center pb-2 mb-2'>Comments</h2>
                <div className='d-flex flex-column align-items-center card' style={{ height: '70vh', overflow: 'auto' }}>
                    {temp.comments.map((comment, i) => <Comment comment={comment} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default ViewTask