import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import FriendProfilePage from './pages/FriendProflie'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/Profile'
import NoPage from './pages/NoPage';


function App() {
  return (
      <div className='Routes'>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>} /> 
            <Route path='/home' element={<HomePage/>} ></Route>
            <Route path='/FriendProfile' element={<FriendProfilePage/>} ></Route>
            <Route path='/Login' element={<LoginPage/>} ></Route>
            <Route path='/Register' element={<Register/>} ></Route>
            <Route path='/Profile' element={<ProfilePage/>} ></Route>
            <Route path='/*' element={<NoPage/>} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
