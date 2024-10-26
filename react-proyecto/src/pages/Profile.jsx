
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import './Profile.css';
import ModalProfile from "../Components/modalProfile";
import ModalAddFriend from "../Components/modalAddFriend";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { userName } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Estados para abrir/cerrar ambos modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        userName: '',
        description: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openAddFriendModal = () => setIsAddFriendModalOpen(true);
    const closeAddFriendModal = () => setIsAddFriendModalOpen(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put('http://localhost:3000/api/users/profile', formData)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <Navbar />
            </aside>
            <div className="containerPrincipal">
                <div className="mainContent">
                    <header className="profileHeader">
                        <img
                            className="profileImage"
                            src="https://via.placeholder.com/100"
                            alt="Friend Avatar"
                        />
                        <div className="profileDetails">
                            <div className="profileTop">
                                <h2>userName{userName}</h2>
                                <div className="containerButtons">
                                    <button onClick={openAddFriendModal} className="addFriendButton">
                                        Add friend
                                    </button>

                                    <button onClick={openModal} className="editProfileButton">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            <div className="profileStats">
                                <span>(cantidad) posts</span>
                                <span>(cantidad) friends</span>
                            </div>
                            <div className="profileDescription">
                                <p>{formData.userName || "UserName"}</p>
                                <p>{formData.description || "My description"}</p>
                            </div>
                        </div>
                    </header>

                    <section className="gallery">
                        <div className="grid">
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

            {/* Modal para Edit Profile */}
            {isModalOpen && (
                <ModalProfile
                    formData={formData}
                    closeModal={closeModal}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}

            {/* Modal para Add Friend */}
            {isAddFriendModalOpen && (
                <ModalAddFriend closeModal={closeAddFriendModal} />
            )}
        </div>
    );
}
