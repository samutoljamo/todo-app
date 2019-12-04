import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';
import * as basicauth from 'express-basic-auth';
import * as path from 'path';

const MONGO_URL :string = process.env.MONGODB_URI || "mongodb://localhost/todoapp";
const DEBUG : boolean = (MONGO_URL === "mongodb://localhost/todoapp") ? true : false;
mongoose.connect(MONGO_URL, {useNewUrlParser:true, useUnifiedTopology: true})

import Todo from './models/Todo';

const PORT : number | string = process.env.PORT || 8000;
const app = express();
if(!DEBUG){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
}
app.use(basicauth({
    users:{'samu': 'superpasswordsecret'},
    challenge: true,
    realm: "my-app"
}));
app.use(bodyparser.json());


// GET /api/list Lists all todo items
app.get('/api/list', function(req, res){
    Todo.find({}, function(err, result){
        if(err){
            return res.status(500).end();
        }
        return res.json(result);
    });
});

// POST /api/list Adds a new todo item
app.post('/api/list', function(req, res){
    var create : any = {}
    if(req.body.description){
        create.description = req.body.description;
    }else{
        return res.status(400).json({message: "You must provide a description"});
    }
    if(req.body.done){
        create.done = req.body.done;
    }else{
        create.done = false;
    }
    Todo.create(create, function(err, todo){
        if(err){
            return res.status(500).end();
        }
        return res.status(201).json(todo);
        
    });
});

// DELETE /api/list/:id Deletes an existing todo item
app.delete('/api/list/:id', function(req, res){
    Todo.findByIdAndDelete(req.params.id, function(err){
        if(err){
            return res.status(500).end();
        }
        return res.status(204).end();
    });
});

// PATCH /api/list/:id edits an existing todo item
app.patch('/api/list/:id', function(req, res){
    var update : any = {};
    if(req.body.description){
        update.description = req.body.description;
    }
    if(req.body.done){
        update.done = req.body.done;
    }
    Todo.findByIdAndUpdate(req.params.id, update, function(err, result){
        if(err){
            return res.status(500).json({success: false});
        }
        return res.status(204).end();
    });
});


app.all("*", function(req, res){
    res.status(404).end();
});

app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});