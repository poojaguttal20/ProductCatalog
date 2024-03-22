import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {  Outlet } from "react-router-dom";
import Products from "../components/Products";

const Routing = ({user, onLogout}) =>{
    const navLinks = [
        {to: '/signup', label:'Signup'},
        {to: '/login', label:'Login'},
        {to: '/home', label:'Home'}
    ]
    
 
    return (
        <>
        <Navbar logo="WERTY" links={navLinks} user={user} onLogout={onLogout}/>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer/>
        </>
    )
}

export default Routing;