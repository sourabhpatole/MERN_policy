const ScheduledMessage = require("../models/ScheduledMessage");

exports.createSchedule = async (req, res) => {
  const { message, day, time } = req.body;

  const scheduledDate = new Date(`${day} ${time}`);

  if (scheduledDate < new Date())
    return res.status(400).json({ error: "Time must be future date" });

  await ScheduledMessage.create({
    message,
    scheduledFor: scheduledDate,
  });

  res.json({ message: "Message scheduled successfully" });
};
