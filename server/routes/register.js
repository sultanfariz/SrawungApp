const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { Op } = require("sequelize");

router.use(express.urlencoded({extended:true}));

router.route("/register")
    //show all user
    .get(async (req,res)=>{
        try {
            const getAllUser = res.json(await User.findAll({}));

        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    })
    //insert new user
    .post(async (req,res)=>{
        try {
            const {username, email, namalengkap, password} = req.body;

            //validate form
            if(username && email && namalengkap && password){
                //validate existed user
                const getUser = await User.findOne({
                    where: {
                        [Op.or]: [{username: username},{email:email}]
                    }
                });
                if(!getUser){
                    await bcrypt.hash(req.body.password, 10).then(async (hash)=>{
                        const newUser =  await new User({
                            username, email, namalengkap, password: hash
                        })
                        await newUser.save();
                        const message = "User successfully inserted!";
                        res.json({newUser, message:message});
                    })
                }else{throw({message: "username or email existed!"})}
            }else{throw({message: "please fill the form correctly!"})}
        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    });

router.route("/users/:id")
    //search user by id
    .get(async (req,res)=>{
        try {
            const id = req.params.id;
            const getUser = res.json(await User.findOne({
                where: {id:id}
            }));

        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    })

router.route("/register/:id")
    //edit user
    .put(async (req,res)=>{
        try {
            const {username, email, password} = req.body;
            const id = req.params.id;
            
            bcrypt.hash(req.body.password, 10).then(async (hash)=>{
                const editUser = await User.update({
                    username, email, password:hash
                },{where: {id:id}});
                await editUser; 
                return res.json('User successfully edited!');
            })

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({message:"server error"});
            }
    })
    //delete user
    .delete(async (req,res)=>{
        try {
            const id= req.params.id;
            const deleteUser = await User.destroy({
                where: {id:id}
            });
            await deleteUser; 
            res.json({message:"User successfully deleted!"})
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

module.exports = router;