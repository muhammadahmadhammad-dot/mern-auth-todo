import { todoScheme } from "../validation/todoValidation.js";
import Todos from "../model/todoModel.js";

export const create = async (req, res) => {
  try {
    const { data, error } = todoScheme.safeParse(req.body);
    if (error) {
      return res.status(400).json({ errors: error.format() });
    }

    const { todo } = data;

    const newTodo = new Todos({ todo:todo, userId: req.user.id, isComplete: false });

    const savedTodo = await newTodo.save();

    return res
      .status(201)
      .json({ msg: "Your Todo saved successfully!", todo: savedTodo });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const all = async (req, res) => {
  try {
    const todos = await Todos.find({ userId: req.user.id });
      if (!todos || todos.length === 0) {
        return res.status(404).json({ message: "No todos found", todos:[] }); 
      }
    return res.status(201).json({ msg: "All Todos", todos: todos });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const complete = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findOne({ _id: id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.isComplete = !todo.isComplete;
    await todo.save();

    res.status(200).json({ message: "Todo status updated", todo });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
