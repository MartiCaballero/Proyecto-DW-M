import { useState, useEffect } from "react";
import axios from "axios";

import "./ProfileList.css";

function ProfilesList({ profiles }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [profilesPerPage, setProfilesPerPage] = useState(getProfilesPerPage());

  // Function to determine profiles per page based on window width
  function getProfilesPerPage() {
    const width = window.innerWidth;
    if (width < 600) return 2; // Mobile view
    if (width < 900) return 3; // Tablet view
    if (width < 1200) return 4; // Small desktop
    return 5; // Large desktop
  }

  // Update profiles per page on window resize
  useEffect(() => {
    function handleResize() {
      setProfilesPerPage(getProfilesPerPage());
      setCurrentPage(0); // Reset to first page on resize
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
        {currentProfiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
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

function ProfileCard({ profile }) {
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

  return (
    <div className="profile-card">
      <img
        src={profile.profilePicture || "https://via.placeholder.com/100"}
        alt={profile.username}
      />
      <h3>{profile.username}</h3>
      <p>{profile.email}</p>
      <button onClick={addFriend}>Follow</button>
    </div>
  );
}

export default ProfilesList;
