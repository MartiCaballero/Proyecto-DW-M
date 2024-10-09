import React from 'react';

const Component = () => {
    return (
        <div className="container">
        {/* Icon container */}
        <div className="icon-container">
            <div className="icon">
            <div className="inner-icon"></div>
            <div className="icon-background">
                <div className="inner-icon"></div>
            </div>
            </div>
        </div>

        {/* Profile container */}
        <div className="profile-container">
            <div className="profile-image">
            <img src="https://via.placeholder.com/22x22" alt="Profile" />
            </div>
        </div>
        </div>
    );
};

export default Component;
