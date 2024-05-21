import './Home.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addCrypto } from '../redux/slice/cryptoSlice';
import TableRow from '@mui/material/TableRow';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const columns = [
    { id: 'name', label: 'Coin', minWidth: 100 },
    { id: 'current_price', label: 'Price', minWidth: 100, align: 'right' },
    { id: 'price_change_percentage_24h_in_currency', label: '24h Change', minWidth: 100, align: 'right' },
    { id: 'market_cap', label: 'Market Cap', minWidth: 100, align: 'right' },
];

const Home = () => {
    const [cryptos, setCryptos] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
            .then(response => response.json())
            .then(data => setCryptos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredCryptos = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='main'>
            <section className='section'>
                <div className="container">
                    <div className="header">
                        <Swiper
                            slidesPerView={4}
                            centeredSlides={false}
                            spaceBetween={30}
                            autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false, }}
                            loop={true}
                            modules={[Pagination, Autoplay]}
                            className="my__swiper"
                        >
                            {
                                filteredCryptos?.map(coin => (
                                    <SwiperSlide key={coin.id}>
                                        <Link className='slider__item' to={`/single-crypto/${coin.id}`}>
                                            <img className='slider_images' src={coin.image} alt="crypto" style={{width: "100px", height: "100px"}}/>
                                            <p><p style={{textTransform: "uppercase"}}>{coin.symbol}</p> <p style={{textDecoration: "none", color: "green"}}>+{coin.price_change_percentage_24h}</p></p>
                                            <p style={{textDecoration: "none"}}>{coin.current_price}</p>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>

                </div>
            </section>
            <div className='container'>
                <div className='table_wrapper'>
                    <h1>Cryptocurrency Prices by Market Cap</h1>
                    <input
                        type="text"
                        placeholder='Search For a Crypto Currency..'
                        onChange={handleSearch}
                        value={search}
                    />
                    <Paper className='table' sx={{ background: '#14161A', marginBottom: '100px', width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ background: '#14161A', maxHeight: 2500 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell className='table_head' key={column.id} align={column.align} style={{ background: '#87CEEB', minWidth: column.minWidth, color: '#000000' }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCryptos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crypto) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={crypto.id}>
                                            <Link to={`/single-crypto/${crypto.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                                                <TableCell>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img className='crypto_image' src={crypto.image} alt={crypto.name} style={{ marginRight: 10, width: 25, height: 25 }} />
                                                        <div className='crypto_texts'>
                                                            <p className='crypto_texts_p1'>{crypto.symbol.toUpperCase()}</p>
                                                            <p className='crypto_texts_p2'>{crypto.name}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className='crypto_texts' align='right'>${crypto.current_price.toFixed(2)}</TableCell>
                                                <TableCell className='crypto_texts' align='right'>
                                                    <button className='crypto_button' onClick={() => dispatch(addCrypto(crypto))}><RemoveRedEyeIcon /></button>
                                                    %{crypto.price_change_percentage_24h_in_currency.toLocaleString()}
                                                </TableCell>
                                                <TableCell className='crypto_texts' align='right'>${crypto.market_cap.toLocaleString()}</TableCell>
                                            </Link>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{ background: '#14161A', color: '#fff' }}
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={filteredCryptos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Home;