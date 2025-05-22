import express from "express"
import { addNewTodoItem, getAllTodos, deleteTodoItem, updateTodoItem } from "../Controllers/TodoController.js"
import { summarizeItems } from "../Controllers/SummarizeTodo.js"


const router = express.Router()

router.route("/todos").get(getAllTodos)
router.route('/todos').post(addNewTodoItem)
router.route('/todos/:id').delete(deleteTodoItem)
router.route('/todos/:id').patch(updateTodoItem)
router.route('/summarize').post(summarizeItems)

export default router;