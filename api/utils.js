const jwt = require('jsonwebtoken');

/**
 * Creates a JWT cookie based on a user's information. (_id)
 */
exports.createJWT = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
};

// https://stackoverflow.com/a/32402438/7149508
/**
 * @param {string} wildcard - The wildcard pattern to match against.
 * @param {string} str - The string to be matched.
 * @returns {boolean} True if the string matches the wildcard pattern; otherwise, false.
 */
exports.wildcardMatch = (wildcard, str) => {
  let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape
  const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return re.test(str);
};