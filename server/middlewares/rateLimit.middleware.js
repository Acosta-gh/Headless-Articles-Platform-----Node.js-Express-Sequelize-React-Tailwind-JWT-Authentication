const rateLimit = require('express-rate-limit');

/**
 * Rate limiter middleware for resend operations (e.g., email verification, password reset).
 * Restricts users to 1 request per 5-minute window to prevent abuse.
 * 
 * @type {import('express-rate-limit').RateLimit}
 * @constant
 * 
 * @property {number} windowMs - Time window in milliseconds (5 minutes = 300,000ms)
 * @property {number} max - Maximum number of requests allowed per window (1 request)
 * @property {Object} message - Default error message and retry information
 * @property {string} message.error - Error message returned when limit is exceeded
 * @property {number} message.retryAfter - Time in seconds before next request is allowed (300s)
 * @property {boolean} standardHeaders - Include standard rate limit headers (RateLimit-*)
 * @property {boolean} legacyHeaders - Exclude legacy rate limit headers (X-RateLimit-*)
 * @property {Function} keyGenerator - Function to generate unique identifier for rate limiting
 * @property {Function} handler - Custom handler for rate limit exceeded responses
 * @property {boolean} skipFailedRequests - Do not count failed requests against the limit
 * 
 * @description
 * Uses email address from request body as the unique identifier, falling back to IP address.
 * Failed requests (status >= 400) are not counted against the limit.
 * Returns 429 status code when rate limit is exceeded.
 */
const resendLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 1, // 1 request por ventana
  message: { 
    error: "Too many requests. Please wait 5 minutes before resending.",
    retryAfter: 300 // segundos
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Usar email como identificador único
    return req.body.email || req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests. Please wait 5 minutes before resending.",
      retryAfter: 300
    });
  },
  skipFailedRequests: true, 
});

/**
 * Rate limiter middleware for email verification attempts.
 * Restricts users to 10 requests per 15-minute window to prevent abuse.
 * 
 * @type {import('express-rate-limit').RateLimit}
 * @constant
 * 
 * @property {number} windowMs - Time window in milliseconds (15 minutes = 900,000ms)
 * @property {number} max - Maximum number of requests allowed per window (10 requests)
 * @property {Object} message - Default error message and retry information
 * @property {string} message.error - Error message returned when limit is exceeded
 * @property {number} message.retryAfter - Time in seconds before next request is allowed (900s)
 * @property {boolean} standardHeaders - Include standard rate limit headers (RateLimit-*)
 * @property {boolean} legacyHeaders - Exclude legacy rate limit headers (X-RateLimit-*)
 * @property {Function} keyGenerator - Function to generate unique identifier for rate limiting
 * @property {Function} handler - Custom handler for rate limit exceeded responses
 * @description
 * Uses IP address as the unique identifier for rate limiting.
 * Returns 429 status code when rate limit is exceeded.
 */ 
const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // 10 intentos por ventana
  message: { 
    error: "Too many verification attempts. Please try again later.",
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many verification attempts. Please try again in 15 minutes.",
      retryAfter: 900
    });
  },
});

module.exports = {
  resendLimiter,
  verifyLimiter,
};