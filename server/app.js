require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const monitorCPU = require("./utils/cpuMonitor");
monitorCPU();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/policy", require("./routes/policy.routes"));
app.use("/api", require("./routes/schedule.routes"));
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
