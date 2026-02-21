const { Worker } = require("worker_threads");
const path = require("path");
const Policy = require("../models/Policy");
const User = require("../models/User");

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const worker = new Worker(
    path.resolve(__dirname, "../workers/fileWorker.js"),
    {
      workerData: {
        filePath: req.file.path,
        mongoURI: process.env.MONGO_URI,
      },
    },
  );

  worker.on("message", (msg) => {
    res.json({ message: msg });
  });

  worker.on("error", (err) => {
    console.error("Worker Error:", err);
    res.status(500).json({ error: err.message });
  });
};

exports.searchPolicy = async (req, res) => {
  const { username } = req.query;

  const user = await User.findOne({ firstName: username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const policies = await Policy.find({ userId: user._id })
    .populate("agentId")
    .populate("carrierId")
    .populate("lobId");

  res.json(policies);
};

exports.aggregatePolicy = async (req, res) => {
  const result = await Policy.aggregate([
    {
      $group: {
        _id: "$userId",
        totalPolicies: { $sum: 1 },
        totalPremium: { $sum: "$premiumAmount" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        username: "$user.firstName",
        totalPolicies: 1,
        totalPremium: 1,
      },
    },
  ]);

  res.json(result);
};
