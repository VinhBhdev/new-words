import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Navigation from "./components/Navigation";
import Practice from './components/practice/Practice.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
