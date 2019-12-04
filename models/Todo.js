const mongoose = require('mongoose');
var TodoSchema = mongoose.Schema({
    description: String,
    done: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;