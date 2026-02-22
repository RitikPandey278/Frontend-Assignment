import axios from "axios";

const API=axios.create({

baseURL: "https://taskmanagement-backend-072e.onrender.com/api"

});

export default API;

//http://localhost:5000/api