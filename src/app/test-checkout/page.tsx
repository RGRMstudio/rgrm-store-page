'use client'

export default function TestCheckout() {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Test Product',
          price: '45.00',
          quantity: 1,
          email: 'test@raguiromo.store'
        })
      })
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to create checkout session')
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'black',
      color: 'white'
    }}>
      <button 
        onClick={handleCheckout}
        style={{
          padding: '20px 40px',
          fontSize: '18px',
          background: '#635BFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Test Checkout
      </button>
    </div>
  )
}
