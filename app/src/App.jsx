import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import MenuOrderPage from './pages/MenuOrderPage.jsx'

export default function App() {
  return (
    <OrderProvider>
      <ScrollManager />
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased flex flex-col">
        <Header />
        <main className="flex-1 bg-background">
          <Routes>
            <Route path="/" element={<MenuOrderPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </OrderProvider>
  )
}
