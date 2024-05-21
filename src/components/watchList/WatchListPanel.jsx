import React from 'react';
import { useSelector } from 'react-redux'; // useSelector ni Reduxdan import qilib olaylik
import './WatchListPanel.css';
import { Link } from 'react-router-dom';

const WatchListPanel = ({ onClose }) => {

    const crypto = useSelector(state => state.cryptoData.crypto);

    console.log(crypto)
    return (
        <div className="watchlist-panel">
            <h1>WATCHLIST</h1>
            <div className="watchlist-content">
                {
                    crypto.map(coin =>
                        <Link to={`/single-crypto/${coin.id}`} className='watch_coin'>
                            <img className='watch_img' src={coin.image} alt="" />
                            <h3>$ {coin.current_price}</h3>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default WatchListPanel;
