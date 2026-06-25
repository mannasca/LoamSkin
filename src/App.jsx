import { useMemo, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'

const CART_KEY = 'loamskin_cart'

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const shipping = subtotal > 0 ? 4.99 : 0
  const total = subtotal + shipping

  const handleAddToCart = (product) => {
    setOrderPlaced(false)
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckoutOpen = () => {
    if (cartItems.length === 0) return
    setCheckoutOpen(true)
  }

  const handleCheckoutClose = () => setCheckoutOpen(false)

  const handlePlaceOrder = () => {
    setCartItems([])
    setCheckoutOpen(false)
    setCartOpen(false)
    setOrderPlaced(true)
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
      />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
      </Routes>
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setCartOpen(false)}
        onIncrement={(id) => handleQuantityChange(id, 1)}
        onDecrement={(id) => handleQuantityChange(id, -1)}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckoutOpen}
        orderPlaced={orderPlaced}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        total={total}
        items={cartItems}
        onClose={handleCheckoutClose}
        onPlaceOrder={handlePlaceOrder}
      />
    </>
  )
}
