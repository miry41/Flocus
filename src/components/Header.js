import React from 'react'
import SiginOut from './gears/SiginOut';
import UserSearch from './gears/UserSearch';

function Header() {
  return (
    <div className="headerPanel">
    <UserSearch />
    <SiginOut />
    </div>
  )
}

export default Header