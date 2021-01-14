import React, { useState, useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import {UserContext} from "../App"

function  Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <input 
                        type="password" 
                        required 
                        value={password}
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" 
                        onChange={(event) => setPassword(event.target.value)} 
                        placeholder="password"/>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-2">Forget Password?</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Log In</button>
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