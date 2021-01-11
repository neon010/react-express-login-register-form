import React, { useState, useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import {UserContext} from "../App"

function  Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    return (
        <div className="bg-gray-800 mt-10 m-auto w-96 h-96 shadow-2xl rounded-md">
            <div className="mt-4 ml-2 ">
                <h1 className="text-4xl text-white">User Auth Demo</h1>
            </div>
            <div className="mt-10 ml-2">
                <h2 className="text-2xl text-white">Log In</h2>
            </div>
            <hr className="mt-2"/>
            <div className="mt-2 flex justify-end mr-2 hover:cursor-pointer">
                <p className="text-green-700">Forget Password?</p>
            </div>
            <form 
            className="ml-2 mt-2 mr-2"
            onSubmit={(event)=> {
                event.preventDefault();
                fetch("/login",{
                    method: "post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        password,
                        email
                    })
                }).then(res => res.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else{
                        localStorage.setItem("jwt", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        dispatch({type:"USER", payload:data.user});
                        history.push("/post");
                    }
                })

            }}
            >
                <div className="mt-2">
                    <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(event)=> setEmail(event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full 
                    py-2 px-4 text-gray-700 leading-tight hover:border-green-800 focus:outline-none focus:bg-white focus:border-teal-500" 
                    placeholder="Enter your Email"
                />
                </div>
                <div className="mt-2">
                    <input 
                    type="password" 
                    required 
                    value={password}
                    className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full 
                    py-2 px-4 text-gray-700 leading-tight hover:border-green-800 focus:outline-none focus:bg-white focus:border-teal-500" 
                    onChange={(event) => setPassword(event.target.value)} 
                    placeholder="password"/>
                </div>
                <div className="mt-3">
                    <button className="bg-green-700 p-3 text-xl text-white rounded hover:opacity-80 transform hover:scale-95" type="submit">Log In</button>
                </div>
            </form>
            <div className="flex justify-center">
                <p className="text-xl text-white">Dont have an account?</p>
            </div>
            <div className="flex justify-center">
                <Link className="text-2xl text-white hover:opacity-80 transform hover:scale-105" to="/register">Register</Link>
            </div>
        </div>
        
    )
}

export default Login