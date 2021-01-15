import React, { useState, useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import {UserContext} from "../App"

function  Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [showError, setShowError] = useState("hidden");
    const {dispatch} = useContext(UserContext);
    const history = useHistory();

    return (
        <main className="flex flex-col justify-center mt-4 bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <div className="flex justify-center mb-3">
                <h1 className="text-3xl">Demo</h1>
            </div>
            <div className="">
                <p className="font-bold text-2xl">Welcome</p>
                <h2 className="text-gray-600 pt-2">LogIn to your account</h2>
            </div>
            <section className="mt-5">
                <form 
                className="flex flex-col"
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
                            setShowError("block");
                            setErrMsg(data.error);
                        }else{
                            localStorage.setItem("jwt", data.token);
                            localStorage.setItem("user", JSON.stringify(data.user));
                            dispatch({type:"USER", payload:data.user});
                            history.push("/post");
                        }
                    })

                }}
                >
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(event)=> setEmail(event.target.value)}
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" 
                        placeholder="Enter your Email"
                    />
                    </div>
                    <div className="mb-1 pt-3 rounded bg-gray-200">
                        <input 
                        type="password" 
                        required 
                        value={password}
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" 
                        onChange={(event) => setPassword(event.target.value)} 
                        placeholder="password"/>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-sm text-purple-600 hover:text-purple-700 hover:underline">Forget Password?</p>
                    </div>
                    <div
                    className = {`${showError} text-red-600 px-3 py-2 mb-2 border-b-2 border-red-800 shadow-2xl flex justify-between items-center`}>
                    {errMsg}
                        <svg fill="currentColor" className="h-8 w-8 hover:text-red-700" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <button className="bg-purple-600 mt-2 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl hover:outline-none focus:outline-none transition duration-200" type="submit">Log In</button>
                </form>
            </section>
            <div className="flex justify-center items-center mt-4">
                <p className="">Dont have an account?</p>
            </div>
            <div className="flex justify-center items-center text-xl">
                <Link className="text-xl hover:underline hover:text-purple-700" to="/register">Register</Link>
            </div>
        </main>
        
    )
}

export default Login