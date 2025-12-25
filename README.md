# RUPP Payment Portal

A complete React-based payment portal for the Royal University of Phnom Penh (RUPP) built with TypeScript, React Router, and Tailwind CSS.

## Features

- **Home Page** - Landing page with features and call-to-actions
- **About Us** - Information about the portal, mission, vision, and team
- **Login/Registration** - Authentication page with tabbed interface
- **Student Dashboard** - View payment history and status
- **Payment Submission** - Submit new tuition payments with receipt upload
- **Admin Dashboard** - Review and approve/reject student payments

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Vite

## Installation

1. Navigate to the project directory:

```bash
cd rupp-payment-portal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
rupp-payment-portal/
├── src/
│   ├── components/       # Reusable components (Header, Footer)
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── PaymentSubmission.tsx
│   │   └── AdminDashboard.tsx
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Routes

- `/` - Home page
- `/about` - About us page
- `/login` - Login/Registration page
- `/student/dashboard` - Student dashboard (payment history)
- `/student/payment` - Submit new payment
- `/admin/dashboard` - Admin dashboard (approve/reject payments)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## License

© 2024 Royal University of Phnom Penh. All rights reserved.
