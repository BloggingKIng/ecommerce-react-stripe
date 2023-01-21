import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

import React from 'react'

const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const toogleCartItemQnty = (id, value) => {
    foundProduct = cartItems.find((item)=> item._id === id)
    index = cartItems.findIndex((product) => product._id === id )
    let NewCartItems = [...cartItems]
    if (value === 'inc'){
        foundProduct.quantity += 1
        NewCartItems[index] = foundProduct
        setCartItems(NewCartItems)
        setTotalPrice((prevTotal)=> (prevTotal + foundProduct.price))
        setTotalQuantities((prevTotal)=> (prevTotal + 1))
    }else if (value === 'dec'){
        if (foundProduct.quantity > 1){
            foundProduct.quantity -= 1
            NewCartItems[index] = foundProduct
            setCartItems(NewCartItems)
            setTotalPrice((prevTotal)=> (prevTotal - foundProduct.price))
            setTotalQuantities((prevTotal)=> (prevTotal - 1))
        }
    }
  }

  const onAdd = (product, quantity) => {
    const checkProductInCard = cartItems.find((item)=> item._id === product._id)
    setTotalPrice((prevPrice)=> (prevPrice + product.price * quantity))
    setTotalQuantities((prevQnties)=> (prevQnties+quantity))

    if (checkProductInCard) {
        const updatedCartItems = cartItems.map((cartProduct)=> {
            if (cartProduct._id === product._id){
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            }
        })
        setCartItems(updatedCartItems)
    }else {
        product.quantity = quantity;
        setCartItems([...cartItems,{...product}])
    }
    toast.success(`${quantity} ${product.name} added to cart`)
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item)=> item._id === product._id)
    const NewCartItems = cartItems.filter((item)=> item._id !== product._id )
    setTotalPrice((prev)=>(prev-(foundProduct.price * foundProduct.quantity)))
    setTotalQuantities((prev)=>(prev - foundProduct.quantity))

    setCartItems(NewCartItems)
    
  }

  const incQty = () => {
    setQty((prevQty)=> prevQty+1)
  }

  const decQty = () => {
    setQty((prevQty)=> {
        if (prevQty - 1 < 1){return 1}
        return(prevQty-1)
    })
  }

  return (<Context.Provider value = {{showCart, cartItems, totalPrice, totalQuantities, qty,onRemove, incQty, decQty, onAdd, setShowCart, toogleCartItemQnty, setTotalPrice, setTotalQuantities, setCartItems}}>{ children }</Context.Provider>)

}
export const useStateContext = () => useContext(Context)
export default StateContext
