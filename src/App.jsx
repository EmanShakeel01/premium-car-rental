import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { WishlistProvider } from './context/WishlistContext'
import { CompareProvider } from './context/CompareContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import Booking from './pages/Booking'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import Admin from './pages/Admin'

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CompareProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/cars" element={<Layout><Cars /></Layout>} />
              <Route path="/cars/:id" element={<Layout><CarDetails /></Layout>} />
              <Route path="/booking/:id" element={<Layout><Booking /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
              <Route path="/compare" element={<Layout><Compare /></Layout>} />
              <Route path="/admin" element={<Layout><Admin /></Layout>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </WishlistProvider>
    </ThemeProvider>
  )
}