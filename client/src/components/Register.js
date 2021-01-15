import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";


function  Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [showError, setShowError] = useState("hidden");
    const history = useHistory();


    return (
        <main className="flex flex-col justify-center mt-4 bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <div className="mt-4 ml-2 flex justify-center items-center">
                <h1 className="text-4xl text-black">Demo</h1>
            </div>
            <div className="mt-10 ml-2">
                <h2 className="text-2xl text-black">Register</h2>
            </div>
            <hr className="mt-2"/>

            <form 
            className="ml-2 mt-2 mr-2"
            onSubmit={(event)=> {
                event.preventDefault();
                //console.log({name,email,password});
                fetch('/signup',{
                    method: "post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({name,email,password})
                }).then(res => res.json())
                    .then(data=> {
                        if(data.error){
                            setShowError("block");
                            setErrMsg(data.error);
                        }else{
                            alert(data.message);
                            history.push("/login");
                        }
                    });
            }}
            >   
                <div className="mt-2">
                    <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(event)=> setName(event.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full 
                    py-2 px-4 text-gray-700 leading-tight hover:border-green-800 focus:outline-none focus:bg-white focus:border-teal-500" 
                    placeholder="Enter your name"
                />
                </div>                
                <div className="mt-2">
                    <input 
                    type="text" 
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
                <div
                    className = {`${showError} text-red-600 px-3 py-4 border-b-2 border-red-800 shadow-2xl flex justify-between items-center`}>
                    {errMsg}
                    <svg fill="currentColor" className="h-8 w-8 hover:text-red-700" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"></path>
                    </svg>
                </div>
                <div className="mt-3">
                    <button className="bg-green-700 p-3 text-xl text-white rounded hover:opacity-80 hover:outline-none focus:outline-none transform hover:scale-95" type="submit">Register</button>
                </div>
            </form>
            <hr className="mt-4"/>
            <div className="flex flex-col justify-center items-center mt-2">
                <p>Already have an account?</p>
                <Link className="text-2xl text-black mb-2 transform hover:scale-105" to="/login">Log In</Link>
            </div>
        </main>
    )
}

export default Register