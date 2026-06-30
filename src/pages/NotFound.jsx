import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <div className="not-found__number display">404</div>
        <h2 className="not-found__title display">Lost on the Road?</h2>
        <p className="not-found__desc">The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/cars" className="btn btn-outline">Browse Cars</Link>
        </div>
      </div>
    </div>
  )
}