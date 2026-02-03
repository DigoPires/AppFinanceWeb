import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './Pages/Login/index.js';
import Register from './Pages/Register/index.js';

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}