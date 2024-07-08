import React from "react";
import './Logincss.css';

import Charts from "./Charts.jsx";
function Home(){
    const logout=()=>{
        localStorage.removeItem("signUp")
        window.location.reload()
    }
    const deleteAccount=()=>{ 
        localStorage.clear()
        window.location.reload()
    }
    
    return(
        <div>
            
            <h1>Welcome {localStorage.getItem('name')}</h1>
            <button onClick={logout} className="logout">LogOut</button>
            <button onClick={deleteAccount} className="delete">Delete</button>
            <Charts/> {/* Render your DynamicTable component here */}
        </div>
    );
}
export default Home;



