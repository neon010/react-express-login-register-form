import Axios from "axios";
import React, { useState } from "react";

function  Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>
                <h2>Login Page</h2>
            </div>
            <form onSubmit={(event)=> {
                event.preventDefault();
                const currentUser = {
                    email,
                    password
                }
                Axios.post('http://localhost:5000/api/auth/user/login', currentUser)
                    .then(res=> console.log(res.data))
                    .catch((error)=> console.log(error));
            }}
            >
                <input type="email" required value={email} onChange={(event)=> setEmail(event.target.value)} placeholder="Enter your email"/>
                <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
        
    )
}

export default Login