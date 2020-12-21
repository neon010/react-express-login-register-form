import React, {useState} from "react";
import axios from "axios";

function  Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>
                <h2>Register Page</h2>
            </div>
            <form onSubmit={(event)=>{
                event.preventDefault();
                const user = {
                    name: name,
                    email: email,
                    password: password
                }
                axios.post('http://localhost:5000/api/auth/user/register', user)
                    .then(res=> console.log(res))
                    .catch(error=> console.log(error))
                console.log(event.type);
            }
            }>
                <input type="text" required value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter your Name"/>
                <input type="email" required value={email} onChange={(event)=> setEmail(event.target.value)} placeholder="Enter your Email"/>
                <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password"/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register