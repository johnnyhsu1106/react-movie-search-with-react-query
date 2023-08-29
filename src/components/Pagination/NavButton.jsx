import React from 'react'

const NavButton = ({
  text,
  onNavButtonClick,
}) => {
  return (
    <span onClick={onNavButtonClick}> {text} ... </span>
  )
}

export default NavButton
