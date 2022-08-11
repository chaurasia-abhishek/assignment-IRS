import { useState } from "react";
import UserContext from "./UserContext";
const UserState = (props) => {
    //islogin
    const [loginstatus, setloginstatus] = useState(false)
    // const URL = 'http://localhost:4040'; //backend url

    const URL = 'http://52.41.128.88:4040'; //backend url

    //loginned user detail
    const [USER, SETUSER] = useState({
        "_id": "62f206705d43c9f4",
        "Name": "guest",
        "Email": "guest@gmail.com",
        "Role": "Team Member",
        "Date": "2022-08-09T07:02:08.549Z",
        "__v": 0
    })
    const [allusers, setalluseres] = useState([])

    //users detalils
    const fetchusers = async () => {
        let response = await fetch(`${URL}/api/user/viewuser`, { method: 'get', headers: { 'authToken': localStorage.getItem('authToken') } });
        let data = await response.json();
        setalluseres(data.teamUsers)
    }
    //fetching current user details
    const FETCHUSER = async () => {
        let response = await fetch(`${URL}/api/user/fetchuser`, { method: 'post', headers: { 'authToken': localStorage.getItem('authToken') } });
        let data = await response.json();
        if (data.success) {
            SETUSER(data.user)
            setloginstatus(true)
        }
        else
            triggeralert({ type: 'danger', msg: data.msg ? data.msg : 'unable to fetch users please login again' })

    }

    //user login auth
    const USERAUTH = async (usercredentials) => {
        const jsonusercredentialslogin = JSON.stringify(usercredentials)
        const response = await fetch(`${URL}/api/user/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: jsonusercredentialslogin
        });
        const logintoken = await response.json()
        if (logintoken.success) {
            localStorage.setItem('authToken', logintoken.authToken)
            triggeralert({ type: 'success', msg: 'you are logined successfully ' })
        }
        else
            triggeralert({ type: 'danger', msg: logintoken.msg ? logintoken.msg : logintoken.error })
        return logintoken.success
    }

    //new user signup auth
    const SIGNUPAUTH = async (newusercredentials) => {
        const jsonnewusercredentialslogin = JSON.stringify(newusercredentials)
        const response = await fetch(`${URL}/api/user/signup`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: jsonnewusercredentialslogin
        });
        const logintoken = await response.json()
        if (logintoken.success) {
            localStorage.setItem('authToken', logintoken.authToken)
            triggeralert({ type: 'success', msg: 'Signup successfully' })
        }
        else
            triggeralert({ type: 'danger', msg: logintoken.msg ? logintoken.msg : logintoken.error })
        return logintoken.success
    }


    //updateprofile
    const USERPROFILEUPDATE = async (updateddata) => {
        console.log(updateddata)
        const formData = new FormData();
        formData.append('Name', updateddata.tempprofile.Name)
        formData.append('Email', updateddata.tempprofile.Email)
        formData.append('userdocs', updateddata.userdocs)
        const response = await fetch(`${URL}/api/user/updateprofile`, {
            method: 'put',
            headers: {
                'authToken': localStorage.getItem('authToken')
            },
            body: formData
        });
        const update = await response.json()
        if (update.success) {
            triggeralert({ type: 'success', msg: 'profile updated successfully' })
            FETCHUSER()
        }
        else
            triggeralert({ type: 'danger', msg: update.msg ? update.msg : update.error })
        return update.success
    }


    //alert module
    const [Alert, setalert] = useState()
    const triggeralert = (alert) => {
        setalert({ type: alert.type, msg: alert.msg })
        setTimeout(() => setalert(null), 1500)
    }

    const Capital = word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);


    return <UserContext.Provider value={{ URL, allusers, fetchusers, SETUSER, USER, FETCHUSER, USERAUTH, SIGNUPAUTH, USERPROFILEUPDATE, loginstatus, setloginstatus, Alert, triggeralert, Capital }}>
        {props.children}
    </UserContext.Provider>

}

export default UserState;