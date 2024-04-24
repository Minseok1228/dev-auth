import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

function Header() {
  return (
    <div className="flex justify-end p-4">
      <DarkModeToggle />
    </div>
  );
}

export default Header;
