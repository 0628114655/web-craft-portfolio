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
import  Favourites  from "./pages/Favourites";
import  Saves  from "./pages/Saves";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { useEffect, useState } from "react";



function App() {
    const [favouritesCount, setfavouritesCount] = useState(0)
    const [favouritesList, setfavouritesList] = useState([])
    const [savesCount, setSavesCount] = useState(0)
    const [savesList, setSavesList] = useState([])
    const [projectAllLikes, setProjectAllLikes] = useState({})

    const fetchFavouritesCount = async () =>{
        try{
          let response = await fetch('/Favourites/' ,{       
            credentials: 'include',
          })
          if(!response.ok){throw new Error('HTTP Error')}
          let data = await response.json()
          setfavouritesCount(data.favourites_list.favourites.length);
          setfavouritesList(data.favourites_list.favourites)
          setProjectAllLikes(data.favourites_list.projectAllLikes)
        }
        catch(error){
          console.error("Error fetching favourites:", error)
          setfavouritesCount(0)
          setfavouritesList([''])
        }
    } 
    
    const fetchSavesCount = async () =>{
      try{
        let response = await fetch('/Saves/',{
          credentials: 'include' })
          
        if(!response.ok){throw new Error('HTTP Error')}
        let data = await response.json()
        setSavesCount(data.saves_list.saves.length)
        setSavesList(data.saves_list.saves)}
        
      catch (error){
        console.log('Fetch Failed:', error )
        setSavesCount(0)
        setSavesList([''])
      }
    }
    
    useEffect(()=>{
      fetchFavouritesCount();
      fetchSavesCount();
    },[])

    return(
        < Router>
        < Nav favoritesCount = {favouritesCount} savesCount = {savesCount} /> 
        <Routes>
            <Route path='/' element={<Home projectAllLikes = {projectAllLikes} />} /> 
            <Route path='/services' element={<ServiceList />}/> 
            <Route path='/questions' element={<Questions />}/> 
            <Route path='/projects' element={<Projects projectAllLikes = {projectAllLikes} fetchFavouritesCount = {fetchFavouritesCount} favouritesList = {favouritesList} fetchSavesCount = {fetchSavesCount} savesList = {savesList} />}/> 
            <Route path='/project/:id/' element={<Project/>}/> 
            <Route path='/favourites/' element={<Favourites fetchFavouritesCount = {fetchFavouritesCount}  favouritesList = {favouritesList}   />}/> 
            <Route path='/saves/' element={<Saves fetchSavesCount = {fetchSavesCount}   savesList = {savesList} />}/> 
        </Routes>
        < Footer /> 
        </Router>

    )
}

export default App;
