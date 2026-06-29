import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (car) => {
    setWishlist(prev =>
      prev.find(c => c.id === car.id) ? prev : [...prev, car]
    )
  }

  const removeFromWishlist = (carId) => {
    setWishlist(prev => prev.filter(c => c.id !== carId))
  }

  const isWishlisted = (carId) => wishlist.some(c => c.id === carId)

  const toggleWishlist = (car) => {
    isWishlisted(car.id) ? removeFromWishlist(car.id) : addToWishlist(car)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}