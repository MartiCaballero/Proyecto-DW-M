import React from 'react';
import { useNavigate } from "react-router-dom";
import Notifications from "../assets/Notifications.png";
import Home from "../assets/Home.png";
import Create from "../assets/Create.png";
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div>
                <h1 className="logo" onClick={() => navigate("/")}>
                    fakestagram
                </h1>
                <nav className="nav">
                    <button onClick={() => navigate("/")}>
                        <img src={Home} alt="Home Icon" className="ButtonIcon" />
                        Home
                    </button>
                    <button onClick={() => navigate("/notifications")}>
                        <img src={Notifications} alt="Notifications Icon" className="ButtonIcon" />
                        Notifications
                    </button>
                    <button onClick={() => navigate("/create")}>
                        <img src={Create} alt="Create Icon" className="ButtonIcon" />
                        Create
                    </button>
                    <button onClick={() => navigate("/profile")}>Profile</button>
                </nav>
        </div>
    );
};

export default Navbar;
