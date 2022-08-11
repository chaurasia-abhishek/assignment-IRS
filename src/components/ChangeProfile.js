import React, { useContext, useRef, useState } from 'react'
import UserContext from '../context/users/UserContext';

export default function ChangeProfile() {
    const { USER, USERPROFILEUPDATE } = useContext(UserContext)
    const [tempprofile, settempprofile] = useState({ Name: USER.Name, Email: USER.Email })
    const [userdocs, setuserdocs] = useState()
    const ref = useRef(null);

    const onchange = (event) => {
        settempprofile({ ...tempprofile, [event.target.name]: event.target.value })
    }
    const updateprofile = async (e) => {
        e.preventDefault();
        if (await USERPROFILEUPDATE({ userdocs, tempprofile }))
            ref.current.click();
    }

    return (
        <div className="modal fade z-index-3" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">
                    <h3 className="modal-title container text-center" id="exampleModalLabel">Create Task Here!</h3>

                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input autoComplete="off" type="Name" className={`form-control ${tempprofile.Name.length > 0 && tempprofile.Name.length < 3 ? 'border-danger' : ''}`} name='Name' value={tempprofile.Name} onChange={onchange} id="exampleInputName1" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input autoComplete="off" type="Email" className={`form-control ${tempprofile.Email.length > 0 && !tempprofile.Email.includes('@') ? 'border-danger' : ''}`} name='Email' value={tempprofile.Email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className=" mb-3">
                        <label className="form-label" htmlFor="inputGroupFile02">Update Profile</label>
                        <input type="file" encType="multipart/form-data" name='userdocs' onChange={(e) => { setuserdocs(e.target.files[0]) }} className="form-control" id="inputGroupFile02" />
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={updateprofile} disabled={tempprofile.Name === '' || tempprofile.Email === '' || !tempprofile.Email.includes('@')}>Update Profle</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>

                    </div>

                </div>
            </div>
        </div>

    )
}
