require("dotenv").config();
require("express-async-errors");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const jwt = require("jsonwebtoken");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const app = express();
// connectDB
const connectDB = require("./db/connect");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRoute");
const bookmarkRouter = require("./routes/bookmarkRoute");
// const authenticateUser = require("./middleware/authentication");
// // routers
// const authRouter = require("./routes/auth");
// const jobsRouter = require("./routes/jobs");
// // error handler
// const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/mongooseErrors");

app.use(express.json());
// extra packages
app.set("trust proxy");
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15mins
    max: 100, // limit each IP to 100 reqs / windowMs
  })
); //returns 429 when user exceeded reqs
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/auth", authRouter);
app.use("/api/bookmark", bookmarkRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
