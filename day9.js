const express= require('express');
const app = express();
const port = 3000;  
const bodyparser=require ("body-parser"); 
const cors=require('cors');
const mongo=require('mongodb'); 
const MongoClient=mongo.MongoClient; 
mongourl="mongodb://localhost:27017"; 
let db;
let col_name="restaurant"; 
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json()); 
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200,"page not found").send("api is running");
}) 
MongoClient.connect(mongourl,(err,client)=>{
    if(err) throw err; 
    db=client.db("test"); 
    console.log("successfully database connected");
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log("server running on port:",port);
    })
}) 
app.get('/restauran',(req,res)=>{
     res.send("everything fine");
}) 
app.get('/restaurant/:city',(req,res)=>{
    console.log(req.params.city) 
    var c={city : req.params.city}
    db.collection(col_name).find(c).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
    });

})
app.post("/restaurant",(req,res)=>{ 
    console.log(req.body);
 db.collection(Col_name).insertMany(req.body, (err,result)=>{ 
     if(err) throw err;
 res.send("success!!");
 });

})
