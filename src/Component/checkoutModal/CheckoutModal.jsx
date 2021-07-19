import React,{useContext} from 'react'
import {FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaTimes} from 'react-icons/fa'
import './CheckOutModal.scss';
import CartContext from "../../globalStore";
function CheckoutModal() {
    const { dispatch,total,tax, finalTotal} =
    useContext(CartContext);
    return (
        <div className="modal">
             <button className="closeModal" onClick={() => dispatch({ type: "openModal"})}><FaTimes/></button>
            <h1>Checkout</h1>
            <p className="cards"><span>We accept :</span><FaCcVisa/> <FaCcMastercard/> <FaCcAmex/> <FaCcDiscover/> </p>
            <div className="money">
            <h4>Subtotal: ${total.toFixed(2)}</h4>
            <h4>tax: ${tax.toFixed(2)}</h4>
            <h1>Total: ${finalTotal}</h1>
            </div>
          
            <p>This is where our payment processor goes</p>
        </div>
    )
}

export default CheckoutModal
