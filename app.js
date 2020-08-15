const express= require("express")
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https");
const { url } = require("inspector");

const app= express();
 app.use(express.static("public"));  //to call the static folder inside that css,image etc
 app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")

})

app.post("/",function(req,res){

    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const emailid=req.body.email;

    const data={
        members:[
            {
                email_address:emailid,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsondata=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/615cfe6ecf"

const options={
    method:"POST",
    auth: "mouzam:d386281ef9152c80eac8b2e55668db11-us17"
}


const request=https.request(url,options,function(response){

    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html")
      }else {
        res.sendFile(__dirname+"/failure.html")
      }

    response.on("data",function(data){
        console.log(JSON.parse(data))
    })

})

request.write(jsondata)
request.end()
})




// api key
// d386281ef9152c80eac8b2e55668db11-us17

//id
//615cfe6ecf





app.listen(process.env.PORT || 3000,function(){
console.log("server is running")
})