const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

const Agent = require("../models/Agent");
const User = require("../models/User");
const Policy = require("../models/Policy");

async function processFile() {
  await mongoose.connect(workerData.mongoURI);

  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(workerData.filePath)
      .pipe(csv())
      .on("data", (row) => {
        console.log("ROW:", row); // debug
        records.push(row);
      })
      .on("end", async () => {
        try {
          for (const row of records) {
            const agent = await Agent.findOneAndUpdate(
              { name: row.agent },
              { name: row.agent },
              { upsert: true, new: true },
            );

            const user = await User.findOneAndUpdate(
              { email: row.email },
              {
                firstName: row.firstname,
                dob: row.dob,
                address: row.address,
              },
              { upsert: true, new: true },
            );

            await Policy.create({
              policyNumber: row.policy_number,
              premiumAmount: row.premium_amount,
              policyStartDate: row.policy_start_date,
              policyEndDate: row.policy_end_date,
              userId: user._id,
              agentId: agent._id,
            });
          }

          resolve("File processed successfully");
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });
}

processFile()
  .then((msg) => parentPort.postMessage(msg))
  .catch((err) => parentPort.postMessage(err.message));
