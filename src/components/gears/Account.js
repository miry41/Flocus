import React from 'react';
import '../style/Popup.css';

function Account({ userData, onClose }) {
  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>{userData.name}</h2>
        <img className="profile-image" src={userData.photoURL} alt="Profile" />
        <p>Followers: {userData.followers}</p>
        <p>Following: {userData.following}</p>
      </div>
    </div>
  );
}

export default Account;