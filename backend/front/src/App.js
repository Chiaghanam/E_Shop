import Home from './pages/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateProfile from './pages/UpdateProfile';
import Header from './component/Header';
import Footer from './component/Footer';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import UserList from './pages/UserList';
import AdminUpdateUser from './pages/AdminUpdateUser';
import AdminProductView from './pages/AdminProductView';
import AdminProductForm from './pages/AdminProductForm';
import AdminAllOrder from './pages/AdminAllOrder';
import NotFoundPage from './pages/NotFoundPage';
function App() {
 
  return (

    <Router className="App">
          <Header />
      <Routes element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/listorder" element={<OrderList />} />
        <Route path="/listuser" element={<UserList />} />
        <Route path="/admin/listproduct" element={<AdminProductView />} />
        <Route path="/admin/createproduct" element={<AdminProductForm />} />
        <Route path="/admin/allorders" element={<AdminAllOrder />} />
        <Route path='/search' element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />

        

        <Route path="/admin/editproduct/:_id/" element={<AdminProductForm />} />
        <Route path="/order/:_id/" element={<Order />} />
        <Route path="/user/edit/:id/" element={<AdminUpdateUser />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
