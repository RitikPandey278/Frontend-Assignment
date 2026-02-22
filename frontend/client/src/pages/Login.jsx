import React, {useState} from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();


const handleLogin=async(e)=>{

e.preventDefault();

try{

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);

alert("Login Successful");

navigate("/dashboard");

}catch(err){
    console.log(err)

alert("Login Failed");

}

};



return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form onSubmit={handleLogin}
className="bg-white p-8 rounded shadow-md w-96">

<h2 className="text-2xl font-bold mb-4">
Login
</h2>


<input
type="email"
placeholder="Email"
className="w-full p-2 mb-4 border"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
className="w-full p-2 mb-4 border"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
className="w-full bg-blue-500 text-white p-2 rounded">

Login

</button>


</form>

</div>

);

};

export default Login;