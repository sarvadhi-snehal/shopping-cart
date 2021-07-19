import React, { useState, useContext } from "react";
import "./Product.scss";
import { FaSearchPlus } from "react-icons/fa";
import { Bounce } from "react-reveal";
import CartContext from "../../globalStore";
function Product({ id, product, description, price, img }) {
  const { dispatch } = useContext(CartContext);
  const [view, setView] = useState(false);
  return (
    <div className="product">
      <div
        className="img"
        onMouseEnter={() => setView(true)}
        onMouseLeave={() => setView(false)}
        onClick={() => dispatch({ type: "openProductModal", payload: id })}
      >
        <img src={img} alt="Product" className="productImage" />
        {view && (
          <div className="hoverOver">
            <Bounce bottom>
              <FaSearchPlus className="meg" />
            </Bounce>
          </div>
        )}
      </div>
      <div className="leftSide">
        <h1>{product}</h1>
        <p>{description}</p>
        <p className="price">${price.toFixed(2)}</p>
        <button onClick={() => dispatch({ type: "addCart", payload: id })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
