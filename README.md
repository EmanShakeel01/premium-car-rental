# LuxeDrive — Premium Car Rental Website

A modern, fully responsive car rental platform built with React.js, featuring an extensive fleet across 9 categories, advanced search & filtering, a complete booking flow with validation, and bonus features like wishlist, compare, dark mode, and an admin dashboard.

**Live Demo:** [https://premium-car-rental-1usp.vercel.app/](https://premium-car-rental-1usp.vercel.app/)
**GitHub Repository:** [https://github.com/EmanShakeel01/premium-car-rental](https://github.com/EmanShakeel01/premium-car-rental)

---

## Features

### Core Requirements
- Fully responsive design (mobile, tablet, desktop)
- React Router with 10 routes (Home, Cars, Car Details, Booking, About, Contact, 404, + bonus pages)
- Search functionality (navbar + hero + cars page)
- Filter by category, fuel type, transmission, price range, availability
- Sort by price (asc/desc), rating, newest, featured
- Dynamic car data (32 vehicles across 9 categories via JSON)
- Detailed car information pages with image gallery, specs, features
- Booking form with full client-side validation
- Loading skeleton states & empty states
- Clean, reusable component architecture

### Car Categories
Wedding Cars · Luxury Cars · Sports Cars · SUVs · Sedans · Economy Cars · Electric Vehicles · Limousines · Vans & Minibuses

### Wedding Collection
Includes Vintage Rolls-Royce, Bentley, Mercedes-Benz, BMW, Audi, Stretch Limousines, and Exotic Supercars.

### Bonus Features
-  **Wishlist** — Save favourite cars (persisted in localStorage)
-  **Compare Cars** — Side-by-side spec comparison (up to 3 cars)
-  **Admin Dashboard** — Add, edit, delete cars; toggle availability
-  **Dark Mode** — Full theme toggle, persisted across sessions

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React.js (Vite) | Core framework & build tool |
| React Router v6 | Client-side routing |
| Context API | Global state (theme, wishlist, compare) |
| Vanilla CSS | Styling with CSS variables for theming |
| JSON | Mock car database |

---

## Project Structure

```
car-rental/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── CarCard.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── CompareContext.jsx
│   ├── data/
│   │   └── cars.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cars.jsx
│   │   ├── CarDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── NotFound.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Compare.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd car-rental
```

2. Install dependencies
```bash
npm install
```

3. Install required packages (if not already included)
```bash
npm install react-router-dom
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---


## Pages Overview

| Route | Description |
|---|---|
| `/` | Hero search, categories, featured cars, wedding collection banner |
| `/cars` | Full fleet with sidebar filters, search, sort |
| `/cars/:id` | Car detail page with gallery, specs, related vehicles |
| `/booking/:id` | Booking form with validation + confirmation screen |
| `/about` | Company story, values, team |
| `/contact` | Contact form with validation |
| `/wishlist` | Saved cars |
| `/compare` | Side-by-side comparison table |
| `/admin` | CRUD dashboard for managing the fleet |
| `*` | Custom 404 page |

---

