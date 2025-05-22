import React, { useState } from 'react'
import Heading from './Components/Heading'
import PendingTodos from './Components/PendingTodos'
import Home from './Components/Home'

const App = () => {
  const [home, setHome] = useState(true)


  return (
    <div className='app'>
      <button className='homeBtn' onClick={() =>{ setHome((prev) => !prev  )}} >{ home ? "Pending Works" : "Home"}</button>
      <Heading/>
      {
        home ?<Home/>: <PendingTodos/>
      }
    </div>
  )
}

export default App