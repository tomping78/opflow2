const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/boards',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/boards': 'http://localhost:8080/api/boards',
      },
    }),
  );
};
