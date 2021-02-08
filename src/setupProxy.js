/* eslint-disabled */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: 'http://localhost:3001',
      //target: 'https://waste-management-admin.herokuapp.com',
      changeOrigin: true,
      pathRewrite: {
        "^/api/": ""
      }
    })
  )
};