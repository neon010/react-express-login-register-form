import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

function ShowPost(){
    const history = useHistory();
    const {state} = useContext(UserContext);
    console.log(state);

    return (
        <div>
            <div>
                <h2>{state.name}</h2>
                <h2>{state.email}</h2>
            </div>
        </div>
    )
}
export default ShowPost