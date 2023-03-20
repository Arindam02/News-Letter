const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const https = require("node:https")
var Mailchimp = require('mailchimp-api-v3')
const { response } = require('express')

var mailchimp = new Mailchimp('befd57bac45b7f7ab1536a09eec0b8f6-us21')



const app = express()
const port = 3000



app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/',(req ,res)=>{
    res.sendFile(__dirname + "/signup.html")
})


app.post("/" ,(req ,res)=>{
    let firstName = req.body.fname
    let lastName = req.body.lname
    let email = req.body.email


    let add_Member = {
        method:'post', 
        path: '/lists/c1f5f29304/members',
        body: {
            email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
        }
    }
    }

    mailchimp.request(add_Member,(err , data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
    
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/sucess.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
})

app.listen(port, ()=>{
    console.log((`Server is running on port ${port}`));
})



// APi-Key
// befd57bac45b7f7ab1536a09eec0b8f6-us21
// Audience id:
// c1f5f29304.