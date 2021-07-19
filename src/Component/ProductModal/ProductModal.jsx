import React, { useContext, useState } from "react";
import CartContext from "../../globalStore";
import InnerImageZoom from "react-inner-image-zoom";
import "./ProductModal.scss";
import { FaLessThan, FaGreaterThan, FaTimes } from "react-icons/fa";
function ProductModal() {
  const [input, setInput] = useState(1);
  
  const { products, productModalID, dispatch } = useContext(CartContext);
  const im = products.map((element) => {
    return element.image;
  });
  console.log(im);

const [proId,setProId] = useState(productModalID);
const [imgSrc,setImgSrc] = useState(im[productModalID - 1]);

const handlClick = (e) => {
  setImgSrc(e.target.src)
}
  const handleSubmit = (e) => {
    e.preventDefault();
    let qty = parseInt(input);
    dispatch({ type: "addQty", payload: { qty, id: productModalID } });
    setInput(1);
    dispatch({ type: "openProductModal" });
  };

  const handleNext = (e) => {
    setProId(proId +1)
    setImgSrc(im[proId]);
    console.log(proId,imgSrc)
    if(proId === products.length){
      setProId(1)
    setImgSrc(im[0]);

    }
  }
  

  const handlPrev = (e) => {
    setProId(proId - 1)
    setImgSrc(im[proId-2]);
    if(proId === 1){
      setProId(products.length)
      console.log(proId)
    setImgSrc(im[products.length-1]);

    }
  }

  return (
    <div className="modalContainer">
      <FaLessThan
        className="value"
        name={proId}
        onClick={handlPrev}
      />
      <div className="product-modal">
        <button
          className="closeModal"
          onClick={() => dispatch({ type: "openProductModal" })}
        >
          <FaTimes />
        </button>

        {products.map((prod) => {
          const { sku, product, image, images, description, details, price } =
            prod;
          let id = sku;
          if (sku === proId) {
      
            return (
              <div className="mainImage">
                <div className="imgContainer">
                  <InnerImageZoom className="acImg"
                    src={imgSrc}
                    zoomSrc={imgSrc}
                    zoomType="hover"
                    zoomPreload={true}
                  />
                  {"images" in prod ? (
                    <div className="imgArr">
                      <img src={images[0].image} alt="" onClick={handlClick}/>
                      <img src={images[1].image} alt="" onClick={handlClick}/>
                      <img src={images[2].image} alt="" onClick={handlClick}/>
                      <img src={images[3].image} alt="" onClick={handlClick}/>
                    </div>
                  ) : null}
                </div>

                <h1>{product}</h1>
                <p>{description}</p>
                <p>{details}</p>
                <h5 className="bigFont">${price.toFixed(2)}</h5>
                <form className="cartAdd" onSubmit={handleSubmit}>
                  <label for="quntity">QTY</label>
                  <input
                    type="text"
                    name="quntity"
                    id="quntity"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <input
                    className="qty-btn"
                    type="submit"
                    value="Add to Cart"
                  />
                </form>
              </div>
            );
          }
        })}
      </div>
      <FaGreaterThan
        className="value"
        onClick={handleNext}
        name={proId}

      />
    </div>
  );
}

export default ProductModal;
