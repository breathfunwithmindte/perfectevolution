import React from 'react';
import './navbarmain.css';
import { useHistory } from 'react-router-dom';

function NavBarSinglePage({user}) {
   const History = useHistory();
   return (
      <header className="NavBarSinglePage_container">
      <button onClick={() => History.push(`/${user.firstName}'s_App/Posts`)}>
         Home
      </button>
      <button onClick={()=> History.push("/products")}>
         Products
      </button>
      <button onClick={()=> History.push("/products")}>
         Messenger
      </button>
      <button onClick={()=> History.push("/Notifications")}>
         Notifications
      </button>
      <button onClick={()=> History.push(`/Profile/${user.username}`)}>
         My Profile
      </button>
   </header>
   )
}

export default NavBarSinglePage
