import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import '../style/MyAccount.css' // スタイルシートをインポート

function MyAccount() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth()
      const db = getFirestore()
      const user = auth.currentUser

      if (user) {
        const userDoc = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDoc)

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data())
        } else {
          console.log('No such document!')
        }
      }
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="header">
      <img className="profile-image" src={userData.photoURL} alt="Profile" />
      <span>{userData.name}</span>
      <span>{userData.followers}</span>
      <span>{userData.following}</span>
    </div>
  )
}

export default MyAccount