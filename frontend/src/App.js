import React from 'react';
import  {BrowserRouter,Routes,Route}  from 'react-router-dom'
import Header from './component/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
<Route path='/'  element={<Home/>} />
<Route path='/coins/:id'  element={<CoinPage/>} />


</Routes>


</BrowserRouter>
    </>
   
  );
}

export default App;
