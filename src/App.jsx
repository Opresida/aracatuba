import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Loader from './components/Loader.jsx';
import Home from './pages/Home.jsx';
import Brandbook from './pages/Brandbook.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Loader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brandbook" element={<Brandbook />} />
      </Routes>
    </BrowserRouter>
  );
}
