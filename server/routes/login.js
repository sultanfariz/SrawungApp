const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const { get } = require("./register.js");

router.use(express.urlencoded({extended:true}));

const redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login');
    }else next();
}

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



/**
 * @title Login
 *
 * @desc Login with existed credentials.
 *
 * @method POST
 *
 * @url /login/
 * @data username
 * @data password
 *
 * @success-code 200
 * @success-content
 * {
 *  "newUser": {
 *      "id": 1,
 *      "username": "example",
 *      "email": "example@gmail.com",
 *      "namalengkap": "nama",
 *      "password": "$2a$10$VjflGRM6eUmKB/HumI4IyeAefqKHGk4pJDn.588pZY87g5o4W4Kfu",
 *      "updatedAt": "2021-01-23T09:05:36.938Z",
 *      "createdAt": "2021-01-23T09:05:36.938Z"
 *      },
 *  "message": "User successfully inserted!"
 * }
 *
 * @note This is still in development.
 *
 * 
 * @title Logout
 *
 * @desc Logout by destroying user session.
 *
 * @method POST
 *
 * @url /logout/
 * @data none
 *
 * @success-code 200
 * @success-content
 * {
 *   "id": 1,
 *   "username": "example",
 *   "email": "example@gmail.com",
 *   "namalengkap": "nama",
 *   "password": "$2a$10$VjflGRM6eUmKB/HumI4IyeAefqKHGk4pJDn.588pZY87g5o4W4Kfu",
 *   "updatedAt": "2021-01-23T09:05:36.938Z",
 *   "createdAt": "2021-01-23T09:05:36.938Z"
 * }
 *
 * @note This is still in development.
 *
 */