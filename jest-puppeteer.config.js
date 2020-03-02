module.exports = {
  launch: {
    headless: false, // для отображения в клиенте
    ignoreHTTPSErrors: true,
    debugger: true,
  },
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
}
