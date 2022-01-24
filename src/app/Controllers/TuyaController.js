const TuyAPI = require("tuyapi");

const device = new TuyAPI({
  id: id,
  key: key,
  issueGetOnConnect: false,
});

(async () => {
  await device.find();

  await device.connect();

  let status = await device.get();

  console.log(`Current status: ${status}.`);

  await device.set({ set: !status });

  status = await device.get();

  console.log(`New status: ${status}.`);

  device.disconnect();
})();
