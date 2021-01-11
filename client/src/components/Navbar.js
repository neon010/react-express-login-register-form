import React,{useContext} from "react";
import { Link,useHistory } from 'react-router-dom';
import {UserContext} from "../App";

function  Navabar() {
    const {dispatch,state} = useContext(UserContext);
    const history = useHistory();

    const renderList = () =>{
        if(state){
            return (
                [
                    <button 
                    className="lg:p-4 py-3 px-0 block border-b-2 text-2xl text-black border-transparent outline-none"
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        history.push("/login");
                    }}>Log out</button>
                ]
            )
        }else{
            return [
                <li>
                <Link to="/login" className="lg:p-4 py-3 px-0 block border-b-2 text-2xl text-black border-transparent hover:hover-indigo-400 transform hover:scale-95">LogIn</Link>
            </li>,
            <li>
                <Link to="/register" className="lg:p-4 py-3 px-0 block border-b-2 text-2xl text-black border-transparent hover:hover-indigo-400 transform hover:scale-95">Register</Link>
            </li>
            ]
        }
    }
    console.log(state);
    return (
        <header className="lg:px-16 px-6 bg-purple-600 bg-opacity-75 flex flex-wrap items-center lg:py-0 py-2">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/" className="Nav-brand">UserAuth Demo</Link>
            </div>
            <div className="flex  items-center">
                <ul className="lg:flex  lg:items-center text-base text-gray-700 pt-4 lg:pt-0 text-xl">
                    {renderList()}
                </ul>
            </div>
        </header>
    )
}

export default Navabar