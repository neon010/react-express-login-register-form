import React, {useContext, useEffect, useState} from "react";
//import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

function ShowPost(){
    //const history = useHistory();
    const {state} = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch("/all-user",{
            headers:{
                "auth-token":localStorage.getItem("jwt")
            }
        }).then(res=> res.json()).then(data=> setUsers(Array.from(data.users)));
    },[]);

    //console.log(typeof(users));

    return (
        <div className="mt-10 flex justify-center">
            <table className="table-fixed border-collapse border border-black">
                <thead>
                    <tr key="ghjhm">
                        <th className="border border-blue-600 ">id</th>
                        <th className="border border-blue-600 ">Name</th>
                        <th className="border border-blue-600 ">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(obj => {
                        return (
                        <tr className="border border-blue-600" key={obj.id}>
                            <td className="border border-blue-600">{obj.id}</td>
                            <td className="border border-blue-600">{obj.name}</td>
                            <td className="border border-blue-600 text-underline">{obj.email}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}
export default ShowPost