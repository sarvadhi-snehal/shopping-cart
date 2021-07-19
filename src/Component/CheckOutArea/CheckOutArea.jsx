import React, { useContext } from "react";
import MiniCart from "../MiniCart/MiniCart";
import CartContext from "../../globalStore";
import './CheckOutArea.scss'
function CheckOutArea() {
  const { cart, total, tax, dispatch, finalTotal } = useContext(CartContext);
  let fT = tax +total;
  
  return (
    <div className="checkout-area">
      <h1>Checkout Area</h1>
      <MiniCart />
      <table>
        <thead>
          <tr>
            {/* <th>{cartKeys[0][0]}</th>
            <th>{cartKeys[0][1]}</th>
            <th>{cartKeys[0][3]}</th>
            <th>{cartKeys[0][4]}</th> */}
            <th>Sku</th>
            <th>Name</th>
            <th className="none">Description</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem) => {
            return (
              <tr>
                <td>{cartItem.sku}</td>
                <td>{cartItem.product}</td>
                <td className="none">{cartItem.description}</td>
                <td>{cartItem.quntity}</td>
                <td>${cartItem.price.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="paddingTop">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="none">&nbsp;</td>
            <td> Subtotal</td>
            <td className="boldText">${total.toFixed(2)}</td>
          </tr>
          <tr>
          <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="none">&nbsp;</td>
            <td> Tax:</td>
            <td className="boldText">${tax.toFixed(2)}</td>
          </tr>
          <tr>
          <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="none">&nbsp;</td>
            <td> Total:</td>
            <td className="boldText bigText">${fT.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => dispatch({ type: "openModal",payload: fT.toFixed(2) })}>Checkout</button>
    </div>
  );
}

export default CheckOutArea;
