import { todosCollection } from "../Utils/Firebase.js";

export  const getAllTodos = async (req, res) =>{
   try {
    const snapshot = await todosCollection.get();
    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({
            "success":true,
            "todoItems": todos
    })
  } catch (err) {
    return res.status(500).json({ "success":false,error: err.message });
  }
}

export const addNewTodoItem = async (req, res)=>{
 const { title, description } = req.body;
 
 
  try {
    const docRef = await todosCollection.add({ title, description, completed: false });
   return  res.status(201).json({ success:true, id: docRef.id, title, description, completed: false });
  } catch (err) {
   return  res.status(500).json({success:false, error: err.message });
  }
}

export const deleteTodoItem = async (req, res)=>{
    try {
    await todosCollection.doc(req.params.id).delete();
    return res.status(204).json({
        success:true,
        message:"Deleted Successfully"
    });
  } catch (err) {
   return res.status(500).json({ success:false,error: err.message });
  }
}

export const updateTodoItem= async (req, res) =>{
 const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ success:false, error: "`completed` must be a boolean" });
  }

  try {
    const todoRef = todosCollection.doc(req.params.id);
    const doc = await todoRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success:false,error: "Todo not found" });
    }

    await todoRef.update({ completed });
   return res.status(200).json({ success:true, id: req.params.id, ...doc.data(), completed });
  } catch (err) {
    return res.status(500).json({ success:false,error: err.message });
  }
}

