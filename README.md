# Currency Exchange Frontend

A modern, fully responsive currency exchange application built with Next.js, featuring real-time exchange rates, transaction management, and comprehensive audit trails.

Important notice the exchangerate api has a limit for free users

## 🌟 Features

### 💱 Currency Exchange

- **Real-time exchange rates** from multiple providers
- **Instant conversion calculations** with precise formatting

### 📱 Fully Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Adaptive layouts** for desktop, tablet, and mobile
- **No horizontal scrolling** on any device
- **Accessible navigation** and components

### 📊 Transaction Management

- **Complete transaction history** with advanced filtering
- **Smart pagination** (backend + frontend hybrid)
- **Real-time transaction tracking** and status updates
- **CSV export functionality** for data analysis

### 🔍 Advanced Filtering & Search

- **Multi-criteria filtering** (currency, date, amount)
- **Real-time search** across all transaction data
- **Date range selections** with preset options
- **Smart filter persistence** and URL state management
- **Visual filter indicators** and easy clearing

### 🛡️ Security & Audit

- **Comprehensive audit trail** with detailed event logging
- **User activity tracking** (logins, conversions, profile changes)
- **IP address and browser detection** for security monitoring
- **Failed login attempt tracking** and security alerts
- **Session management** and token refresh handling

### 🎨 Modern UI/UX

- **Skeleton Loading states** and skeleton screens
- **Error boundaries** and graceful error handling
- **Toast notifications** for user feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/currency-exchange-frontend.git
   cd currency-exchange-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME=FX Converter
   NEXT_PUBLIC_APP_DESCRIPTION=Seamless FX Converter for Global Commerce
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Responsive Design Implementation

## 🛠️ Technology Stack

### Core Framework

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Latest React features and concurrent rendering

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **CSS Grid & Flexbox** - Modern layout techniques

### State Management

- **RTK Query** - Data fetching and caching
- **Redux Toolkit** - Predictable state container

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting

- **TypeScript** - Static type checking
