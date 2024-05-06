const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const path = require("path");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userManage = require("./routes/userManage");
const productRoute = require("./Routes/productRoute");
const paymentRouter =require("./Routes/paymentRouter");
const deliveryRouter = require("./Routes/deliveryRoute.js");
const deliBuddyRouter = require("./Routes/delBuddyRoute.js"); 
const appointmentRoutes = require('./Routes/appointmentRoute');
const expertListingRoute = require('./Routes/expertListingRoute')
const offerRouter = require("./Routes/offersRoute");
const buyerReqRoute =require("./Routes/BuyerReqRoute");

const PORT = process.env.PORT || 2001;
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin:["http://localhost:3000",`${FRONTEND_URL}`],
    credentials: true,
}));

// Route Middleware


// Routes from Profile_Management branch
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(userManage);

app.use("/api/products", productRoute);
app.use("/api/payment", paymentRouter);
app.use("/delivery", deliveryRouter);
app.use("/delBuddyModel", deliBuddyRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/appointments",appointmentRoutes)
app.use("/expertlisting", expertListingRoute);

app.use("/api/offers", offerRouter);
app.use("/api/buyer", buyerReqRoute);


// Route from main branch
app.get("/", (req, res) => {
    res.send("Home page");
});

// Connect to MongoDB and start the server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("MongoDB Connected");
            console.log(`Server Running on Port ${PORT}`);
        });
    });
