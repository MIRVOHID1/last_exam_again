import './App.css'
import Nav from './components/nav/Nav'
import Home from './components/Home'
import WatchListPanel from './components/watchList/WatchListPanel'
import { Routes, Route } from 'react-router-dom'
import SingleCrypto from './components/single-crypto/SingleCrypto'

function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/watchListPanel"} element={<WatchListPanel/>}/>
        <Route path={"/single-crypto/:id"} element={<SingleCrypto/>}/>
      </Routes>
    </>
  )
}

export default App
