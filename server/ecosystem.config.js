module.exports = {
  apps: [
    {
      name: "policy-server",
      script: "app.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "500M",
    },
  ],
};
