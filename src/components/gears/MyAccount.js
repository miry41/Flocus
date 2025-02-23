import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import '../style/MyAccount.css';
import Account from './Account';

function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleAccountClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header">
      <img className="profile-image" src={userData.photoURL} alt="Profile" />
      <span onClick={handleAccountClick}>{userData.name}</span>
      <span>{userData.followers}</span>
      <span>{userData.following}</span>
      {isPopupOpen && <Account userData={userData} onClose={handleClosePopup} />}
    </div>
  );
}

export default MyAccount;