const express =require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { json } = require("body-parser")

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
   console.log(fname, lname, email) 
   
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
    auth:"ummar:7f088158f17ae4053bd0019c794b5145-us14"
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



app.listen(process.env.PORT || 3000, function(){
    console.log("app is running")
})

// API KEY
// 7f088158f17ae4053bd0019c794b5145-us14

// UNIQUE ID
// 5c9ed8587a