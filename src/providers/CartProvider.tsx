import { CartItem, Product, Tables } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '@/api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/api/order-items';


type cartType = {
  items: CartItem[],
  addItem: (product: Tables<'products'>, size: CartItem['size']) => void,
  updateQuantity: (itemId: string, amount: -1 | 1) => void,
  total: number;
  checkout: () => void;
}
export const CartContext = createContext<cartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
  checkout: () => { }
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()

  const router = useRouter()


  const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
    const existingItem = items.find(item => item.product === product && item.size === size)

    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    }

    setItems(prevItems => [newCartItem, ...prevItems])
  }

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + amount
          }
        }
        return item
      }).filter(item => item.quantity > 0)
    })
    console.log(itemId, amount)
  }

  const clearCart = () => {
    setItems([])
  }

  const checkout = () => {
    console.warn('Checkout')
    insertOrder({ total }, {
      onSuccess: saveOrderItems
    })
  }

  const saveOrderItems = (order: Tables<'orders'>) => {

    const orderItems = items.map(cartItem => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size
    }))

    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart()
        router.push(`/(user)/orders/${order.id}`)

      }
    })

    console.log(order)
  }

  const total = Number(items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0).toFixed(2))




  const values = {
    items,
    addItem,
    updateQuantity,
    total,
    checkout
  }
  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)
