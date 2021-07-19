import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "../../globalStore";
import './MIniCart.scss'
function MiniCart({cls,clk}) {
  const { totalItems } = useContext(CartContext);

  return (
    <div className={cls}  onClick={clk}>
      {totalItems}
      <FaShoppingCart />
    </div>
  );
}

export default MiniCart;
