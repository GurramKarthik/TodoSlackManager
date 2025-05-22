import React from 'react'

const Item = ({item, updateItem, deleteItem , view}) => {

  return (
    <div key={item.id} style={ item.completed ? {backgroundColor: "#fff9c4"} : {backgroundColor:"#fff"}}  className='itemCard'>
        <h3>{item.title} </h3>
        <p>{item.description}</p>
        {
            view==="home" &&(
                <div className='btns'>
                    <button  style={{backgroundColor:"#157347" , color:"#fff"}} onClick={() => {updateItem(item.id, item.completed)}} >Done</button>
                    <p className='binBtn' onClick={() =>{deleteItem(item.id)}} >&#x1F5D1;</p>
                </div>
            )
        }

    </div>
  )
}

export default Item