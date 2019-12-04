import * as mongoose from "mongoose";

export interface ITodo extends mongoose.Document{
    description: string,
    done: boolean
}

export var TodoSchema = new mongoose.Schema({
    description: String,
    done: Boolean
});

var Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;