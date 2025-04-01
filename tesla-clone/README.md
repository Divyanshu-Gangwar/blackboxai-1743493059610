# Tesla Website Clone

A full-stack clone of the Tesla website with frontend, backend, and database integration.

## Features

- Modern UI with Tailwind CSS
- Responsive design
- Vehicle showcase pages
- Interactive shop/configurator
- User authentication
- Contact form
- MongoDB database

## Technologies Used

- Node.js
- Express
- MongoDB
- EJS templates
- Tailwind CSS
- Font Awesome
- Google Fonts

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/tesla-clone.git
   cd tesla-clone
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
     ```
     DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tesla-clone?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret_here
     PORT=3000
     ```

4. Seed the database with sample vehicles
   ```bash
   node seedDB.js
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at:
```
http://localhost:3000
```

## API Endpoints

- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (protected)
- `POST /api/contact` - Submit contact form

## Project Structure

```
tesla-clone/
├── public/          # Static assets
├── views/           # EJS templates
├── routes/          # API routes
├── models/          # Database models
├── middleware/      # Authentication middleware
├── config/          # Configuration files
├── server.js        # Main server file
├── seedDB.js        # Database seeder
├── package.json     # Dependencies
└── README.md        # This file
```

## Screenshots

![Home Page](screenshots/home.png)
![Models Page](screenshots/models.png)
![Shop Page](screenshots/shop.png)

## License

MIT