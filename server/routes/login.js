const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const { get } = require("./register.js");

router.use(express.urlencoded({extended:true}));

router.route("/login")
    //get user's login status
    .get(async (req,res)=>{
        if(req.session.user){
            res.send({loggedIn:true, userId: req.session.userId})
        }else{
            res.send({loggedIn:false})
        }
    })
    //user login
    .post( async (req,res)=>{
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
})

router.post("/logout", async (req,res)=>{
    req.session.destroy((err)=>{
        // if(err){}
        res.clearCookie(SESS_NAME);
    })
})

module.exports = router;