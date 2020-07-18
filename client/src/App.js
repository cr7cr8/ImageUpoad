import React,{useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';





import InputFile from "./components/InputFile";
import ProgressBar from "./components/ProgressBar";
import Neomo from "./components/Neomo";
import Navbar from "./components/Navbar";
import { func } from 'prop-types';



function App() {



  return (
   
    <>

     <InputFile />
     {/* <Neomo /> */}
     {/* <Navbar/> */}
    </>
  )

}

export default App;
