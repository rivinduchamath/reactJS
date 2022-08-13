const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.REACT_APP_SERVER_ENV === 'dev') {
    app.use(
      `/v1/abc/*`,
      createProxyMiddleware({
        target: 'https://abc.ilabs.com',
        changeOrigin: true,
        secure: false
      })
    );
  }
};
