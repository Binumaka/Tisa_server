const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
