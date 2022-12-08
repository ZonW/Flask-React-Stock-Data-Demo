import React from 'react';
import logo from './img/1200px-NASDAQ_Logo.svg.png';
import './App.css';
import StockList from './components/characters/StockList';
import Stock from './components/characters/Stock';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>
            Welcome to Yahoo Finance Stocks
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/stocks'>
            Stocks
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stocks' element={<StockList />} />
            <Route path='/stocks/:symbol' element={<Stock />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
