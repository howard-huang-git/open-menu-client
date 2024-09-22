import './App.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import MenuItemPage from './pages/MenuItemPage/MenuItemPage'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RatingPage from './pages/RatingPage/RatingPage'
import FinderPage from './pages/FinderPage/FinderPage'
import AddRestaurant from './components/AddRestaurant/AddRestaurant';
import AddMenuItem from './components/AddMenuItem/AddMenuItem';

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/menu/:id" element={<MenuItemPage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/rating" element={<FinderPage />} />
          <Route path="/rating/:id" element={<RatingPage />} />
          <Route path="/add/restaurant" element={<AddRestaurant />} />
          <Route path="/add/food" element={<AddMenuItem />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
