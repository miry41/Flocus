import React from 'react'
import SignOut from './gears/SiginOut'
import UserSearch from './gears/UserSearch'
import MyAccount from './gears/MyAccount'

function Header() {
  return (
    <div className="headerPanel d-flex justify-content-between align-items-center px-3 py-2 bg-light">
      {/* 左側：アカウント名とログアウトボタンを横並びに配置 */}
      <div className="d-flex align-items-center">
        <MyAccount />
        <SignOut className="ms-3" />
      </div>
      {/* 右側：UserSearch */}
      <div>
        <UserSearch />
      </div>
    </div>
  )
}

export default Header
