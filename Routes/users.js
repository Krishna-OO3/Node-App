const express = require("express");
const app = express();
const {usersdb} = require("../Models/users")
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const { createTokens, validateTokens } = require("../Middleware/auth");
const users = require("../Models/users");

app.use(express.json());
app.use(cookieParser());

// User Register Route --------------------------------
app.post("Register", (req,res) =>{
    const {username, email, password, securityQ} = req.body;
    bcrypt.hash(password, 7).then((hash)=>{
        users.create({
            username: username,
            email: email,
            password: hash,
            securityQ: securityQ
        }).then(()=>{
            res.json("USER REGISTERED")
        }).catch((err)=>{
            if (err) {
                res.status(400).json({ error: err})
            }
        });
    });
});

// User Login Route --------------------------------
app.post("Login", async(req, res) =>{
    const { username, password } = req.body;

    const user = await users.findOne({where : {username: username} });
    if (!user) res.status(404).json({ error: "USER DOSEN'T EXIST" });

    const dbpassword = user.password;
    bcrypt.compare(password, dbpassword).then((match)=>{
        if(!match) {
            res.status(400)
            .json({ error: "Wrong username and password combiantion"})
        }else{
            const accessToken = createTokens(user);
            res.cookie("accessToken", accessToken,{
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true
            });
        res.json("LOGGED IN");
        }
    });
});

// User Password Update Route ------------------------------
// app.post("Updatepwd", async(req,res) =>{
//     const { email, securityQ } = req.body;

//     const email = await users.findOne({where : {email: email} });
//     if(!email) res.status(405).json({ error: "EMAIL DOSEN'T EXIST" });

//     const securityQues = email.securityQ;
//     buffer.compare(securityQues, securityQ).then((match)=>{
//         if(!match){
//             res.status(400)
//             .json({ error: "Security answer dosen't match"})
//         }else{

//         }
//     })
// })

