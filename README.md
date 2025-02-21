# ProDash - Product Management Dashboard

A modern, responsive product management dashboard built with Next.js, TypeScript, Redux, and Tailwind CSS.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete products
- **Search & Filter**: Dynamic search and category-based filtering
- **Sort**: Price-based sorting (low to high, high to low)
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Toggle between light and dark themes
- **Local Storage**: Persistent data storage

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Shadcn UI
- Lucide Icons

## ⚡ Performance Optimizations

### Code Splitting

- Dynamic imports for components using `next/dynamic`
- Lazy loading for heavy components:
  - ProductForm
  - ProductCard
  - Filters

### Component Optimization

- Memoization using `React.memo` for:
  - ProductCard
  - Filters
  - ProductForm
- State management optimization using Redux selectors

### Loading States

- Skeleton loading screens
- Smooth transitions
- Optimized images using Next.js Image component

## 🚀 Quick Start

1. Clone the repository

```bash
git clone https://github.com/hasibahamedsakib/prodash.git
```

2. Install dependencies

```bash
yarn install
```

3. Run development server

```bash
yarn dev
```
