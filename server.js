const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todoapp", {useNewUrlParser:true})
var Todo = require('./models/Todo');

const PORT = 8000;
const app = express();
app.use(bodyparser.json());

// GET /api/list Listaa kaikki
app.get('/api/list', function(req, res){
    Todo.find({}, function(err, result){
        if(err){
            return res.json({success:false});
        }
        return res.json(result);
    });
});

// POST /api/list Lisää uusi
app.post('/api/list', function(req, res){
    Todo.create(req.body, function(err, todo){
        if(err){
            return res.json({success: false});
        }
        return res.json({success: true});
        
    });
});

// DELETE /api/list/:id Poista olemassaoleva
app.delete('/api/list/:id', function(req, res){
    Todo.deleteOne({_id: req.params.id}, function(err){
        if(err){
            return res.json({success: false});
        }
        return res.json({success: true});
    });
});

// PATCH /api/list/:id Muuta olemassaoleva




app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});