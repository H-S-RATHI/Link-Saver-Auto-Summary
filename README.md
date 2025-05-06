# Link Saver with Auto-Summary

A modern web application that allows users to save, organize, and automatically generate summaries of their bookmarked links. Built with Next.js for the frontend and Node.js/Express for the backend.

## ✨ Features

- 🔐 User Authentication (Login/Signup)
- 🔗 Save and organize bookmarks
- 🤖 Automatic link summarization
- 🎨 Dark/Light theme support
- 📱 Responsive design
- 🔍 Search functionality
- 📂 Categorization of bookmarks
- 📱 PWA Support (Progressive Web App)

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide Icons
- **Theming**: next-themes

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: OpenAPI/Swagger (if implemented)

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
.
├── backend/               # Backend server code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── server.js         # Server entry point
│
└── frontend/            # Frontend Next.js application
    ├── app/             # App router pages
    ├── components/      # Reusable UI components
    ├── context/         # React context providers
    ├── hooks/           # Custom React hooks
    ├── lib/             # Utility functions
    ├── public/          # Static files
    └── types/           # TypeScript type definitions
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the request header.

## 📝 API Documentation

API documentation is available at `/api-docs` when the backend server is running (if Swagger/OpenAPI is implemented).

## 🌐 Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000)

## 🧪 Testing

To run tests:

```bash
# In the frontend directory
npm run test

# In the backend directory
npm test
```

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to all the open-source libraries used in this project
