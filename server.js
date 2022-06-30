const knex = require("./db")
const express = require("express")
const app = express()
const {createToken,virifiToken} = require("./jwt_token")

app.use(express.json())

app.set("view-engine","hbs")
app.use(express.urlencoded({extended:false}))

app.get("/register",(req,res)=>{
    res.render("register.hbs")
})

app.post("/register",(req,res)=>{
    knex("user").insert(req.body).then((result) => {
        res.render("login.hbs")
    }).catch((err) => {
        res.send("not done")
    });
})


app.get("/login", (req,res)=>{
    res.render("login.hbs")
})

app.post("/login",(req,res)=>{
    knex("user").where({email:req.body.email,password:req.body.password}).then((result) => {
        if (result.length==1){
            const token=createToken(result[0])
            res.cookie("singToken",token)
            res.render("welcome.hbs")
        }else{
            res.render("register.hbs")
        }
    }).catch((err) => {
        console.log(err);
    });
})



app.get("/profile",virifiToken,(req,res)=>{
    res.render("welcome",`your profile ${req.userData[0].username}` )
})

app.get("/profile1",virifiToken,(req,res)=>{
    knex("user").then((reslt)=>{
        res.render("user.hbs",{reslt})
    })
})

app.post("/About",virifiToken,(req,res)=>{
    res.send(`this is your about page ${req.userData[0].name}` )
})

app.post("/coutact",virifiToken,(req,res)=>{
    res.send(`this is your contact page ${req.userData[0].name}` )
})

app.post("/private",virifiToken,(req,res)=>{
    res.send(`this is your private page ${req.userData[0].name}` )
})


app.listen(6030,()=>{
    console.log("Connected");
})