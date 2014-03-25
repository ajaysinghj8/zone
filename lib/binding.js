
var realBinding = process.binding;
var bindingCache = Object.create(null);

process.binding = binding;

function binding(name) {
  if (name in bindingCache)
    return bindingCache[name];

  switch (name) {
    case 'pipe_wrap':
    case 'tcp_wrap':
    case 'tty_wrap':
      var wb = require('./node-binding/stream-wrap.js')(realBinding);
      bindingCache.pipe_wrap = wb;
      bindingCache.tcp_wrap = wb;
      bindingCache.tty_wrap = wb;
      return wb;

    default:
      return realBinding(name);
  }
}