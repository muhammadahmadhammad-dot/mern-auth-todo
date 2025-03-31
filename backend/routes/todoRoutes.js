import express from "express"
import { all, complete, create, deleteTodo } from "../controller/todoController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const route = express.Router() 

route.post("/store-todo",authMiddleware, create)
route.get("/all-todos",authMiddleware, all)
route.post("/todo-complete/:id",authMiddleware, complete)
route.post("/todo-delete/:id",authMiddleware, deleteTodo)

export default  route;