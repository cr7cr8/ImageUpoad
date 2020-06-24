const express = require("express")
const app = express();


const user = require("./router/user")
const picture = require("./router/picture")

const clientPack = require("./router/clientPack")
const cors = require("cors")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

  
    
// app.use("/api/picture/upload",(req,res)=>{
//     res.send("ddfdfd")
// })




app.use("/api/user",user)
app.use("/api/picture",picture)

 app.get("*",clientPack)




app.listen(process.env.PORT || 80)