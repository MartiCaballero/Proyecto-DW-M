import { useState } from "react";

import "./ProfileList.css";

function ProfilesList({ profiles }) {
  const profilesPerPage = 5; // Number of profiles per page
  const [currentPage, setCurrentPage] = useState(0);

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
  return (
    <div className="profile-card">
      <img
        src={profile.profilePicture || "https://via.placeholder.com/100"}
        alt={profile.username}
      />
      <h3>{profile.username}</h3>
      <p>{profile.email}</p>
      <button>Follow</button>
    </div>
  );
}

export default ProfilesList;
