import React, { useContext } from "react";
import Product from "../Product/Product";
import "./ProductList.scss";
import CartContext from "../../globalStore";
function ProductList() {
  const { products } = useContext(CartContext);

  return (
    <div className="productsholder">
      <h1>Products</h1>
      <div className="productList">
        {products.map((product) => {
          return (
            <Product
              key={product.sku}
              id={product.sku}
              product={product.product}
              description={product.description}
              price={product.price}
              img={product.image}
         
            />
          );
        })}
      </div>
      {/* <div className="productModal">
          {products.map((product) => {
            return (
              <Product key={product.sku} id={product.sku} 
                        product={product.product}
                        description={product.description} 
                        price={product.price}
                        img={product.image}/>
            );
          })}
        </div> */}
    </div>
  );
}

export default ProductList;
