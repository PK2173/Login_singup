const jwt = require("jsonwebtoken")
const knex = require("./db")

const createToken = ({ id }) => {
    return jwt.sign(id,"praveenwertyuidfghrtyufdfghuruik")
}

const virifiToken = async (req,res,next)=>{
    if (req.headers.cookie){
        const token = req.headers.cookie.split("=")[1]
        const tr = jwt.verify(token,"praveenwertyuidfghrtyufdfghuruik")
        const user =await knex("user").where({id:tr})
        req.userData=user
        next()
    }else{
        res.send("token Expair")
    }
}

module.exports = {createToken,virifiToken}