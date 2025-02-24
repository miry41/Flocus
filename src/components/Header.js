import React from 'react'
import SignOut from './gears/SiginOut'
import UserSearch from './gears/UserSearch'
import MyAccount from './gears/MyAccount'

function Header() {
  return (
    <div className="headerPanel d-flex justify-content-between align-items-center">
      {/* 左端 */}
      <div>
        <UserSearch />
      </div>
      {/* 右端 */}
      <div className="d-flex">
        <MyAccount />
        <SignOut />
      </div>
    </div>
  )
}

export default Header
