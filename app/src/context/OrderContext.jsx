import { createContext, useContext, useMemo, useState } from 'react'
import {
  EXPRESS_DELIVERY_FEE,
  TAX_RATE,
  initialCart,
} from '../data/order.js'

const OrderContext = createContext(null)

function makeKey(id, size) {
  const slug = String(size)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${id}-${slug}`
}

export function OrderProvider({ children }) {
  const [cart, setCart] = useState(initialCart)
  const [fulfillment, setFulfillment] = useState('delivery')

  const addItem = ({ id, name, size, unitPrice, qty = 1, note = '' }) => {
    const key = makeKey(id, size)
    setCart((current) => {
      const existing = current.find((line) => line.key === key)
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, qty: line.qty + qty } : line,
        )
      }
      return [...current, { key, id, name, size, unitPrice, qty, note }]
    })
  }

  const removeItem = (key) => {
    setCart((current) => current.filter((line) => line.key !== key))
  }

  const clearCart = () => setCart([])

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.unitPrice * line.qty, 0),
    [cart],
  )
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal])
  const itemCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty, 0),
    [cart],
  )
  const deliveryFee = fulfillment === 'delivery' ? EXPRESS_DELIVERY_FEE : 0

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    subtotal,
    tax,
    itemCount,
    fulfillment,
    setFulfillment,
    deliveryFee,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrder must be used inside OrderProvider')
  return context
}
