# Multi-Channel E-commerce Platform - Frontend

A modern e-commerce storefront built with Next.js, featuring advanced product filtering, real-time inventory tracking, and seamless shopping experience.

## 🚀 Features

- **Product Catalog**: Browse products with advanced filtering and search
- **Real-time Inventory**: Live stock status indicators
- **Shopping Cart**: Full-featured cart with checkout system
- **Responsive Design**: Mobile-first responsive interface
- **Multi-language Support**: Internationalization with next-intl
- **Authentication**: Firebase authentication integration
- **State Management**: Redux Toolkit for global state

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design
- **State Management**: Redux Toolkit
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Icons**: Heroicons, React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Md-Sefat-Alam/multi-channel-ecommerce.git
cd multi-channel-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```
# Add other required environment variables
```

## 🏃‍♂️ Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Turbo Mode (Faster Development)
```bash
npm run turbo
```

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── store/              # Redux store configuration
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## 🔧 Key Dependencies

- **Next.js**: React framework with App Router
- **Ant Design**: Enterprise-class UI design library
- **Redux Toolkit**: State management
- **Firebase**: Authentication and backend services
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Quill**: Rich text editor

## 🌟 Key Features Implementation

### Product Catalog
- Advanced filtering by category, price, size, color
- Search functionality with real-time results
- Product variant management
- Image galleries with zoom functionality

### Shopping Cart
- Add/remove items with quantity management
- Real-time price calculations
- Persistent cart state
- Checkout integration

### Inventory Management
- Real-time stock status indicators
- Low stock warnings
- Multi-channel inventory synchronization
- Product availability notifications

## 🔗 Integration

This frontend integrates with:
- **Backend API**: Product data, user management, orders
- **SSActiveWear API**: Product sourcing and inventory
- **Shopify API**: Multi-channel sales management

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Progressive Web App capabilities

## 🚀 Deployment

The application is optimized for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the Yupsis Full-Stack Engineering Assessment.

---

**Developer**: Md. Sefat Alam  
**Contact**: md.sefatalam@gmail.com  
**Phone**: +8801774199968