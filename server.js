var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbconnect');
var User = require('./models/user');

var app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err){
        if(err) throw err;
        res.json({"Status":"Success"});
    });
});

app.get('/',function(req,res){
    User.find({},function(err,users){
        if(err) throw err;
        res.json(users);
    });
});

app.delete('/:id',function(req,res){
    User.remove({email:req.params.id},function(err){
        if(err) throw err;
        res.json({"Status":"Success"});
    });
});

app.put('/:id',function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err) throw err;
        user.name = req.body.name;
        user.email = req.body.email;
        user.save(function(err){
            if(err) throw err;
            res.json({"Status":"Successfully updated"});
        });
    });
});

app.listen(3000,function(err){
    if(err) throw err;
    console.log("Server is running");
});