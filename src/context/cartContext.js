import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext([])

const useCart = () => {
  return useContext(CartContext)
}

const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState([])

  useEffect (() => {
    console.log('')
    const cartStorage = localStorage.getItem('cart')
    if (cartStorage.length > 0) {
      setCart(JSON.parse(cartStorage))
    }
  }, [])
  
  const add = (product) => {
    setCart(cart => cart.concat(product))
    
  }

  const context = {
    cart,
    add: add
  }

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  )
}

export { useCart, CartProvider }