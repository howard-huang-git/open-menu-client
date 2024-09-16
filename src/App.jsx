import './App.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import MenuItemPage from './pages/MenuItemPage/MenuItemPage'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RatingPage from './pages/RatingPage/RatingPage'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/menu/:id" element={<MenuItemPage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/rating" element={<RatingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
