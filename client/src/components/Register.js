import React, {useState} from "react";
import { Link , useHistory} from "react-router-dom";

function  Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                            alert(data.error);
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
                <div className="mt-3">
                    <button className="bg-green-700 p-3 text-xl text-white rounded hover:opacity-80 transform hover:scale-95" type="submit">Register</button>
                </div>
            </form>
            <div className="flex flex-col justify-center items-center">
                <p>Already have an account?</p>
                <Link className="text-2xl text-black mb-4 transform hover:scale-105" to="/login">Log In</Link>
            </div>
        </main>
    )
}

export default Register