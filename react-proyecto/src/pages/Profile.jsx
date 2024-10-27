import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Navbar from "../Components/navBar";
import "./Profile.css";
import ModalProfile from "../Components/modalProfile";

export default function ProfilePage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // Estados para abrir/cerrar ambos modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    description: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const TOKEN = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .put("http://localhost:3000/api/user/profile/edit", formData, {
        headers: { Authorization: "Bearer " + TOKEN },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      axios
        .get("http://localhost:3000/api/user/profile/" + id, {
          headers: { Authorization: "Bearer " + TOKEN },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUserData();
  }, []);

  return user.user ? (
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
                <h2>{user.user.username}</h2>
                <div className="containerButtons">
                  {jwtDecode(TOKEN).id === id ? (
                    <button onClick={openModal} className="editProfileButton">
                      Edit Profile
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="profileStats">
                <span>{user.posts.length} posts</span>
                <span>{user.user.friends.length} friends</span>
              </div>
              <div className="profileDescription">
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
    </div>
  ) : (
    <div>Loading</div>
  );
}
