import React, { useEffect, useState } from 'react';
import '../style/Popup.css';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

function EditAccount({ onClose }) {
    const auth = getAuth();
    const firestore = getFirestore();
    const loggedInUserUid = auth.currentUser.uid;
    const [userData, setUserData] = useState({ name: '', photoURL: '' });
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(firestore, 'users', loggedInUserUid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    setNewName(data.name); // 初期値として現在のユーザー名を設定
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, [firestore, loggedInUserUid]);

    // 編集POPUPを閉じる（再ロードは行わない）
    const closeEditPopup = () => {
        setShowEditPopup(false);
    };

    // メインPOPUPを閉じる際に再ロードを実施
    const closeMainPopup = () => {
        onClose();
        window.location.reload();
    };

    const handleUpdateName = async () => {
        try {
            const userDocRef = doc(firestore, 'users', loggedInUserUid);
            await updateDoc(userDocRef, { name: newName });
            setUserData({ ...userData, name: newName });
            closeEditPopup();
        } catch (error) {
            console.error("Error updating name: ", error);
        }
    };

    return (
        <>
            {/* メインのアカウント設定POPUP */}
            <div className="popupOverlay" onClick={closeMainPopup}>
                <div className="popupContent" onClick={(e) => e.stopPropagation()}>
                    <button className="closeButton" onClick={closeMainPopup}>X</button>
                    <h2>アカウント名設定</h2>
                    <div>
                        <p>
                            <span 
                                className="editLink" 
                                style={{ cursor: 'pointer', color: '#00f', marginRight: '5px' }}
                                onClick={() => setShowEditPopup(true)}
                            >
                                [編集]
                            </span>
                            名前: {userData.name}
                        </p>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {userData.photoURL ? (
                                <img 
                                    src={userData.photoURL} 
                                    alt="User Profile" 
                                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                />
                            ) : (
                                <p>プロフィール画像が設定されていません</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* 編集POPUP（名前編集） */}
            {showEditPopup && (
                <div className="popupOverlay" onClick={closeEditPopup}>
                    <div className="popupContent" onClick={(e) => e.stopPropagation()}>
                        <button className="closeButton" onClick={closeEditPopup}>X</button>
                        <h2>名前の編集</h2>
                        <div>
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                                placeholder="新しい名前を入力" 
                            />
                            <button onClick={handleUpdateName}>更新</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditAccount;