import 'dotenv/config'
import express from 'express'
import cors from 'cors';

// Config
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser';

// Middleware
import verifyJWT from './middleware/verifyJWT.js'
import credentials from "./middleware/credentials.js";

// Public Routes
import exports from "./routes/export.js"
import register from "./routes/register.js"
import login from "./routes/login.js"
import logout from "./routes/logout.js"
import classListings from "./routes/classes.js"
import refresh from './routes/refresh.js';

// API Routes
import users from "./routes/api/users.js"
import classes from "./routes/api/classes.js"
import blogs from "./routes/api/blogs.js"
import comments from "./routes/api/comments.js"
import bookings from "./routes/api/bookings.js"

const app = express();
const { PORT } = process.env || 3500;

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

app.use(express.static("public"))
app.set("view engine", "ejs")

// Routes
app.get("/", (req, res) => res.status(301).redirect("views/index.html"));
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/classes', classListings)
app.use('/refresh', refresh)
app.use('/export', exports)

app.use(verifyJWT);
app.use('/api/classes', classes);
app.use('/users', users);
app.use('/blogs', blogs);
app.use('/comments', comments);
app.use('/bookings', bookings)

// Open port / server
app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));