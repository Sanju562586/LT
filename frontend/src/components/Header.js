// Header.js
import React from 'react';
// import logo from '../logo2.png'; // Removed invalid import

const Header = ({ theme, toggleTheme, onOpenLogin, onLock, isLoggedIn }) => {
    return (
        <header>
            <div className="header-left">
                <img src={process.env.PUBLIC_URL + "/leetcodeLogo.webp"} alt="LeetCode Logo" />
                <h1>LeetCode Tracker</h1>
            </div>
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
            >
                <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button
                className="theme-toggle"
                onClick={isLoggedIn ? onLock : onOpenLogin}
                aria-label={isLoggedIn ? "Lock Admin Access" : "Unlock Admin Access"}
                style={{ marginLeft: '10px' }}
            >
                <span>{isLoggedIn ? '🔓' : '🔒'}</span>
            </button>
        </header>
    );
};

export default Header;
