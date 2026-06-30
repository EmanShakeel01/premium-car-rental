import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="navbar__logo-icon">◈</span>
          <span className="footer__logo-text">
            <span className="navbar__logo-main">LUXE</span>
            <span className="navbar__logo-sub">DRIVE</span>
          </span>
          <p className="footer__tagline">Premium car rentals for every occasion.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Browse</h4>
          <Link to="/cars">All Cars</Link>
          <Link to="/cars?category=Wedding Cars">Wedding Cars</Link>
          <Link to="/cars?category=Luxury Cars">Luxury Cars</Link>
          <Link to="/cars?category=Sports Cars">Sports Cars</Link>
          <Link to="/cars?category=Electric Vehicles">Electric Vehicles</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/wishlist">My Wishlist</Link>
          <Link to="/compare">Compare Cars</Link>
          <Link to="/admin">Admin</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <p>📍 123 Luxury Lane, Dubai</p>
          <p>📞 +971 50 123 4567</p>
          <p>✉ hello@luxedrive.com</p>
          <p>🕐 24 / 7 Support</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} LuxeDrive. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}