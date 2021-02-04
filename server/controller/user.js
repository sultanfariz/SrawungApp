const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { Op } = require("sequelize");

router.use(express.urlencoded({extended:true}));

//REGISTER CONTROLLER
    //show all user
exports.index = async (req,res)=>{
    try {
        const getAllUser = res.json(await User.findAll({}));

    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}
    //insert new user
exports.register = async (req,res)=>{
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
};

    //search user by id
exports.show = async (req,res)=>{
    try {
        const id = req.params.id;
        const getUser = res.json(await User.findOne({
            where: {id:id}
        }));

    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
} 

    //edit user
exports.edit = async (req,res)=>{
    try {
        const {username, email, namalengkap, password} = req.body;
        const id = req.params.id;
        
        bcrypt.hash(req.body.password, 10).then(async (hash)=>{
            const editUser = await User.update({
                username, email, namalengkap, password:hash
            },{where: {id:id}});
            await editUser; 
            return res.json({editUser:{id, username, email, namalengkap, password:hash}, message:'User successfully edited!'});
        })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message:"server error"});
        }
}
    //delete user
exports.delete = async (req,res)=>{
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
};


//LOGIN CONTROLLER
    //get user's login status
exports.auth = async (req, res) => {
    let sess = req.session;
    console.log('This session has an id of ', sess.id);
    res.send({userId: sess.id})
}

    //user login
exports.login = async (req,res)=>{
    try {
        const {username, password} = req.body;

        if(username && password){
            const getUser = await User.findOne({
                where: {username:username}
            });
            if(!getUser){
                return res.status(401).json({message:"Username tidak terdaftar"});
            }
            bcrypt.compare(req.body.password, getUser.password).then(result=>{
                if(result){
                    req.session.userId = getUser.id;
                    // console.log("berhasil login");
                    return res.status(200).json({message: "Selamat anda berhasil login", username: username});
                }else{
                    // console.log("gagal login");
                    return res.status(401).json({message: "Password salah !"});
                }
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message:"server error"});
    }
}

exports.logout = async (req,res)=>{
    req.session.destroy((err)=>{
        res.clearCookie(SESS_NAME);
    })
}