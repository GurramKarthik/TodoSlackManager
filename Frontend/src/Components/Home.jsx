import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "./utils";
import axios from "axios";
import Item from "./Item";

const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const inputRef = useRef(null);
  const DescriptionRef = useRef(null);


  const fetchItems = async () => {
    const todoItems = await axios.get(`${BACKEND_URL}/todos`, {
      withCredentials: true,
    });
    if (todoItems.data.success) {
      setTodoItems(todoItems.data.todoItems);
      
    } else {
      console.log("Error: ", todoItems);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const addItem = async (event)=>{
        event.preventDefault();
        const item = {
            "title": inputRef.current.value, 
            "description" : DescriptionRef.current.value
        }

        await axios.post(`${BACKEND_URL}/todos` , item ,  {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })

        fetchItems();
  }

  const deleteItem = async (id)=>{
        await axios.delete(`${BACKEND_URL}/todos/${id}`  ,  {withCredentials: true,    })

        setTodoItems( (prev) =>{
            return prev.filter((item) => item.id !== id )
        })
  }

  const updateItem = async (id,completed )=>{
        await axios.patch(`${BACKEND_URL}/todos/${id}` , {"completed":!completed} ,  {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })


        setTodoItems( (prev) =>{
            return prev.map((item) =>{
                if(item.id=== id){
                    return {...item, completed:!completed}
                }
                return item;
            })
        })

    }


  return (
    <div className="Home">
   <form className="todo-form" onSubmit={addItem}>
      <input
        type="text"
        placeholder="Title"
        className="form-input"
        ref={inputRef}
      />
      <textarea
        placeholder="Description"
        className="form-textarea"
        ref={DescriptionRef}
      ></textarea>
      <button type="submit" className="form-button">Add</button>
    </form>

    <div className="TodoItems">
        {
            todoItems.map((item) =>{
                return <Item item={item} updateItem={updateItem} deleteItem={deleteItem} view={"home"} />
            } )
        }

    </div>
    
    </div>
  );
};

export default Home;
