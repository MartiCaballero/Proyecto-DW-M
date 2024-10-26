import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendProfilePage.css";
import Notifications from "../assets/Notifications.png";
import Home from "../assets/Home.png";
import Create from "../assets/Create.png";

const FriendProfilePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="ProfilePage">
        <h1 className="logo" onClick={() => navigate("/")}>
          fakestagram
        </h1>
        <nav className="nav">
          <button onClick={() => navigate("/")}>
            <img src={Home} alt="Home Icon" className="ButtonIcon" />
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
            <img src={Create} alt="Create Icon" className="ButtonIcon" />
            Create
          </button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </nav>
      

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
              <button onClick={openModal} className="addFriendButton">
                Add friend
              </button>
              {modalOpen && (
                <div className="modal">
                  <div className="modalContent">
                    <button className="close" onClick={closeModal}>
                      x
                    </button>
                    <h2>Add Friend</h2>
                    <input className="add-friend-input" type="text" placeholder="Agrega a tu amigo" />
                    <button className="Inside-modal-add-button">Add</button>
                  </div>
                </div>
              )}
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
            {/* Cambiar por las imágenes del backend */}
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
