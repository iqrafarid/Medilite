import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import Services from './Components/Services';
import Login from './Components/Login';
import Register from './Components/Register';
import Contact from './Components/Contact';
import About from './Components/About';
import Medicines from './Components/Medicines';
import CartSideBar from "./Components/CartSidebar";
import MedicineDetail from './Components/MedicineDetail';

function App() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('src/datasets/medicines.json')
        .then(res => res.json())
        .then(data => {
            setMedicines(data);
            setLoading(false);
        })
    }, []);

    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
 
    function addToCart(medicine) {
        alert(`${medicine.name} added to cart`);
        setCart([...cart, medicine]);
    }

    function removeFromCart(id) {
        setCart(cart.filter(m => m.id !== id));
    }

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>SideBar</button>
            {isOpen && <CartSideBar cart={cart} onRemove={removeFromCart} onClose={() => setIsOpen(false)} />}
            <Navbar cartCount={cart.length} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/medicines" element={<Medicines medicines={medicines} loading={loading} onAddToCart={addToCart} />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/medicines/:id" element={<MedicineDetail medicines={medicines} />} />
                <Route path="*" element={<p>404 - Page Not Found</p>} />
            </Routes>
        </div>
    )
}

export default App;