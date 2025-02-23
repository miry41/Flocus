import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import '../style/MyAccount.css';
import Account from './Account';

function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        setUid(user.uid); // UIDを設定
        const userDoc = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          setUserData({ id: user.uid, ...userDocSnap.data() });
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

  const handleFollow = () => {
    console.log('User followed');
    // フォロー処理後のロジックをここに追加
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header">
      <img className="profile-image" src={userData.photoURL} alt="Profile" />
      <span onClick={handleAccountClick}>{userData.name}</span>
      {isPopupOpen && (
        <Account
          userData={userData}
          onClose={handleClosePopup}
          onFollow={handleFollow}
          uid={uid}
        />
      )}
    </div>
  );
}

export default MyAccount;