import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import CarCard from '../components/CarCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <h1 className="display" style={{ marginBottom: '2rem' }}>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">♡</span>
          <h3>Your wishlist is empty</h3>
          <p>Browse our fleet and save your favourite cars here.</p>
          <Link to="/cars" className="btn btn-primary">Browse Cars</Link>
        </div>
      ) : (
        <div className="cars__grid">
          {wishlist.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  )
}