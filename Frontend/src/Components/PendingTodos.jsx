import React, { useEffect, useState } from 'react'
import Item from './Item'
import axios  from 'axios';
import { BACKEND_URL } from './utils';
import SummaryCard from './SummaryCard';

const PendingTodos = () => {

   const [todoItems, setTodoItems] = useState([]);
   const [summary, setSummary] = useState(null);
   
    const fetchItems = async () => {
    const todoItems = await axios.get(`${BACKEND_URL}/todos`, {
      withCredentials: true,
    });
    if (todoItems.data.success) {
      setTodoItems( todoItems.data.todoItems.filter((item) => item.completed === false ));
      
    } else {
      console.log("Error: ", todoItems);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const summarize = async () =>{
       
       const response =  await axios.post(`${BACKEND_URL}/summarize` , {"PendingTodos": todoItems} ,  {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })

        if(response.data.success){
            setSummary(response.data.message)
        }

  }



  return (
    <div className='PendingItems'>
      <div className="button-container">
        <button className="summarizeBtn" onClick={() => summarize() } >Summarize</button>
      </div>

      <div style={{textAlign:"center"}}>
         <SummaryCard summary={summary} />
      </div>
       
       <div className="TodoItems">
        {
            todoItems.map((item) =>{
                return <Item item={item} />
            } )
        }
    </div>
    
    </div>
  )
}

export default PendingTodos