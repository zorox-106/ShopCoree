import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://shopcore-backend.onrender.com/api'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkoutStatus, setCheckoutStatus] = useState('') // '', 'processing', 'success', 'error'

  // Fetch products from backend on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Add product to cart (increases quantity if already present)
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        )
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  // Calculate total price of cart
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Handle checkout (create order, then process payment)
  const handleCheckout = async () => {
    if (cart.length === 0) return

    setCheckoutStatus('processing')
    try {
      // Step 1: Create order
      const orderRes = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'cust-001', // Use our mock customer
          items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
        })
      })

      if (!orderRes.ok) throw new Error('Order creation failed')
      const orderData = await orderRes.json()

      // Step 2: Process payment (UPI as default for demo)
      const paymentRes = await fetch(`${API_URL}/orders/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.order.id,
          paymentMethod: 'upi',
          paymentDetails: { upiId: 'marcus.j@upi' }
        })
      })

      if (!paymentRes.ok) throw new Error('Payment failed')

      // If everything is successful
      setCheckoutStatus('success')
      setCart([])
      // Refresh products to update stock
      const refreshRes = await fetch(`${API_URL}/products`)
      setProducts(await refreshRes.json())
      // Reset status after 3 seconds
      setTimeout(() => setCheckoutStatus(''), 3000)
    } catch (err) {
      console.error(err)
      setCheckoutStatus('error')
      setTimeout(() => setCheckoutStatus(''), 3000)
    }
  }

  if (loading) {
    return <div className="loading-screen">Loading ShopCore...</div>
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="logo">🛒 ShopCore</h1>
          <p className="tagline">Premium Tech Accessories</p>
        </div>
        <div className="header-right">
          <div className="cart-indicator">
            <span className="cart-count">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
            items | <span className="cart-total">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-grid">
        {/* Products Grid */}
        <section className="products-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <span className={`stock-badge ${product.stockQuantity < 5 ? 'low' : ''}`}>
                    Stock: {product.stockQuantity}
                  </span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  disabled={product.stockQuantity === 0}
                >
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Sidebar */}
        <aside className="cart-sidebar">
          <h2>Your Cart</h2>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p className="empty-hint">Add some premium tech accessories to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-details">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="total-row">
                  <span>Total</span>
                  <span className="total-price">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={checkoutStatus === 'processing'}
                >
                  {checkoutStatus === 'processing' ? 'Processing...' : 'Checkout'}
                </button>

                {checkoutStatus === 'success' && (
                  <div className="status-msg success">✅ Checkout successful! Order placed.</div>
                )}
                {checkoutStatus === 'error' && (
                  <div className="status-msg error">❌ Checkout failed. Please try again.</div>
                )}
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App
