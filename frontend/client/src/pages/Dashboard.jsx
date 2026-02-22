import { useState, useEffect } from "react";
import API from "../api";

function Dashboard(){

const [tasks,setTasks]=useState([]);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [editId,setEditId]=useState(null);
const [search,setSearch]=useState("");
const [user,setUser]=useState({});

const token=localStorage.getItem("token");


// FETCH TASKS

const fetchTasks=()=>{

API.get("/tasks",{
headers:{
authorization:token
}
})
.then(res=>setTasks(res.data));

};


// FETCH USER PROFILE

const fetchProfile=()=>{

API.get("/auth/profile",{
headers:{
authorization:token
}
})
.then(res=>setUser(res.data));

};


useEffect(()=>{

fetchTasks();
fetchProfile();

},[]);


// ADD TASK

const addTask=async()=>{

if(!title) return alert("Enter title");

await API.post("/tasks",
{
title,
description
},
{
headers:{
authorization:token
}
});

setTitle("");
setDescription("");

fetchTasks();

};


// DELETE TASK

const deleteTask=async(id)=>{

await API.delete("/tasks/"+id,{
headers:{
authorization:token
}
});

fetchTasks();

};


// EDIT TASK

const editTask=(task)=>{

setTitle(task.title);
setDescription(task.description);

setEditId(task._id);

};


// UPDATE TASK

const updateTask=async()=>{

await API.put("/tasks/"+editId,
{
title,
description
},
{
headers:{
authorization:token
}
});

setEditId(null);
setTitle("");
setDescription("");

fetchTasks();

};


// LOGOUT

const logout=()=>{

localStorage.removeItem("token");

window.location="/login";

};



return(

<div className="min-h-screen bg-gray-100 p-6">


{/* Top Bar */}

<div className="flex justify-between items-center mb-6">

<div>

<h1 className="text-3xl font-bold">
Dashboard
</h1>

<p className="text-gray-600">

Welcome {user.name}

</p>

</div>


<button
onClick={logout}
className="bg-red-500 text-white px-4 py-2 rounded">

Logout

</button>

</div>



{/* Add Task Card */}

<div className="bg-white p-6 rounded shadow max-w-md">

<h2 className="text-xl mb-3">

{editId?"Edit Task":"Add Task"}

</h2>


<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 mb-3 w-full"
/>


<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border p-2 mb-3 w-full"
/>


{editId ?

<button
onClick={updateTask}
className="bg-blue-500 text-white p-2 w-full rounded">

Update Task

</button>

:

<button
onClick={addTask}
className="bg-green-500 text-white p-2 w-full rounded">

Add Task

</button>

}


</div>



{/* Search */}

<input
placeholder="Search Tasks"
className="border p-2 mt-6 mb-6 w-full max-w-md"
onChange={(e)=>setSearch(e.target.value)}
/>



{/* Task Cards */}

<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">


{tasks
.filter(task =>
task.title.toLowerCase().includes(search.toLowerCase())
)
.map(task=>(

<div
key={task._id}
className="bg-white p-5 rounded shadow">


<h3 className="text-xl font-bold">

{task.title}

</h3>


<p className="text-gray-600">

{task.description}

</p>


<div className="flex gap-3 mt-4">


<button
onClick={()=>editTask(task)}
className="bg-yellow-500 text-white px-3 py-1 rounded">

Edit

</button>


<button
onClick={()=>deleteTask(task._id)}
className="bg-red-500 text-white px-3 py-1 rounded">

Delete

</button>


</div>


</div>

))}


</div>


</div>

)

}

export default Dashboard;
