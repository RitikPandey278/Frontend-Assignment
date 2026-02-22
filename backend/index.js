const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

//Middleware setup kr

app.use(express.json());
app.use(cors());

//Root

app.get("/", (req,res)=>{
    res.send("Backend Running")
});
// Database ko connect krna

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB Connected")
    })
    .catch((err)=>{
        console.log(err)
    });

    //Routes

    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/tasks', require('./routes/taskRoutes'));

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })