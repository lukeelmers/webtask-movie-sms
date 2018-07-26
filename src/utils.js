function serializeParams(query = {}) {
  return Object.keys(query)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
    .join('&');
}

module.exports = { serializeParams };
