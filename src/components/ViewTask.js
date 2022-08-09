import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'
import ChangeStatus from './ChangeStatus'
import Comment from './Comment'

const ViewTask = () => {
    const history = useHistory();
    const { temptask, Capital, lastUpdated, updatetask, deletetask } = useContext(TaskContext)
    const { USER } = useContext(UserContext)

    const [tempdes, settempdes] = useState({ task_description: temptask.task_description, global: temptask.global })
    const [tempcomment, settempcomment] = useState(temptask.comments)

    const [newcomment, setnewcomment] = useState({ comment: '' })

    const deletecurrenttask = () => {
        deletetask(temptask._id)
        history.push("/tasks")
    }
    async function sendcomment() {
        if (await updatetask(temptask._id, newcomment)) {
            settempcomment([{comment: newcomment.comment, updatedBy: USER.Name, updatedAt: new Date()}].concat(tempcomment))
            setnewcomment({ comment: '' })
        }
    }

    if (temptask === 'null')
        history.push("/tasks")
    return (
        <div className="my-2 row p-1 w-100">
            < ChangeStatus id={temptask._id} tempdes={tempdes} settempdes={settempdes} />
            <div className="col-md-7 mx-auto mt-5">
                <div className="card mx-auto">
                    <div className="card-body">
                        <h5 className="card-title">Created by : {Capital(temptask.UserName)}</h5>
                        <p className="card-text">{tempdes.task_description}.</p>
                    </div>
                    <div div className='d-flex justify-content-center'>
                        {USER._id === temptask.UserId && <i className="fa-solid fa-pen-to-square p-1 m-1" data-bs-toggle="modal" data-bs-target="#newexampleModal" type='button' ></i>}
                        {USER._id === temptask.UserId && <i className="fa-solid fa-trash p-1 m-1 " disabled onClick={deletecurrenttask}></i>}
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated {lastUpdated(temptask.createdAt)}</small>
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

                {tempcomment.length === 0 && <h2 className='text-center pb-2 mb-2'>No Comments</h2>}
                {tempcomment.length !== 0 && <h2 className='text-center pb-2 mb-2'>Comments</h2>}
                {tempcomment.length !== 0 && <div className='d-flex flex-column align-items-center card' style={{ height: '70vh', overflow: 'auto' }}>
                    {tempcomment.map((comment, i) => <Comment comment={comment} key={i} />)}
                </div>}
            </div>
        </div>
    )
}

export default ViewTask