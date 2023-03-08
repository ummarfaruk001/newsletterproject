const express =require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const port = process.env.PORT || 3000


const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req,res){
   const fname = req.body.firstname
   const lname = req.body.lastname
   const email = req.body.email
   
 
   
   const data = {
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }
    ]
   }
   const jsonData = JSON.stringify(data)
   

   const url = "https://us14.api.mailchimp.com/3.0/lists/5c9ed8587a"

   const options = {
    method:"POST",
    auth:"ummar:5f09cfa99ac7f110260d44bc8e1a5d47-us14"
   }
   
   

   const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/sucess.html")
       }else{
        res.sendFile(__dirname + "/failure.html")
       }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
   })
 
   request.write(jsonData);
   request.end(); 

  
})

app.post("/failure.html", function(req,res){
    res.redirect("/")
})



app.listen( port, function(){
    console.log("app is running")
})
