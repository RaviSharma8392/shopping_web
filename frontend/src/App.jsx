import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewItems from './pages/ViewItems'
import ItemDetails from './components/ItemDetails'
import AddItem from './pages/AddItems'

const App = () => {
  return (
    <div className=''>
      <Routes>
          <Route path='/' element={<ViewItems/>}/>
          <Route path='/item/:id/:name/:type' element={<ItemDetails/>}/>
                    <Route path='/additem' element={<AddItem/>}/>

      </Routes>

    </div>
  )
}

export default App
