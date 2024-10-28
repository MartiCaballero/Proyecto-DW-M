import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./ProfileList.css";

function ProfilesList({ profiles, friends }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [profilesPerPage, setProfilesPerPage] = useState(getProfilesPerPage());

  // Function to determine profiles per page based on window width
  function getProfilesPerPage() {
    const width = window.innerWidth;
    if (width < 600) return 2;
    if (width < 900) return 3;
    if (width < 1200) return 4;
    return 5;
  }

  // Update profiles per page on window resize
  useEffect(() => {
    function handleResize() {
      setProfilesPerPage(getProfilesPerPage());
      setCurrentPage(0);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate the profiles for the current page
  const indexOfLastProfile = (currentPage + 1) * profilesPerPage;
  const indexOfFirstProfile = currentPage * profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  // Functions to handle pagination
  const handleNextPage = () => {
    if (indexOfLastProfile < profiles.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="profiles-container">
        {currentProfiles.map((profile) => {
          // console.log(friends);

          return (
            <ProfileCard
              key={profile._id}
              profile={profile}
              isFriend={friends.includes(profile._id)}
            />
          );
        })}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProfile >= profiles.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ProfileCard({ profile, isFriend }) {
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("token");

  const addFriend = async () => {
    axios
      .post(
        "http://localhost:3000/api/user/add-friend/" + profile._id,
        {},
        {
          headers: { Authorization: "Bearer " + TOKEN },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProfileClick = () => {
    navigate(`/profile?id=${profile._id}`);
  };

  return (
    <div className="profile-card">
      <img
        src={profile.profilePicture || "https://via.placeholder.com/100"}
        alt={profile.username}
        onClick={handleProfileClick}
      />
      <h3>{profile.username}</h3>
      <p>{profile.email}</p>
      <button onClick={addFriend} disabled={isFriend}>
        {isFriend ? "Friends" : "Follow"}
      </button>
    </div>
  );
}

export default ProfilesList;
