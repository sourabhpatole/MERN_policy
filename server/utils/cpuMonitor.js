const os = require("os");

function getCPUUsage() {
  const cpus = os.cpus();

  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  return 100 - ~~((100 * totalIdle) / totalTick);
}

function monitorCPU() {
  setInterval(() => {
    const usage = getCPUUsage();
    console.log("CPU Usage:", usage + "%");

    if (usage > 70) {
      console.log("CPU above 70%, restarting...");
      process.exit(1); // PM2 will auto restart
    }
  }, 5000);
}

module.exports = monitorCPU;
