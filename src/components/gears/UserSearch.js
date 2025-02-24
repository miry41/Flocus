import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import Account from './Account';

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentUserUid = 'currentUserUid'; // ここで現在のユーザーのUIDを取得する

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm === '') {
        setUsers([]);
        return;
      }
      const q = query(
        collection(db, 'users'),
        orderBy('name'),
        startAt(searchTerm),
        endAt(searchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersList);
    };

    handleSearch();
  }, [searchTerm]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
    setSearchTerm(''); // ここでinputのvalueをリセット
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
  };

  const handleFollow = () => {
    console.log('User followed');
    // フォロー処理後のロジックをここに追加
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="ユーザを検索"
      />
      {users.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid #ccc', zIndex: 1 }}>
          {users.map((user, index) => (
            <div
              key={index}
              style={{ padding: '8px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
      {isPopupOpen && selectedUser && (
        <Account userData={selectedUser} onClose={handleClosePopup} onFollow={handleFollow} uid={currentUserUid} />
      )}
    </div>
  );
}

export default UserSearch;