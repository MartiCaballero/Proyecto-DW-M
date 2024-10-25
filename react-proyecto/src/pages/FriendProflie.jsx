import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FriendProfilePage.css";
import Notifications from "../assets/Notifications.png";
import Home from "../assets/Home.png";
import Create from "../assets/Create.png";



const FriendProfilePage = () => {
 const navigate = useNavigate();
 const { id } = useParams(); // Asumiendo que pasas el ID del amigo a través de la URL
 const [friendData, setFriendData] = useState(null);
 const [posts, setPosts] = useState([]);

 
  return (
    <div className="friendProfilePage">
      <aside className="sidebar">
        <h1 className="logo" onClick={() => navigate("/")}>
          fakestagram
        </h1>
        <nav className="nav">
          <nav className="nav">
            <button onClick={() => navigate("/")}>
              <img
                src={Home}
                alt="Home Icon"
                className="ButtonIcon"
              />
              Home
            </button>
            <button onClick={() => navigate("/notifications")}>
              <img
                src={Notifications}
                alt="Notifications Icon"
                className="ButtonIcon"
              />
              Notifications
            </button>
            <button onClick={() => navigate("/create")}>
              <img src={Create} alt="create" className="ButtonIcon" />
              Create
            </button>
            <button onClick={() => navigate("/profile")}>Profile</button>
          </nav>
        </nav>
      </aside>

      <div className="mainContent">
        <header className="profileHeader">
          <img
            className="profileImage"
            src="https://via.placeholder.com/100"
            alt="Friend Avatar"
          />
          <div className="profileDetails">
            <div className="profileTop">
              <h2>FriendUsername</h2>
              <button className="addFriendButton">Add friend</button>
            </div>
            <div className="profileStats">
              <span>(cantidad) posts</span>
              <span>(cantidad) friends</span>
            </div>
            <div className="profileDescription">
              <p>UserName</p>
              <p>My description</p>
            </div>
          </div>
        </header>

        <section className="gallery">
          <div className="grid">
            {/* Cambiar por las imagenes del backend*/}
            <img src="https://via.placeholder.com/300" alt="post1" />
            <img src="https://via.placeholder.com/300" alt="post2" />
            <img src="https://via.placeholder.com/300" alt="post3" />
            <img src="https://via.placeholder.com/300" alt="post4" />
            <img src="https://via.placeholder.com/300" alt="post5" />
            <img src="https://via.placeholder.com/300" alt="post6" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FriendProfilePage;
