const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todoapp", {useNewUrlParser:true})
var Todo = require('./models/Todo');

const PORT = 8000;
const app = express();
app.use(bodyparser.json());

// GET /api/list Lists all todo items
app.get('/api/list', function(req, res){
    Todo.find({}, function(err, result){
        if(err){
            return res.json({success:false});
        }
        return res.json(result);
    });
});

// POST /api/list Adds a new todo item
app.post('/api/list', function(req, res){
    var create = {}
    if(req.body.description){
        create.description = req.body.description;
    }else{
        return res.json({success: {type: false, message: "You must provide a description"}});
    }
    if(req.body.done){
        create.done = req.body.done;
    }else{
        create.done = false;
    }
    Todo.create(create, function(err, todo){
        if(err){
            return res.json({success: false});
        }
        return res.json({success: true});
        
    });
});

// DELETE /api/list/:id Deletes an existing todo item
app.delete('/api/list/:id', function(req, res){
    Todo.findByIdAndDelete(req.params.id, function(err){
        if(err){
            return res.json({success: false});
        }
        return res.json({success: true});
    });
});

// PATCH /api/list/:id edits an existing todo item
app.patch('/api/list/:id', function(req, res){
    var update = {}
    if(req.body.description){
        update.description = req.body.description;
    }
    if(req.body.done){
        update.done = req.body.done;
    }
    Todo.findByIdAndUpdate(req.params.id, update, function(err, result){
        if(err){
            return res.json({success: false});
        }
        return res.json(result);
    });
});



app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});