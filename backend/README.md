# BTK Agency Backend API

A comprehensive backend API for the BTK Agency website built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Contact Management**: Handle contact form submissions with email notifications
- **Project Management**: CRUD operations for projects and case studies
- **File Upload**: Support for image uploads
- **Email Integration**: Automated email notifications
- **Security**: Rate limiting, CORS, helmet, input validation
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, cors
- **File Upload**: multer
- **Email**: nodemailer
- **Rate Limiting**: express-rate-limit

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/btk-agency
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=btkagency0@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=http://localhost:8081
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running locally
   # Or use MongoDB Atlas
   ```

5. **Run the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get single contact (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)
- `POST /api/projects/:id/like` - Like a project
- `GET /api/projects/stats/overview` - Get project statistics (admin only)

### Health Check
- `GET /api/health` - API health status

## Database Models

### User
- Authentication and user management
- Role-based access control (user/admin)
- Password hashing with bcrypt

### Contact
- Contact form submissions
- Status tracking (new, in-progress, contacted, completed, spam)
- Source tracking (website, portfolio, etc.)

### Project
- Project and case study management
- Category and industry classification
- Results tracking and testimonials
- View and like counters

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevent abuse with express-rate-limit
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error handling middleware

## Email Integration

The API includes email functionality for:
- Contact form notifications
- Welcome emails (can be extended)
- Password reset (can be extended)

Configure your email settings in the `.env` file.

## File Upload

The API supports file uploads for:
- Project images
- User avatars
- Documents

Files are stored in the `uploads/` directory.

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Environment Variables
See `env.example` for all required environment variables.

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure MongoDB connection (Atlas recommended)
3. Set up email service
4. Configure CORS for production domain
5. Set secure JWT secret
6. Use PM2 or similar for process management

## API Documentation

The API follows RESTful conventions and returns JSON responses with consistent structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 