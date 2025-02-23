import React from 'react'
import SignOut from './gears/SiginOut';
import UserSearch from './gears/UserSearch';
import MyAccount from './gears/MyAccount';

function Header() {
  return (
    <div className="headerPanel">
      <UserSearch />
      <MyAccount />
      <SignOut />
    </div>
  )
}

export default Header