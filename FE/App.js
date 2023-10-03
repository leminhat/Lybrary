import logo from './logo.svg';
import './App.css';




import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';


import LapTops from './components/Laptop/Laptops';
import LaptopDetail from './components/Laptop/LaptopDetail';
import Navbar from './components/Navbar';

import EditLogin from './Login/EditLogin';
import ListLogin from './Login/ListLogin';
import HomeLogin from './Login/HomeLogin';
import ListBook from './components/Bookbtl/ListBook';
import EditBook from './components/Bookbtl/EditBook';
import GioHang from './components/Bookbtl/GioHang';
import EditBook2 from './components/Bookbtl/EditBook2';




function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

      <Route path='/homelogin' element={<HomeLogin/>}/>
      <Route path='/logins' element={<ListLogin/>}/>    
      <Route path='/editlogin/:id' element={<EditLogin/>}/>
      
      <Route path='/' element={<ListBook/>}/>  
      <Route path='/editbook/:id' element={<EditBook/>}/>
      <Route path='/giohang' element={<GioHang/>}/>
      <Route path='/test' element={<EditBook2/>}/>
      
      

      </Routes>  
    
    </div>
  );
}

export default App;