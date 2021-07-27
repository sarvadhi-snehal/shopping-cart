import React,{useEffect} from "react";
// import {MdExposureZero} from 'react-icons/md'
import { useContext, useState } from "react";
import "./Cart.scss";
import CartContext from "../../globalStore";
import MiniCart from "../MiniCart/MiniCart";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
function Cart() {
  const [isOpen, setisOpen] = useState(true);
  const { cart, dispatch, total, tax } = useContext(CartContext);
  const handlClick = () => {
    dispatch({ type: "clearCart" });
    setisOpen(false);
  };

useEffect(() =>{
  if(cart.length === 0) {
    setisOpen(!isOpen);
  }
},[cart])

  let fT = tax + total;

  return (
    <div className={"cartContainer" + (isOpen ? " widh" : "")}>
      <MiniCart cls="topLeft" clk={() => setisOpen(!isOpen)} />
      {isOpen && (
        <div className="cartitems">
          {cart.length !== 0 &&
            cart.map((cartItem) => {
              return (
                <div className="cart" key={cartItem.sku}>
                  <div
                    onClick={() =>
                      dispatch({
                        type: "removeItem",
                        payload: {
                          id: cartItem.sku,
                          minusPrice: cartItem.price * cartItem.quntity,
                        },
                      })
                    }
                  >
                    <img className="img" src={cartItem.image} alt="" />
                    <FaTimes className="delProduct" />
                  </div>

                  <div className="btn-ctn">
                    <button
                      className="btn-quntity"
                      onClick={() =>
                        dispatch({ type: "decItem", payload: cartItem.sku })
                      }
                    >
                      <FaMinus />
                    </button>
                    <p>{cartItem.quntity}</p>
                    <button
                      className="btn-quntity"
                      onClick={() =>
                        dispatch({ type: "inItem", payload: cartItem.sku })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p>{cartItem.product}</p>
                  <p>${cartItem.price}</p>
                </div>
              );
            })}

          <p className="totalStyle">
            ${cart.length === 0 ? "0.00" : total.toFixed(2)}
          </p>
        </div>
      )}
      {isOpen && cart.length !== 0 ? (
        <div className="btnContainer">
          <button onClick={handlClick} className="btn-end">
            Clear cart
          </button>
          <button
            className="btn-end"
            onClick={() =>
              dispatch({ type: "openModal", payload: fT.toFixed(2) })
            }
          >
            Check out
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
