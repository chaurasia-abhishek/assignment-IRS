import { useState } from "react";
import TaskContext from "./TaskContext";
const TaskState = (props) => {

    const [usertasks, settasks] = useState([])
    const URL = 'http://localhost:4040'; //backend url
    //read task
    const fetchtasks = async () => {
        let response = await fetch(`${URL}/api/task/viewtask`, { method: 'get', headers: { 'authToken': localStorage.getItem('authToken') } });
        const newtaskresponse = await response.json();
        if (newtaskresponse.success)
            settasks(newtaskresponse.data)
        else {
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : 'Unable to fetch notes' })
        }

    }

    //add task  
    const createTask = async (newtask) => {
        const jsontask = JSON.stringify(newtask)

        const response = await fetch(`${URL}/api/task/createtask`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: jsontask
        });
        const newtaskresponse = await response.json()
        if (newtaskresponse.success) {
            settasks(usertasks.concat(newtaskresponse.data))
            triggeralert({ type: 'success', msg: newtaskresponse.msg ? newtaskresponse.msg : 'task is successfully added' })
        }
        else
            triggeralert({ type: 'danger', msg: 'unable to add task' })
    }

    // delete task
    const deletetask = async (deletetaskid) => {
        const response = await fetch(`${URL}/api/task/delete/${deletetaskid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        });
        const newtaskresponse = await response.json()
        if (newtaskresponse.success) {
            settasks(usertasks.filter((task) => { return task._id !== deletetaskid }))
            triggeralert({ type: 'success', msg: 'task is successfully deleted' })
        }
        else
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : 'unable to delete the task' })
    }

    // //temp task use in edit task
    const [temptask, settemptask] = useState('null')

    const updatetask = async (id, update) => {
        const jsonupdate = JSON.stringify(update)

        const response = await fetch(`${URL}/api/task/update/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: jsonupdate
        });
        const newtaskresponse = await response.json()
        if (newtaskresponse.success) {
            await fetchtasks();
            triggeralert({ type: 'success', msg: `successfully updated/commet` })
        }
        else
            triggeralert({ type: 'danger', msg: newtaskresponse.msg ? newtaskresponse.msg : `unable to ${update}` })
    }

    //alert module
    const [alert, setalert] = useState()
    const triggeralert = (alert) => {
        setalert({ type: alert.type, msg: alert.msg })
        setTimeout(() => setalert(null), 1500)
    }

    //login status module
    const [loginstatus, setloginstatus] = useState(false)

    //other functions/methods
    const Capital = word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);

    function lastUpdated(date) {
        const PT = new Date(date);
        const CT = new Date();
        if (CT.getDay() - PT.getDay())
            return '~'+(CT.getDay() - PT.getDay()) + ' days ago'
        else if (CT.getHours() - PT.getHours())
            return '~'+(CT.getHours() - PT.getHours()) + ' hours ago'
        else if (CT.getMinutes() - PT.getMinutes())
            return '~'+(CT.getMinutes() - PT.getMinutes()) + ' minutes ago'
        else
            return '~'+(CT.getSeconds() - PT.getSeconds()) + ' seconds ago'
    }

    return (
        <TaskContext.Provider value={{ usertasks, fetchtasks, createTask, deletetask, alert, triggeralert, setalert, loginstatus, setloginstatus, Capital, temptask, settemptask, updatetask, lastUpdated }}>
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskState;