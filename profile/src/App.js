import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignupWithLocalStorage from './Pages/Login';
import Charts from './Pages/Charts';
import Barchart from './Pages/Barchart';
import Candlestick from './Pages/Candle';
import Mergedata from './Pages/Mergedata';
import Demodata from './Pages/Demodata';
import MyComponent from './Pages/Directapi';
import Piedata from './Pages/Piechart';
import DynamicTable from './Pages/Dynamictable';
import Navbar from './Pages/Navbar';


const App = () => {
    return (
        <Router>
          <Routes>
      
      
        
        <Route path='/' element={<SignInSignupWithLocalStorage />}/>
        <Route path='/charts' element={<Charts />}/>
        <Route path='/bar' element={<Barchart />}/>
        <Route path='/candle' element={<Candlestick />}/>
        <Route path='/Mergecandle' element={<Mergedata />}/>
        <Route path='/demodata' element={<Demodata />}/>
        <Route path='/direct' element={<MyComponent />}/>
        <Route path='/pie' element={<Piedata />}/>
        <Route path='/Dynamictable' element={<DynamicTable />}/>
            
        <Route path="*" element={<Navbar/>} /> 
           
        </Routes>

        </Router>
    );
};

export default App;

