import React, { useContext } from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App"

function ShowPost(){
    const history = useHistory();
    const {dispatch} = useContext(UserContext);

    return (
        <div>
            <div>
                <button onClick={()=>{
                    localStorage.clear();
                    dispatch({type:"CLEAR"})
                    history.push("/signin");
                }}>Log out</button>
            </div>
        </div>
    )
}
export default ShowPost