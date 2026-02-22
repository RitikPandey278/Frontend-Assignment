const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const auth = require("../middleware/authMiddleware");

// Register
router.post("/register", async(req,res)=>{

     try{

                const {name,email,password}=req.body;

                const hashedPassword=await bcrypt.hash(password,10);

                const user=new User({
                name,
                email,
                password:hashedPassword
                });

                await user.save();

                res.json({message:"User Registered"});

                }catch(err){

                console.log(err);

                res.status(500).json({message:"Error"});

                }

                });

                // Login

                router.post("/login", async(req,res)=>{

                try{

                const {email,password}=req.body;

                const user=await User.findOne({email});

                if(!user)
                return res.status(400).json({message:"User not found"});

                const match=await bcrypt.compare(password,user.password);

                if(!match)
                return res.status(400).json({message:"Wrong password"});

                const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET
                );

                res.json({token});

                }catch(err){

                res.status(500).json({message:"Error"});

                }

                });
                router.get("/profile", auth, async(req,res)=>{

                    const user = await User.findById(req.user.id).select("-password")
                    .select("-password");
                    res.json(user);

                    });

module.exports=router;