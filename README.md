# 🍕 Food Delivery App - Complete Project Overview

A full-stack food delivery application built with React.js, Node.js, Express, and MongoDB.

## 📋 **Project Architecture**

This is a **full-stack food delivery application** with three main components:

### **🎯 Project Structure**
```
├── 🖥️  Frontend (Customer App) - React.js
├── ⚙️  Admin Panel - React.js  
└── 🔧  Backend Server - Node.js/Express
```

### **🔄 How Everything Works Together**

**Frontend (Customer Side):**
- Customers browse food items, add to cart, place orders
- Built with React.js, TailwindCSS, React Router
- Runs on `http://localhost:5173`

**Admin Panel:**
- Restaurant owners/admins manage food items, categories, orders
- Built with React.js, TailwindCSS
- Runs on `http://localhost:5174`

**Backend Server:**
- Handles all API requests, authentication, database operations
- Built with Node.js, Express, MongoDB, Cloudinary
- Runs on `http://localhost:4000` or `http://localhost:6000`

---

## 🏗️ **Backend Server Architecture**

### **📁 Core Technologies:**
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Cloudinary** - Image storage
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Bcrypt** - Password hashing

### **🛠️ Main Features:**
1. **User Management** - Registration, login, authentication
2. **Food Management** - CRUD operations for food items
3. **Category Management** - Food categories
4. **Cart System** - Add/remove items
5. **Order Processing** - Place orders, track status
6. **Promo Codes** - Discount system
7. **Contact Form** - Customer inquiries

### **📊 Database Models:**
```javascript
- User: { name, email, password, cartData }
- Food: { name, description, price, image, category }
- Order: { userId, items, amount, address, status, payment }
- Category: { name, image }
- PromoCode: { code, discount, usage }
- Contact: { name, email, message }
```

---

## 🎨 **Frontend (Customer App) - Detailed Breakdown**

### **🏠 Main App Structure**
```jsx
// Core Features:
- Navigation Bar (Navbar)
- Page Routing (React Router)
- Login/Signup Modal
- Dark/Light Theme Toggle
- Footer
```

### **📄 Pages & Their Purpose:**

#### **1. 🏡 Home Page (`/`)**
```jsx
// What it contains:
- Hero Header with call-to-action
- Explore Menu section (categories)
- Featured food items display
- App download section
```

#### **2. 🍽️ Menu Page (`/menu`)**
```jsx
// What it contains:
- Complete food catalog
- Category filtering
- Search functionality
- Add to cart buttons
```

#### **3. 🛒 Cart Page (`/cart`)**
```jsx
// What it contains:
- Cart items list
- Quantity controls (+/-)
- Total calculation
- Promo code input
- Checkout button
```

#### **4. 📋 Place Order (`/order`)**
```jsx
// What it contains:
- Delivery address form
- Order summary
- Payment method selection
- Final order placement
```

#### **5. 📦 My Orders (`/myorders`)**
```jsx
// What it contains:
- Order history
- Order status tracking
- Reorder functionality
```

### **🧩 Key Components:**

#### **🍕 FoodItem Component**
```jsx
// Purpose: Display individual food items
// Features:
- Food image, name, price, description
- Add to cart button
- Quantity controls if already in cart
- Rating display (if implemented)
```

#### **🧭 Navbar Component**
```jsx
// Purpose: Main navigation
// Features:
- Logo and brand name
- Menu links (Home, Menu, About, Contact)
- Search bar
- Cart icon with item count
- Login/Signup button
- User profile dropdown (when logged in)
```

#### **🍽️ ExploreMenu Component**
```jsx
// Purpose: Category selection
// Features:
- Display food categories
- Category filtering
- Visual category cards
```

#### **👤 LoginPopup Component**
```jsx
// Purpose: User authentication
// Features:
- Login form
- Signup form
- Form validation
- Password visibility toggle
```

### **🎯 Context & State Management:**

#### **🏪 StoreContext**
```jsx
// Global state management includes:
- food_list: All available food items
- cartItems: Items in user's cart
- token: User authentication token
- userData: Logged-in user information
- discountedAmount: Applied discount value

// Key Functions:
- addToCart(itemId): Add item to cart
- removeFromCart(itemId): Remove item from cart
- getTotalCartAmount(): Calculate total cart value
- fetchFoodList(): Get all food items from API
- loadCartData(): Load user's cart from server
```

#### **🌙 ThemeContext**
```jsx
// Theme management:
- darkMode: Boolean for dark/light theme
- toggleTheme(): Switch between themes
```

### **🔧 Configuration:**

#### **⚙️ Environment Config**
```jsx
// Centralized configuration:
- API_URL: Backend server URL
- Environment validation
- Development/Production settings
```

### **📱 Responsive Design:**
- **TailwindCSS** for styling
- **Mobile-first** approach
- **Dark/Light mode** support
- **Smooth animations** with Framer Motion

### **🔒 Authentication Flow:**
1. User clicks "Sign In" → LoginPopup opens
2. User enters credentials → API call to `/api/user/login`
3. Server returns JWT token → Stored in localStorage
4. Token included in all subsequent API calls
5. User data loaded → Cart synced with server

### **🛒 Shopping Flow:**
1. Browse food items → Home/Menu page
2. Add items to cart → Updates local state + server
3. View cart → Cart page with totals
4. Apply promo codes → Discount calculation
5. Checkout → Address + payment details
6. Place order → Order confirmation

### **📊 Data Flow:**
```
Frontend Components ↔ StoreContext ↔ Axios API calls ↔ Backend Server ↔ MongoDB
```

### **🎨 UI/UX Features:**
- **Responsive design** for all devices
- **Loading states** during API calls
- **Error handling** with user-friendly messages
- **Toast notifications** for user feedback
- **Smooth page transitions**
- **Interactive animations**

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/VishalSingh3026/Food_Delivery_App.git
cd food-delivery-app
```

2. **Backend Setup**
```bash
cd backend
npm install
# Create .env file with your MongoDB URI, JWT secret, etc.
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Admin Panel Setup**
```bash
cd admin
npm install
npm run dev
```

### **Environment Variables**
Create `.env` files in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

Your Name - your.email@example.com

Project Link: [https://food-delivery-app-ten-xi.vercel.app/]
(https://github.com/VishalSingh3026/Food_Delivery_App.git)

---

This architecture provides a complete, scalable food delivery platform with separate customer and admin interfaces, robust backend API, and modern frontend technologies.