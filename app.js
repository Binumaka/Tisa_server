const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const ornamentRoute = require("./routes/ornamentRoute");
const packageRoute = require("./routes/packageRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const shoppingRoutes = require("./routes/shoppingCartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const rentRoutes = require("./routes/rentRoutes");
const rentOrnamentRoutes = require("./routes/rentOrnamentRoutes");
const rentOrderRoutes = require("./routes/rentorderCompleteRoutes");

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/ornament", ornamentRoute);
app.use("/api/package", packageRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", shoppingRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/rentOrnament", rentOrnamentRoutes);
app.use("/api/rentorder", rentOrderRoutes);
app.use('/ornaments_image', express.static("ornaments_image"));
app.use('/uploads', express.static("uploads"));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
