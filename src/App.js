import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import Navbar from './components/Navbar';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<ItemListContainer />} />
      <Route path="/category/:categoryId" element={<ItemListContainer />} />
      <Route path="/item/:itemId" element={<ItemDetails />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
