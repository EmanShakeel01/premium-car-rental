import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'

export default function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const { wishlist } = useWishlist()
  const { compareList } = useCompare()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/cars?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setMenuOpen(false)
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cars', label: 'Cars' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <span>
            <span className="navbar__logo-main">LUXE</span>
            <span className="navbar__logo-sub">DRIVE</span>
          </span>
        </Link>

        <nav className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search cars…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar__search-input"
          />
          <button type="submit" className="navbar__search-btn" aria-label="Search">🔍</button>
        </form>

        <div className="navbar__actions">
          <Link to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
            ♡
            {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
          </Link>
          {compareList.length > 0 && (
            <Link to="/compare" className="navbar__icon-btn" aria-label="Compare">
              ⇄<span className="navbar__badge">{compareList.length}</span>
            </Link>
          )}
          <button className="navbar__icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
            {dark ? '☀' : '☾'}
          </button>
          <Link to="/admin" className="btn btn-primary navbar__admin-btn">Admin</Link>
        </div>

        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile">
          <form className="navbar__mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search cars…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-btn">🔍</button>
          </form>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/wishlist" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
          </Link>
          <Link to="/compare" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Compare {compareList.length > 0 && `(${compareList.length})`}
          </Link>
          <Link to="/admin" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Admin Dashboard
          </Link>
          <button className="navbar__mobile-link" onClick={toggleTheme}>
            {dark ? '☀ Light Mode' : '☾ Dark Mode'}
          </button>
        </div>
      )}
    </header>
  )
}