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
                    className="lg:p-4 py-3 px-0 block border-b-2 text-2xl text-white text-black border-transparent focus:outline-none"
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        history.push("/login");
                    }}>Log out</button>
                ]
            )
        }else{
            return [
                <li key="1">
                <Link to="/login" className="lg:p-4 py-3 px-0  block border-b-2 text-2xl text-white text-black border-transparent transform hover:scale-95">LogIn</Link>
            </li>,
            <li key="2">
                <Link to="/register" className="lg:p-4 py-3 px-0 block border-b-2 text-2xl text-white text-black border-transparent transform hover:scale-95">Register</Link>
            </li>
            ]
        }
    }
    return (
        <header className="lg:px-16 px-6 bg-purple-600 bg-opacity-75 flex flex-wrap items-center lg:py-0 py-2">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/" className="text-white text-2xl">Demo</Link>
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