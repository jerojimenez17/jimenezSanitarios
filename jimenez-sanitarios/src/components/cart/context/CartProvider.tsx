import React, { Children, useReducer } from 'react';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { CartReducer } from './CartReducer';
import CartState from "../../../models/CartState";
import Product from "../../../models/Product";
import ProductsTable from '../../ProductsTable/ProductsTable';



const INITIAL_STATE:CartState = {
    products:[]
}



interface props {
    children: JSX.Element | JSX.Element[];
}

const CartProvider = ({children}:props ) => {
    const [cartState, dispatch] = useReducer(CartReducer, INITIAL_STATE );

    const addItem = (product:Product) => {
      dispatch({
        type: 'addItem',
        payload: product,
      });
    }
      const addUnit = (product:Product) => {
          dispatch({
            type:'addUnit',
            payload: product,
          })
      }
      const removeUnit = (product:Product) => {
        dispatch({
          type:'removeUnit',
          payload: product
        })
    }
    const removeItem = (product:Product) => {    
      dispatch({
        type:'removeItem',
        payload: product
      })
    }
    const removeAll = () => {
      dispatch({
        type:'removeAll',
        payload: null

      })
    }
  return (
    <CartContext.Provider value={{ cartState:cartState, addItem: addItem, addUnit:addUnit, removeUnit:removeUnit, removeItem:removeItem,removeAll:removeAll}}>
        {children}
    </CartContext.Provider>
  )
  }

export default CartProvider;