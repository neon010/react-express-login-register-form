import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

function ShowPost(){
    const history = useHistory();
    const {state} = useContext(UserContext);
    const [users,setUsers] = useState("");

    useEffect(()=>{
        fetch("/all-user",{
            headers:{
                "auth-token":localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(data=>setUsers(data.users));
    },[users]);

    return (
        <div>
            <ul>
                {users.map(obj =>{
                    return (
                        <li key={obj.id}>{obj.name}: {obj.email}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default ShowPost