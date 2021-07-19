import Header from "./Component/Header/Header";
import React, { useReducer, useEffect } from "react";
import "./App.scss";
import Cart from "./Component/Cart/Cart";
import ProductList from "./Component/ProductList/ProductList";
import { initialState, reducer, CartProvider } from "./globalStore";
import CheckOutArea from "./Component/CheckOutArea/CheckOutArea";
import CheckoutModal from "./Component/checkoutModal/CheckoutModal";
import ProductModal from "./Component/ProductModal/ProductModal";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  const {
    products,
    cart,
    total,
    fullView,
    tax,
    isModal,
    isClicked,
    productModal,
    productModalID,
    finalTotal
  } = state;
  let totalItems = cart.reduce((sum, item) => sum + item.quntity, 0);


  return (
    <CartProvider
      value={{
        dispatch,
        products,
        cart,
        total,
        fullView,
        totalItems,
        tax,
        isModal,
        isClicked,
        productModalID,
        finalTotal
      }}
    >
      {productModal && <ProductModal />}
      {isModal && <CheckoutModal />}
      <div className={"App" + (isModal || productModal ? " overlayApp" : "")}>
        <Header />
        <ProductList />
        <Cart />
        {cart.length !== 0 && <CheckOutArea />}
      </div>
    </CartProvider>
  );
}

export default App;
