import { createContext } from "react";
import { data } from "./Data/data";

const CartContext = createContext();
export const CartProvider = CartContext.Provider;
export default CartContext;

export const initialState = {
  cart: [],
  products: data,
  total: 0,
  fullView: true,
  tax: 0,
  finalTotal: 0,
  isModal: false,
  isClicked: false,
  productModal: false,
  productModalID: null,
};

export const reducer = (state, action) => {
  console.log(state);

  let newItem = state.products.find(
    (element) => element.sku === action.payload
  );

  let cartItem = state.cart.find((element) => element.sku === action.payload);

  switch (action.type) {
    case "addCart":
      if (state.cart.find((element) => element.sku === action.payload)) {
        let newTax = cartItem.price * 0.065;
        return {
          ...state,
          total: state.total + cartItem.price,
          cart: state.cart.map((cartItem) =>
            cartItem.sku === action.payload
              ? {
                  ...cartItem,
                  quntity: cartItem.quntity + 1,
                }
              : cartItem
          ),
          tax: state.tax + newTax,
          finalTotal: state.finalTotal + state.tax + cartItem.price,
        };
      } else {
        newItem.quntity = 1;
        let newTax = newItem.price * 0.065;
        let tot = newTax + state.tax + state.total;

        // console.log(newItem.price,tot, state.finalToal)
        return {
          ...state,
          cart: [...state.cart, newItem],
          total: state.total + newItem.price,
          tax: state.tax + newTax,
          finalTotal: newItem.price + tot,
        };
      }

      break;
    case "clearCart":
      return {
        ...state,
        cart: [],
        total: 0,
        tax: 0,
        finalTotal: 0,
      };
    case "decItem":
      let newPrice = state.total - cartItem.price;
      let newTax = newPrice * 0.065;
      if ( cartItem.quntity === 1 ) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.sku !== action.payload),
          total: newPrice,
          tax: newTax,
          finalTotal: newTax + state.total,
        };
      }
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.sku === action.payload
            ? {
                ...cartItem,
                quntity: cartItem.quntity - 1,
              }
            : cartItem
        ),
        total: state.total - newItem.price,
        tax: newTax,
        finalTotal: state.tax + state.total,
      };
      break;
    case "inItem":
      let newTx = cartItem.price * 0.065;
      let newPri = state.total + cartItem.price;

      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.sku === action.payload
            ? {
                ...cartItem,
                quntity: cartItem.quntity + 1,
              }
            : cartItem
        ),
        total: newPri,
        tax: newTx,
        finalTotal: state.tax + state.total,
       
      };
      break;
    case "openModal":
      
      return {
        ...state,
        isModal: !state.isModal,
        finalTotal: action.payload,
        total: state.total ,
        tax: state.tax ,
  
      };
      break;
    case "openProductModal":
      return {
        ...state,
        productModal: !state.productModal,
        productModalID: action.payload,
      };
      break;

    case "nextProduct":
      if (action.payload === state.products.length) {
        return {
          ...state,
          productModalID: 1,
        };
      }
      return {
        ...state,
        productModalID: action.payload + 1,
      };
      break;

    case "prevProduct":
      if (action.payload === 1) {
        return {
          ...state,
          productModalID: state.products.length,
        };
      }
      return {
        ...state,
        productModalID: action.payload - 1,
      };
      break;
    case "addQty":
        let nI = state.cart.find((element) => element.sku === action.payload.id);
       
      if (state.cart.find((element) => element.sku === nI.sku)) {
        let neTotal = nI.price * action.payload.qty;
        let nt = neTotal * 0.065
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.sku === action.payload.id
              ? {
                  ...cartItem,
                  quntity: cartItem.quntity + action.payload.qty,
                }
              : cartItem
          ),
        
          total: state.total + neTotal,
          tax: state.tax + nt,
          finalToal: state.tax + state.total,
        };
      } else {
        let newItem = state.products.find(
          (element) => element.sku === action.payload.id
        );
        newItem.quntity = action.payload.qty;
        let newItemPrice = newItem.price *  newItem.quntity 
        let nt = newItemPrice * 0.065

        return {
          ...state,
          cart: [...state.cart, newItem],
          total: state.total + newItemPrice,
          tax: state.tax + nt,
          finalToal: state.tax + state.total,
        };
      }
      case 'removeItem':
        console.log(action.payload);
        let newTl = state.total - action.payload.minusPrice;

        let neT = newTl * 0.065;
        let newFt = newTl + neT
        return {
          ...state,
          cart: state.cart.filter((item) => item.sku !== action.payload.id),
          total: newTl,
          tax: neT,
          finalToal: newFt,
        }
        break;
    default:
      console.log("deault case");
      return {
        ...state,
      };
  }
};
