import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendProfilePage.css";
import Navbar from "../Components/Navbar";

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
        <aside className="sidebar">
                <Navbar />
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
