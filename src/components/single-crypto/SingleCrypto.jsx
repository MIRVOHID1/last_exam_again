import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Bg from '../../assets/Chart img.png'
import './SingleCryipto.css'
import Buttons from "./Buttons";


const SingleCrypto = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(response => response.json())
            .then(data => setCoin(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]); 
            
    console.log(coin); 
    return (
        <div className="single_container">
            {coin && ( 
                <div className="left_box">
                    <div key={coin.id}>
                        <img className="single_img" src={coin.image.large} alt="" />
                        <h1>{coin.name}</h1>
                        <p className="single_p">{coin.description.en.substring(0, 200)}</p>
                        <h1 className="single_rank">Rank: {coin.market_cap_rank}</h1>
                        <h1 className="single_rank">Current Price: {coin.price}</h1>
                        <h1 className="single_rank">Market Cap: {coin.market_cap_rank}</h1>
                    </div>
                </div>
            )}
            <div className="right_box">
                <img className="chart" src={Bg} alt="" />
                <Buttons/>
            </div>
        </div>
    );
}

export default SingleCrypto;
