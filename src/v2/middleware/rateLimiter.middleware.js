const rateLimit = require("express-rate-limit");

module.exports = () => {
    return rateLimiterUsingThirdParty = rateLimit({
        windowMs: 60 * 1000, 
        max: 50,
        message: 'You have exceeded the 50 requests in 1 minute limit!', 
        headers: true,
      });
}
