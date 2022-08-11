import React, { useContext } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import UserContext from '../context/users/UserContext'

const UserProfile = () => {
    const { USER, Capital, URL } = useContext(UserContext)
    const { checkdoc } = useContext(TaskContext)
    return (
        <>
            <div className='mx-auto' style={{ width: '25rem' }}>
                <div className="mx-auto mt-2" style={{ width: '10rem' }}>
                    <img src={`${URL}/static/files/${USER.UserProfile?checkdoc(USER.UserProfile):'userlogo.png'}`}  style={{ width: '10rem' }} className='align-self-center' alt="profile" />
                </div>
                <div className="card-body">
                    <table className='m-auto my-3'>
                        <tbody >
                            <tr><th><span className='h2 p-2'>Name</span></th><td><span className='h2 p-2'>{Capital(USER.Name)}</span></td></tr>
                            <tr><th><span className='h2 p-2'>Role</span></th><td><span className='h2 p-2'>{USER.Role}</span></td></tr>
                            <tr><th><span className='h2 p-2'>Email</span></th><td><span className='h2 p-2'>{USER.Email}</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='d-flex p-3 flex-wrap justify-content-center'>
                <button type='button' className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal4">Change Profile</button>
                <button type='button' className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Task</button>
            </div>
        </>
    )
}

export default UserProfile