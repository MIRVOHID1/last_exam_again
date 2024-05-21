import React, { useState, useEffect } from 'react';
import './Nav.css';
import WatchListPanel from '../watchList/WatchListPanel';

const Nav = () => {
    const [isWatchListOpen, setWatchListOpen] = useState(false);

    const handleWatchListToggle = () => {
        setWatchListOpen(!isWatchListOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.nav') && !event.target.closest('.watchlist-panel')) {
            setWatchListOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav>
            <div className="container">
                <div className="nav">
                    <div className="left_nav">
                        <a href="/">CRYPTOFOLIO</a>
                    </div>
                    <div className="right_nav">
                        <select style={{background: "#14161A", height: "30px", width: "60px", color: "#fff", marginRight: "10px", borderRadius: "5px"}} id="">
                            <option value="UZS">UZS</option>
                            <option value="USD">USD</option>
                            <option value="RUB">RUB</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <button onClick={handleWatchListToggle}>Watchlist</button>
                    </div>
                </div>
            </div>
            {isWatchListOpen && <WatchListPanel onClose={() => setWatchListOpen(false)} />}
        </nav>
    );
}

export default Nav;
