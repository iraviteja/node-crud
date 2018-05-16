var mongoose = require('mongoose');

module.export = mongoose.connect('mongodb://localhost/node-crud-postman', function(err){
    if(err) throw err;
    console.log("Database connected");
})