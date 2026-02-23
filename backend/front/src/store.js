import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import {combineReducers} from 'redux';
// import { ProductReducer } from './component/Reducers/ProductReducer';
import ProductReducer from './component/slice/productslice';
import ProductDetailReducer from './component/slice/ProductDetailslice';
import  cartReducer  from './component/slice/cartslice';
import  loginReducer  from './component/slice/loginslice';
import  registerReducer  from './component/slice/registerslice';
import updateProfileReducer from './component/slice/updateProfile';
import Shippingreducer from './component/slice/shippingslice';
import paymentReducer from './component/slice/paymentslice';
import orderReducer from './component/slice/orderslice';
import  orderprofileReducer  from './component/slice/orderprofileslice';
import isPaidReducer from './component/slice/isPaidslice'; 
import myOrdersReducer from './component/slice/myOrderslice';
import getUsersReducer from './component/slice/getUserslice';
import deleteuserReducer from './component/slice/deleteUserslice';
import adminUpdateUserReducer from './component/slice/adminUpdateUser';
import deleteProductReducer, { deleteproducts } from './component/slice/deleteProductslice';
import createUpdateProductReducer from './component/slice/createUpdateProduct';
import adminAllOrdersReducer from './component/slice/adminAllOrderslice';
import orderDeliveredReducer  from './component/slice/orderDeliveredslice';
import reviewSliceReducer from './component/slice/reviewslice'
import topProductReducer from './component/slice/topProductslice';


const store = configureStore({
    reducer:{
        products: ProductReducer,
        productDetail: ProductDetailReducer,
        cart: cartReducer,
        login: loginReducer,
        register: registerReducer,
        updateProfile: updateProfileReducer,
        shipping: Shippingreducer,
        payment: paymentReducer,
        order: orderReducer,
        orderProfile: orderprofileReducer,
        isPaid: isPaidReducer,
        myOrders: myOrdersReducer,
        getusers: getUsersReducer,
        deleteuser: deleteuserReducer,
        adminUpdateUser: adminUpdateUserReducer,
        deleteproducts: deleteProductReducer,
        createUpdateProduct: createUpdateProductReducer,
        adminAllOrders: adminAllOrdersReducer,
        orderDelivered: orderDeliveredReducer,
        review: reviewSliceReducer,
        topProducts: topProductReducer,
    },
   
    devTools: process.env.NODE_ENV !== 'production',
});
export default store;