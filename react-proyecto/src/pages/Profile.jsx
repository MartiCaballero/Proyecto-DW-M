import Header from "../Components/Header";
import React from "react";
import Navbar from "../Components/Navbar";
import './Profile.css';

export default function ProfilePage() {
    return (
        <div className="container">
            <aside className="sidebar">
                <Navbar />
            </aside>
            <div className="mainContent">
                <Header />
                <div className="ProfilePage">
                    <h2>Profile Page</h2>
                </div>
            </div>
        </div>
    );
}
