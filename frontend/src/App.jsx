import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import  Nav  from "./parts/Nav";
import  Footer  from "./parts/Footer";
import  Home  from "./pages/Home";
import  ServiceList  from "./pages/ServiceList";
import  Questions  from "./pages/Questions";
import  Projects  from "./pages/Projects";
import  Project  from "./pages/Project";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";



function App() {
    const [favoritesCount, setfavoritesCount] = useState(0)
    const [favoritesList, setfavoritesList] = useState([])
    const [savesCount, setSavesCount] = useState(0)
    const [savesList, setSavesList] = useState([])

    const fetchFavoritesCount = async () =>{
        try{
          let response = await fetch('/Favorites/' ,{       
            credentials: 'include',
          })
          if(!response.ok){throw new Error('HTTP Error')}
          let data = await response.json()
          setfavoritesCount(data.favorites_list.count);
          setfavoritesList(data.favorites_list.favorites)
        }
        catch(error){
          console.error("Error fetching favorites:", error)
          setfavoritesCount(0)
          setfavoritesList([''])
        }
    } 
    
    const fetchSavesCount = async () =>{
      try{
        let response = await fetch('/Saves/',{
          credentials: 'include' })
          
        if(!response.ok){throw new Error('HTTP Error')}
        let data = await response.json()
        setSavesCount(data.saves_list.count)
        setSavesList(data.saves_list.saves)}
        
      catch (error){
        console.log('Fetch Failed:', error )
        setSavesCount(0)
        setSavesList([''])
      }
    }
    
    useEffect(()=>{
      fetchFavoritesCount();
      fetchSavesCount();
    },[])

    return(
        < Router>
        < Nav favoritesCount = {favoritesCount} savesCount = {savesCount} /> 
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/services'  element={<ServiceList />}/> 
            <Route path='/questions'  element={<Questions />}/> 
            <Route path='/projects'   element={<Projects  fetchFavoritesCount = {fetchFavoritesCount} favoritesList = {favoritesList} fetchSavesCount = {fetchSavesCount} savesList = {savesList} />}/> 
            <Route path='/project/:id/'   element={<Project/>}/> 
        </Routes>
        < Footer /> 
        </Router>

    )
}

export default App;
