const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const connectionString = "mongodb+srv://user:user123@airbnb.utq6q.mongodb.net/AirBnB?retryWrites=true&w=majority"
mongoose.connect(connectionString, 
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    },
    (err, response)=>{
        if(err){
            console.log("There was an error connecting to MongoDB")
        }
        else{
            console.log("connected to MongoDB")
        }
    }
    )
    const mySchema = new mongoose.Schema({
        id: Number,
        name:String,
        access: String,
        house_rules:String,
        host_since:String,
        host_location:String,
        neighbourhood:String,
        zipcode: Number,
        bed_type:String,
        price:String
    })
const model = mongoose.model("Boston_AirBnB", mySchema, "Boston_AirBnB")

app.get("/",(req, res)=>{
    //error handleing
    const zipcode = req.query['zipcode']
    if(zipcode !== undefined){
        model.find({"zipcode": zipcode}, (err, data)=>{
            if(err){
                console.log("Error getting data")
            }
            else{
                res.json(data)
            }
        })
    }
    else{
        res.status(400).json({"error": "The key is not correct, it should be zipcode"})
    }
})
app.listen(port, () => {
    console.log("Server is listening")
})