import React from 'react';
import DarkVeil from './DarkVeil/DarkVeil'; // <--- IMPORT NEW
import AuthNavbar from './AuthNavbar';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
    }}>
      {/* 1. The New Aurora Background Layer */}
      <DarkVeil />  {/* <--- USED HERE (Old PixelBlast removed) */}
      
      {/* 2. The Navbar Layer */}
      <AuthNavbar />

      {/* 3. The Content Layer */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 10, 
        pointerEvents: 'none' 
      }}>
        <div style={{ pointerEvents: 'auto', height: '100%' }}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;