import 'dotenv/config'
import express from 'express'
import credentials from "./middleware/credentials.js";
import cors from 'cors';
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser';

import verifyJWT from './middleware/verifyJWT.js'

import register from "./routes/register.js"
import login from "./routes/login.js"
import logout from "./routes/logout.js"
import classListings from "./routes/classes.js"

import users from "./routes/api/users.js"
import classes from "./routes/api/classes.js"
import blogs from "./routes/api/blogs.js"

const app = express();
const PORT = process.env.port || 3500;

// Credientials
app.use(credentials);

// CORS middleware
app.use(cors(corsOptions))

// Middleware to handle urlencoded data / form data
app.use(express.urlencoded({extended:false}))

// JSON parser middleware
app.use(express.json()); 

// Cookie parser middleware
app.use(cookieParser()); 

// Routes
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/classes', classListings)

app.use(verifyJWT)
app.use('/api/classes', classes);
app.use('/users', users);
app.use('/blogs', blogs);

// Open port / server
app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`))